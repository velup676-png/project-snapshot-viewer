import { useEffect, useRef } from "react";

export function AtmospherePanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let targetX = 0.5;
    let targetY = 0.5;
    let x = 0.5;
    let y = 0.5;
    let lastX = 0.5;
    let lastY = 0.5;
    let velocity = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      targetX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      targetY = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    };

    const drawBlob = (cx: number, cy: number, radius: number, alpha: number) => {
      const gradient = context.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, `rgba(245,245,245,${alpha})`);
      gradient.addColorStop(0.35, `rgba(155,155,155,${alpha * 0.72})`);
      gradient.addColorStop(0.7, `rgba(75,75,75,${alpha * 0.3})`);
      gradient.addColorStop(1, "rgba(15,15,15,0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fill();
    };

    const render = () => {
      x += (targetX - x) * 0.075;
      y += (targetY - y) * 0.075;
      const movement = Math.hypot(x - lastX, y - lastY);
      velocity += (movement - velocity) * 0.14;
      lastX = x;
      lastY = y;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0b0b0c";
      context.fillRect(0, 0, width, height);

      const cx = x * width;
      const cy = y * height;
      const radius = Math.max(width, height) * (0.18 + Math.min(velocity * 9, 0.09));

      context.globalCompositeOperation = "screen";
      drawBlob(cx, cy, radius, 0.14);
      drawBlob(cx - radius * 0.36, cy + radius * 0.22, radius * 0.78, 0.075);
      drawBlob(cx + radius * 0.44, cy - radius * 0.3, radius * 0.62, 0.055);
      context.globalCompositeOperation = "source-over";

      frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="atmosphere-panel" aria-hidden="true">
      <canvas ref={canvasRef} className="atmosphere-panel__canvas" />
      <div className="atmosphere-panel__veil" />
    </div>
  );
}
