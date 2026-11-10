import React, { useEffect, useRef } from 'react';

interface FluidHeroCanvasProps {
  imageSrc: string;
  fallbackSrc?: string;
  className?: string;
}

export const FluidHeroCanvas: React.FC<FluidHeroCanvasProps> = ({
  imageSrc,
  fallbackSrc,
  className = 'w-full h-full',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try WebGL2 or WebGL1
    const gl =
      (canvas.getContext('webgl2') as WebGLRenderingContext | null) ||
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Extensions for floating point / half-float textures
    const isWebGL2 = 'WebGL2RenderingContext' in window && gl instanceof WebGL2RenderingContext;
    let halfFloatExt: any = null;
    let supportLinear = true;

    if (isWebGL2) {
      gl.getExtension('EXT_color_buffer_float');
      supportLinear = !!gl.getExtension('OES_texture_float_linear');
    } else {
      halfFloatExt = gl.getExtension('OES_texture_half_float');
      const halfFloatLinear = gl.getExtension('OES_texture_half_float_linear');
      supportLinear = !!halfFloatLinear;
    }

    const texType = isWebGL2
      ? (gl as any).HALF_FLOAT
      : halfFloatExt
        ? halfFloatExt.HALF_FLOAT_OES
        : gl.UNSIGNED_BYTE;

    const internalFormat = isWebGL2 ? (gl as any).RGBA16F : gl.RGBA;

    // Helper to compile shaders
    function createShader(type: number, source: string): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(vsSource: string, fsSource: string): WebGLProgram | null {
      const vs = createShader(gl!.VERTEX_SHADER, vsSource);
      const fs = createShader(gl!.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return null;

      const program = gl!.createProgram();
      if (!program) return null;
      gl!.attachShader(program, vs);
      gl!.attachShader(program, fs);
      gl!.linkProgram(program);

      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
        console.error('Program link error:', gl!.getProgramInfoLog(program));
        return null;
      }
      return program;
    }

    // Base Quad Vertex Shader
    const baseVS = `
      attribute vec2 aPosition;
      varying vec2 vUV;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 uTexelSize;

      void main () {
          vUV = aPosition * 0.5 + 0.5;
          vL = vUV - vec2(uTexelSize.x, 0.0);
          vR = vUV + vec2(uTexelSize.x, 0.0);
          vT = vUV + vec2(0.0, uTexelSize.y);
          vB = vUV - vec2(0.0, uTexelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Splat Fragment Shader (Injects ink / velocity)
    const splatFS = `
      precision highp float;
      varying vec2 vUV;
      uniform sampler2D uTarget;
      uniform float uAspectRatio;
      uniform vec3 uColor;
      uniform vec2 uPoint;
      uniform float uRadius;

      void main () {
          vec2 p = vUV - uPoint.xy;
          p.x *= uAspectRatio;
          vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
          vec3 base = texture2D(uTarget, vUV).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    // Advection Fragment Shader
    const advectionFS = `
      precision highp float;
      varying vec2 vUV;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 uTexelSize;
      uniform float uDt;
      uniform float uDissipation;

      void main () {
          vec2 coord = vUV - uDt * texture2D(uVelocity, vUV).xy * uTexelSize;
          gl_FragColor = uDissipation * texture2D(uSource, coord);
      }
    `;

    // Divergence Fragment Shader
    const divergenceFS = `
      precision highp float;
      varying vec2 vUV;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    // Pressure Solver (Jacobi)
    const pressureFS = `
      precision highp float;
      varying vec2 vUV;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).y;
          float B = texture2D(uPressure, vB).y;
          float div = texture2D(uDivergence, vUV).x;
          float p = (L + R + T + B - div) * 0.25;
          gl_FragColor = vec4(p, 0.0, 0.0, 1.0);
      }
    `;

    // Gradient Subtraction
    const gradSubtractFS = `
      precision highp float;
      varying vec2 vUV;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).y;
          float B = texture2D(uPressure, vB).y;
          vec2 velocity = texture2D(uVelocity, vUV).xy;
          velocity -= vec2(R - L, T - B) * 0.5;
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    // Display Shader: Blends hero image with swirling ink and refraction
    const displayFS = `
      precision highp float;
      varying vec2 vUV;
      uniform sampler2D uDensity;
      uniform sampler2D uVelocity;
      uniform sampler2D uImage;
      uniform float uImageLoaded;
      uniform vec2 uScreenResolution;
      uniform vec2 uImageResolution;
      uniform float uTime;

      vec2 getCoverUV(vec2 uv, vec2 screenRes, vec2 imgRes) {
          float screenAspect = screenRes.x / max(screenRes.y, 1.0);
          float imgAspect = imgRes.x / max(imgRes.y, 1.0);
          vec2 newUV = uv;
          if (screenAspect > imgAspect) {
              float scale = screenAspect / imgAspect;
              newUV.y = (uv.y - 0.5) * scale + 0.5;
          } else {
              float scale = imgAspect / screenAspect;
              newUV.x = (uv.x - 0.5) * scale + 0.5;
          }
          // Invert Y coordinate so the image is right-side up
          newUV.y = 1.0 - newUV.y;
          return clamp(newUV, 0.0, 1.0);
      }

      void main () {
          vec2 uv = vUV;

          // Sample fluid velocity and density
          vec2 vel = texture2D(uVelocity, uv).xy;
          vec4 fluid = texture2D(uDensity, uv);

          // The ink density (electric lime #A4F01D + smoky luminous trails)
          vec3 inkColor = fluid.rgb;
          float inkIntensity = length(inkColor);

          // Optical fluid refraction applied ONLY where ink trails are swirling
          vec2 fluidDistort = vel * (0.014 * clamp(inkIntensity * 2.5, 0.0, 1.0));
          vec2 distortedUV = uv - fluidDistort;

          vec2 coverUV = getCoverUV(distortedUV, uScreenResolution, uImageResolution);
          vec4 img = texture2D(uImage, coverUV);

          // Crystal clear, sharp, high-definition base image (definitive and recognizable)
          vec3 finalColor = img.rgb;

          // Add glowing volumetric ink smoke trails when cursor moves
          finalColor += inkColor * 0.9;
          finalColor += img.rgb * (inkIntensity * 0.25);

          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Compile programs
    const splatProg = createProgram(baseVS, splatFS);
    const advectionProg = createProgram(baseVS, advectionFS);
    const divergenceProg = createProgram(baseVS, divergenceFS);
    const pressureProg = createProgram(baseVS, pressureFS);
    const gradSubtractProg = createProgram(baseVS, gradSubtractFS);
    const displayProg = createProgram(baseVS, displayFS);

    if (
      !splatProg ||
      !advectionProg ||
      !divergenceProg ||
      !pressureProg ||
      !gradSubtractProg ||
      !displayProg
    ) {
      console.error('Failed to create fluid shader programs');
      return;
    }

    // Quad geometry
    const quadVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVBO);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    // Framebuffer Object (FBO) builder
    interface FBO {
      texture: WebGLTexture;
      fbo: WebGLFramebuffer;
      width: number;
      height: number;
      attach: (id: number) => number;
    }

    interface DoubleFBO {
      width: number;
      height: number;
      read: FBO;
      write: FBO;
      swap: () => void;
    }

    function createFBO(w: number, h: number): FBO {
      gl!.activeTexture(gl!.TEXTURE0);
      const texture = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(
        gl!.TEXTURE_2D,
        gl!.TEXTURE_MIN_FILTER,
        supportLinear ? gl!.LINEAR : gl!.NEAREST
      );
      gl!.texParameteri(
        gl!.TEXTURE_2D,
        gl!.TEXTURE_MAG_FILTER,
        supportLinear ? gl!.LINEAR : gl!.NEAREST
      );
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(
        gl!.TEXTURE_2D,
        0,
        internalFormat,
        w,
        h,
        0,
        gl!.RGBA,
        texType,
        null
      );

      const fbo = gl!.createFramebuffer()!;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(
        gl!.FRAMEBUFFER,
        gl!.COLOR_ATTACHMENT0,
        gl!.TEXTURE_2D,
        texture,
        0
      );
      gl!.viewport(0, 0, w, h);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      return {
        texture,
        fbo,
        width: w,
        height: h,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id);
          gl!.bindTexture(gl!.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w: number, h: number): DoubleFBO {
      let fbo1 = createFBO(w, h);
      let fbo2 = createFBO(w, h);
      return {
        width: w,
        height: h,
        get read() {
          return fbo1;
        },
        set read(val) {
          fbo1 = val;
        },
        get write() {
          return fbo2;
        },
        set write(val) {
          fbo2 = val;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    // Simulation resolution (256x256 provides ultra-crisp silky fluid curves at 60fps)
    const simRes = 256;
    let density = createDoubleFBO(simRes, simRes);
    let velocity = createDoubleFBO(simRes, simRes);
    let divergence = createFBO(simRes, simRes);
    let pressure = createDoubleFBO(simRes, simRes);

    // Hero background texture loading
    const heroTexture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, heroTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // 1x1 placeholder pixel
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([10, 12, 16, 255])
    );

    let imageLoaded = false;
    let imageWidth = 2048;
    let imageHeight = 1136;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, heroTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      imageLoaded = true;
      imageWidth = img.naturalWidth || 2048;
      imageHeight = img.naturalHeight || 1136;
    };
    img.onerror = () => {
      if (fallbackSrc && img.src !== fallbackSrc) {
        img.src = fallbackSrc;
      }
    };

    // Splat queue for pointer interactions
    interface SplatInput {
      x: number;
      y: number;
      dx: number;
      dy: number;
      color: [number, number, number];
    }
    const splats: SplatInput[] = [];

    // Pointer events tracking
    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // invert for WebGL UV

      if (!hasMoved) {
        lastX = x;
        lastY = y;
        hasMoved = true;
        return;
      }

      const dx = (x - lastX) * 12.0;
      const dy = (y - lastY) * 12.0;
      lastX = x;
      lastY = y;

      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed < 0.001) return;

      // Color scheme: Electric neon lime (#A4F01D: 0.643, 0.941, 0.114) with luminous white-cyan smoke
      const t = Date.now() * 0.002;
      const r = 0.55 + 0.15 * Math.sin(t);
      const g = 0.92 + 0.08 * Math.cos(t * 0.7);
      const b = 0.18 + 0.18 * Math.sin(t * 1.3);

      splats.push({
        x,
        y,
        dx: dx * 65.0,
        dy: dy * 65.0,
        color: [r * 2.2, g * 2.4, b * 1.6],
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerMove(touch as any);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // User-driven fluid simulation: ink is injected when cursor/touch moves

    // Bind quad buffer helper
    function bindQuad(prog: WebGLProgram) {
      gl!.useProgram(prog);
      const posLoc = gl!.getAttribLocation(prog, 'aPosition');
      gl!.enableVertexAttribArray(posLoc);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, quadVBO);
      gl!.vertexAttribPointer(posLoc, 2, gl!.FLOAT, false, 0, 0);
    }

    function blit(targetFBO: FBO | null) {
      if (targetFBO === null) {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
        gl!.viewport(0, 0, gl!.canvas.width, gl!.canvas.height);
      } else {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, targetFBO.fbo);
        gl!.viewport(0, 0, targetFBO.width, targetFBO.height);
      }
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    }

    // Apply splat (injection)
    function applySplat(
      x: number,
      y: number,
      dx: number,
      dy: number,
      color: [number, number, number]
    ) {
      // 1. Splat Velocity
      bindQuad(splatProg!);
      gl!.uniform1i(gl!.getUniformLocation(splatProg!, 'uTarget'), velocity.read.attach(0));
      gl!.uniform1f(
        gl!.getUniformLocation(splatProg!, 'uAspectRatio'),
        canvas!.width / Math.max(canvas!.height, 1)
      );
      gl!.uniform2f(gl!.getUniformLocation(splatProg!, 'uPoint'), x, y);
      gl!.uniform3f(gl!.getUniformLocation(splatProg!, 'uColor'), dx, dy, 0.0);
      gl!.uniform1f(gl!.getUniformLocation(splatProg!, 'uRadius'), 0.0035);
      blit(velocity.write);
      velocity.swap();

      // 2. Splat Density (Ink)
      gl!.uniform1i(gl!.getUniformLocation(splatProg!, 'uTarget'), density.read.attach(0));
      gl!.uniform3f(
        gl!.getUniformLocation(splatProg!, 'uColor'),
        color[0],
        color[1],
        color[2]
      );
      gl!.uniform1f(gl!.getUniformLocation(splatProg!, 'uRadius'), 0.003);
      blit(density.write);
      density.swap();
    }

    // Resize handling
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas!.clientWidth * dpr);
      const h = Math.floor(canvas!.clientHeight * dpr);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
    }
    resize();
    window.addEventListener('resize', resize);

    // Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let ambientTimer = 0;

    function render(currentTime: number) {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.033) || 0.016;
      lastTime = currentTime;

      resize();



      // Process all queued splats
      while (splats.length > 0) {
        const s = splats.shift()!;
        applySplat(s.x, s.y, s.dx, s.dy, s.color);
      }

      const texelSizeX = 1.0 / simRes;
      const texelSizeY = 1.0 / simRes;

      // 1. Advect Velocity
      bindQuad(advectionProg!);
      gl!.uniform1i(
        gl!.getUniformLocation(advectionProg!, 'uVelocity'),
        velocity.read.attach(0)
      );
      gl!.uniform1i(
        gl!.getUniformLocation(advectionProg!, 'uSource'),
        velocity.read.attach(0)
      );
      gl!.uniform2f(
        gl!.getUniformLocation(advectionProg!, 'uTexelSize'),
        texelSizeX,
        texelSizeY
      );
      gl!.uniform1f(gl!.getUniformLocation(advectionProg!, 'uDt'), dt);
      gl!.uniform1f(gl!.getUniformLocation(advectionProg!, 'uDissipation'), 0.985);
      blit(velocity.write);
      velocity.swap();

      // 2. Advect Density (Ink trails)
      gl!.uniform1i(
        gl!.getUniformLocation(advectionProg!, 'uVelocity'),
        velocity.read.attach(0)
      );
      gl!.uniform1i(
        gl!.getUniformLocation(advectionProg!, 'uSource'),
        density.read.attach(1)
      );
      gl!.uniform1f(gl!.getUniformLocation(advectionProg!, 'uDissipation'), 0.965); // ink fades smoothly
      blit(density.write);
      density.swap();

      // 3. Compute Divergence
      bindQuad(divergenceProg!);
      gl!.uniform1i(
        gl!.getUniformLocation(divergenceProg!, 'uVelocity'),
        velocity.read.attach(0)
      );
      gl!.uniform2f(
        gl!.getUniformLocation(divergenceProg!, 'uTexelSize'),
        texelSizeX,
        texelSizeY
      );
      blit(divergence);

      // 4. Pressure Poisson Solver (Jacobi Iterations)
      bindQuad(pressureProg!);
      gl!.uniform1i(
        gl!.getUniformLocation(pressureProg!, 'uDivergence'),
        divergence.attach(1)
      );
      gl!.uniform2f(
        gl!.getUniformLocation(pressureProg!, 'uTexelSize'),
        texelSizeX,
        texelSizeY
      );

      for (let i = 0; i < 18; i++) {
        gl!.uniform1i(
          gl!.getUniformLocation(pressureProg!, 'uPressure'),
          pressure.read.attach(0)
        );
        blit(pressure.write);
        pressure.swap();
      }

      // 5. Subtract Pressure Gradient
      bindQuad(gradSubtractProg!);
      gl!.uniform1i(
        gl!.getUniformLocation(gradSubtractProg!, 'uPressure'),
        pressure.read.attach(0)
      );
      gl!.uniform1i(
        gl!.getUniformLocation(gradSubtractProg!, 'uVelocity'),
        velocity.read.attach(1)
      );
      gl!.uniform2f(
        gl!.getUniformLocation(gradSubtractProg!, 'uTexelSize'),
        texelSizeX,
        texelSizeY
      );
      blit(velocity.write);
      velocity.swap();

      // 6. Final Render to Canvas Screen: Image Reveal through Ink Trails
      bindQuad(displayProg!);
      gl!.uniform1i(gl!.getUniformLocation(displayProg!, 'uDensity'), density.read.attach(0));
      gl!.uniform1i(
        gl!.getUniformLocation(displayProg!, 'uVelocity'),
        velocity.read.attach(1)
      );

      gl!.activeTexture(gl!.TEXTURE2);
      gl!.bindTexture(gl!.TEXTURE_2D, heroTexture);
      gl!.uniform1i(gl!.getUniformLocation(displayProg!, 'uImage'), 2);

      gl!.uniform1f(
        gl!.getUniformLocation(displayProg!, 'uImageLoaded'),
        imageLoaded ? 1.0 : 0.0
      );
      gl!.uniform2f(
        gl!.getUniformLocation(displayProg!, 'uScreenResolution'),
        canvas!.width,
        canvas!.height
      );
      gl!.uniform2f(
        gl!.getUniformLocation(displayProg!, 'uImageResolution'),
        imageWidth,
        imageHeight
      );
      gl!.uniform1f(gl!.getUniformLocation(displayProg!, 'uTime'), currentTime * 0.001);

      blit(null); // Draw to screen!

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resize);
    };
  }, [imageSrc, fallbackSrc]);

  return (
    <canvas
      ref={canvasRef}
      className={`block select-none ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};
