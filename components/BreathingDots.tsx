"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  minRadius: number;
  speed: number;
  increasing: boolean;
  opacity: number;
}

interface BreathingDotsProps {
  gridSize?: number;
  color?: string; 
  className?: string;
}

export default function BreathingDots({
  gridSize = 40,
  color = "30, 151, 116", 
  className = "",
}: BreathingDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentElement;

    function resizeCanvas() {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initDots();
    }

    function initDots() {
      if (!canvas) return;
      const dots: Dot[] = [];
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          dots.push({
            x,
            y,
            radius: 1,
            maxRadius: 1.6,
            minRadius: 0.6,
            speed: 0.01 * (Math.random() * 0.5 + 0.75),
            increasing: Math.random() > 0.5,
            opacity: Math.random() * 0.3 + 0.2,
          });
        }
      }
      dotsRef.current = dots;
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach((dot) => {
        if (dot.increasing) {
          dot.radius += dot.speed;
          if (dot.radius >= dot.maxRadius) dot.increasing = false;
        } else {
          dot.radius -= dot.speed;
          if (dot.radius <= dot.minRadius) dot.increasing = true;
        }

        ctx.fillStyle = `rgba(${color}, ${dot.opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gridSize, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}