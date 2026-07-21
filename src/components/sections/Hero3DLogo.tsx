"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3DLogo({ 
  progress,
  rotationEnd = 1.0,
  className = "absolute inset-0 z-0 h-full w-full",
  style = { pointerEvents: "none" }
}: { 
  progress: number;
  rotationEnd?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    let animationFrameId: number;

    // Load image and create particles
    const img = new Image();
    img.src = '/logo3.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      
      const width = 120;
      const height = 120;
      canvas.width = width;
      canvas.height = height;
      
      // Draw image in the center of the canvas
      const size = Math.min(width, height);
      ctx.drawImage(img, (width - size)/2, (height - size)/2, size, size);
      
      const imgData = ctx.getImageData(0, 0, width, height).data;
      const positions = [];
      const colors = [];

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const a = imgData[i + 3];
          if (a > 30) { // Threshold for alpha
            const r = imgData[i] / 255;
            const g = imgData[i + 1] / 255;
            const b = imgData[i + 2] / 255;

            // Ignore solid black background pixels from the new logo
            if (r < 0.05 && g < 0.05 && b < 0.05) continue;

            // Center and scale coordinates
            const pX = (x - width / 2) * 3;
            const pY = -(y - height / 2) * 3;
            // Add slight random depth
            const pZ = (Math.random() - 0.5) * 15;

            positions.push(pX, pY, pZ);
            colors.push(r, g, b);
          }
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geometry.setAttribute('aBasePosition', new THREE.Float32BufferAttribute([...positions], 3));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uRotationEnd: { value: rotationEnd }
        },
        vertexShader: `
          uniform float uTime;
          uniform float uProgress;
          uniform float uRotationEnd;
          attribute vec3 aBasePosition;
          attribute vec3 color;
          varying vec3 vColor;
          
          // Noise function for organic movement
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m; m = m*m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          void main() {
            vColor = color;
            vec3 pos = position;
            
            float clampedProgress = min(uProgress / uRotationEnd, 1.0);
            
            // Nanotech dispersion effect based on scroll progress
            // Make it disperse and then reform (0 -> 1 -> 0)
            float cycle = sin(clampedProgress * 3.14159265);
            
            float noise = snoise(aBasePosition.xy * 0.02 + uTime * 0.5);
            float explosionForce = cycle * 300.0;
            
            vec3 direction = normalize(aBasePosition + vec3(0.001, 0.001, 20.0));
            pos += direction * explosionForce * (noise * 0.5 + 0.5);
            
            // Twist rotation exactly 1 full rotation (2 * PI) over the clamped scroll
            float angle = clampedProgress * 6.28318530718; 
            // Add noise rotation only when exploded, scaling down to 0 at the end
            angle += noise * cycle;
            
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xz = rot * pos.xz;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            // Particles get slightly larger as they disperse
            gl_PointSize = (3.0 + cycle * 5.0 + noise) * (200.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            // Soft circle
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            float ll = length(xy);
            if(ll > 0.5) discard;
            
            float glow = 1.0 - (ll * 2.0);
            // Mix original color with a brighter core
            vec3 coreColor = mix(vColor, vec3(1.0, 1.0, 1.0), 0.5);
            vec3 finalColor = mix(vColor, coreColor, glow);
            
            gl_FragColor = vec4(finalColor, glow);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      particlesRef.current = points;
    };

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (particlesRef.current) {
        const mat = particlesRef.current.material as THREE.ShaderMaterial;
        mat.uniforms.uTime.value = time * 0.001;
        // Idle gentle float
        particlesRef.current.position.y = Math.sin(time * 0.001) * 5;
        particlesRef.current.rotation.y = Math.sin(time * 0.0005) * 0.2;
        particlesRef.current.rotation.x = Math.cos(time * 0.0007) * 0.1;
      }
      renderer.render(scene, camera);
    };
    animate(0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

    // Sync scroll progress smoothly
  useEffect(() => {
    if (particlesRef.current) {
      const mat = particlesRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uProgress.value = progress;
      mat.uniforms.uRotationEnd.value = rotationEnd;
    }
  }, [progress, rotationEnd]);

  return <div ref={mountRef} className={className} style={style} />;
}

