import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const fragmentShader = `
uniform sampler2D uTexture1; // current slide
uniform sampler2D uTexture2; // next slide  
uniform float uProgress;     // 0.0 → 1.0
uniform float uTime;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Liquid wave distortion
  float wave = sin(uv.y * 10.0 + uTime * 5.0) * 0.03;
  float dist = uProgress + wave * sin(uProgress * 3.14159);
  
  // RGB split / chromatic aberration at peak
  float aberration = sin(uProgress * 3.14159) * 0.015;
  
  vec4 tex1r = texture2D(uTexture1, uv + vec2(dist + aberration, 0.0));
  vec4 tex1g = texture2D(uTexture1, uv + vec2(dist, 0.0));
  vec4 tex1b = texture2D(uTexture1, uv + vec2(dist - aberration, 0.0));
  vec4 color1 = vec4(tex1r.r, tex1g.g, tex1b.b, 1.0);
  
  vec4 tex2r = texture2D(uTexture2, uv + vec2(dist - 1.0 + aberration, 0.0));
  vec4 tex2g = texture2D(uTexture2, uv + vec2(dist - 1.0, 0.0));
  vec4 tex2b = texture2D(uTexture2, uv + vec2(dist - 1.0 - aberration, 0.0));
  vec4 color2 = vec4(tex2r.r, tex2g.g, tex2b.b, 1.0);
  
  // Smooth mix
  float mixVal = smoothstep(0.0, 1.0, uProgress);
  gl_FragColor = mix(color1, color2, mixVal);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

interface WebGLTransitionProps {
  texture1: THREE.Texture;
  texture2: THREE.Texture;
  onComplete: () => void;
}

export default function WebGLTransition({ texture1, texture2, onComplete }: WebGLTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture1: { value: texture1 },
        uTexture2: { value: texture2 },
        uProgress: { value: 0 },
        uTime: { value: 0 }
      },
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrame: number;
    const startTime = performance.now();
    const duration = 1200; // 1200ms

    // Ease In Out Cubic
    const easeInOutCubic = (x: number): number => {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };

    const render = (time: number) => {
      const elapsed = time - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      const progress = easeInOutCubic(linearProgress);

      material.uniforms.uProgress.value = progress;
      material.uniforms.uTime.value = time * 0.001;

      renderer.render(scene, camera);

      if (linearProgress < 1) {
        animationFrame = requestAnimationFrame(render);
      } else {
        onComplete();
      }
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture1.dispose();
      texture2.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [texture1, texture2, onComplete]);

  return <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none" />;
}
