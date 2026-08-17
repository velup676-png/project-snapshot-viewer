import { useEffect, useRef } from "react";

export function AfterHeroMouseMove() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let visible = true;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, vx: 0, vy: 0 };
    const trails = Array.from({ length: 36 }, () => ({ x: 0.5, y: 0.5, px: 0.5, py: 0.5 }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      mouse.ty = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    };

    const pointerLeave = () => {
      mouse.tx = 0.5;
      mouse.ty = 0.5;
    };

    const draw = () => {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      if (!visible) return;

      mouse.x += (mouse.tx - mouse.x) * (reduce.matches ? 0.03 : 0.085);
      mouse.y += (mouse.ty - mouse.y) * (reduce.matches ? 0.03 : 0.085);
      mouse.vx += (mouse.x - trails[0].x - mouse.vx) * 0.15;
      mouse.vy += (mouse.y - trails[0].y - mouse.vy) * 0.15;

      trails.forEach((point, index) => {
        point.px = point.x;
        point.py = point.y;
        const leader = index === 0 ? mouse : trails[index - 1];
        const ease = reduce.matches ? 0.035 : 0.16 - index * 0.003;
        point.x += (leader.x - point.x) * ease;
        point.y += (leader.y - point.y) * ease;
      });

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255,255,255,0.012)";
      ctx.fillRect(0, 0, width, height);

      const cx = mouse.x * width;
      const cy = mouse.y * height;
      const speed = Math.min(1, Math.hypot(mouse.vx, mouse.vy) * 12);
      const radius = Math.min(width, height) * (0.17 + speed * 0.08);

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.8);
      glow.addColorStop(0, "rgba(255,255,255,0.16)");
      glow.addColorStop(0.22, "rgba(205,205,205,0.09)");
      glow.addColorStop(0.58, "rgba(130,130,130,0.035)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      trails.forEach((point, index) => {
        if (index === 0) return;
        const x = point.x * width;
        const y = point.y * height;
        const previous = trails[index - 1];
        const px = previous.x * width;
        const py = previous.y * height;
        const alpha = (1 - index / trails.length) * 0.11;
        ctx.strokeStyle = `rgba(245,245,245,${alpha})`;
        ctx.lineWidth = Math.max(0.4, (1 - index / trails.length) * 2.2);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      });
      ctx.restore();

      const ringCount = 7;
      for (let i = ringCount; i > 0; i--) {
        const t = i / ringCount;
        ctx.strokeStyle = `rgba(235,235,235,${0.025 + (1 - t) * 0.055})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(
          cx,
          cy,
          radius * (0.35 + t * 0.85),
          radius * (0.13 + t * 0.42),
          (mouse.x - 0.5) * 0.8,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    }, { threshold: 0.01 });

    resize();
    observer.observe(canvas);
    canvas.addEventListener("pointermove", pointerMove, { passive: true });
    canvas.addEventListener("pointerleave", pointerLeave);
    window.addEventListener("resize", resize);
    draw();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerleave", pointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative h-[92svh] min-h-[620px] overflow-hidden border-y border-white/10 bg-[#090909]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" aria-label="Interactive motion artwork" />
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
