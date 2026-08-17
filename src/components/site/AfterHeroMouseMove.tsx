import { useEffect, useRef } from "react";

export function AfterHeroMouseMove() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let visible = true;
    const center = { x: 0.5, y: 0.5 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      if (!visible) return;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255,255,255,0.012)";
      ctx.fillRect(0, 0, width, height);

      const cx = center.x * width;
      const cy = center.y * height;
      const radius = Math.min(width, height) * 0.2;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.8);
      glow.addColorStop(0, "rgba(255,255,255,0.10)");
      glow.addColorStop(0.3, "rgba(205,205,205,0.05)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      const ringCount = 7;
      for (let i = ringCount; i > 0; i--) {
        const t = i / ringCount;
        ctx.strokeStyle = `rgba(235,235,235,${0.018 + (1 - t) * 0.035})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * (0.35 + t * 0.85), radius * (0.13 + t * 0.42), 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    }, { threshold: 0.01 });

    resize();
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    draw();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative h-[92svh] min-h-[620px] overflow-hidden border-y border-white/10 bg-[#090909]">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-label="Motion artwork" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.16)_55%,rgba(0,0,0,0.65)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="pointer-events-none absolute inset-0 flex items-end px-6 pb-8 md:px-10 md:pb-10">
        <p className="max-w-xs text-xs leading-relaxed tracking-wide text-white/45 md:text-sm">
          Move through the frame.
        </p>
      </div>
    </section>
  );
}
