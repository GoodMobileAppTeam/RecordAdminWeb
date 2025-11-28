// src/components/common/RecordLoginBackground.tsx
import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";

interface Props {
  className?: string;
}

const RecordLoginBackground: React.FC<Props> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise = createNoise2D();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // 로그인 화면 배경 색감
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fillRect(0, 0, width, height);

      const layers = [
        {
          color: "rgba(125, 211, 252, 0.5)",
          amplitude: height * 0.08,
          speed: 0.00025,
          freq: 0.0011,
          offsetY: height * 0.33,
        },
        {
          color: "rgba(134, 239, 172, 0.5)",
          amplitude: height * 0.07,
          speed: 0.0003,
          freq: 0.001,
          offsetY: height * 0.37,
        },
        {
          color: "rgba(147, 197, 253, 0.5)",
          amplitude: height * 0.06,
          speed: 0.00035,
          freq: 0.0013,
          offsetY: height * 0.41,
        },
      ];

      ctx.lineWidth = 3;
      ctx.filter = "blur(8px)";

      layers.forEach((layer, i) => {
        ctx.beginPath();
        ctx.strokeStyle = layer.color;

        const step = 12;

        for (let x = 0; x <= width + step; x += step) {
          const nx = x * layer.freq;
          const ny = t * layer.speed + i * 10;

          const noiseVal = noise(nx, ny);
          const y = layer.offsetY + noiseVal * layer.amplitude;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      });

      t += 6;
      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={
        "pointer-events-none fixed inset-0 z-0 " +
        "bg-[radial-gradient(circle_at_top_left,#f8fafc_0%,#e2e8f0_40%,#cbd5e1_100%)] " +
        className
      }
    />
  );
};

export default RecordLoginBackground;
