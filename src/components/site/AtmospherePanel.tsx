import { useEffect, useRef } from "react";

/**
 * Monochrome fluid-ink field.
 * A feedback loop (previous frame re-drawn scaled + drifted) advects the cursor
 * brush into flowing ink trails, echoing ogl-mousemove in black/ash/grey only.
 */
export function AtmospherePanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const buffer = document.createElement("canvas");
    const bufferContext = buffer.getContext("2d", { alpha: false });
    if (!bufferContext) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let targetX = 0.5;
    let targetY = 0.42;
    let x = 0.5;
    let y = 0.42;
    let lastX = x;
    let lastY = y;
    let velocity = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      // half-res simulation: softer, cheaper, more fluid-looking
      canvas.width = Math.max(1, Math.floor(width / 2));
      canvas.height = Math.max(1, Math.floor(height / 2));
      buffer.width = canvas.width;
      buffer.height = canvas.height;
      context.fillStyle = "#0b0b0c";
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      targetX = Math.max(-0.2, Math.min(1.2, (event.clientX - bounds.left) / bounds.width));
      targetY = Math.max(-0.2, Math.min(1.2, (event.clientY - bounds.top) / bounds.height));
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      const movement = Math.hypot(x - lastX, y - lastY);
      velocity += (movement - velocity) * 0.1;
      const dirX = x - lastX;
      const dirY = y - lastY;
      lastX = x;
      lastY = y;

      const t = performance.now() * 0.0002;

      // 1. advect: re-draw last frame slightly zoomed + drifted, and fade it
      bufferContext.drawImage(canvas, 0, 0);
      context.globalAlpha = 1;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = "#0b0b0c";
      context.fillRect(0, 0, w, h);

      const zoom = 1.012;
      const driftX = Math.cos(t * 1.7) * w * 0.0016 - dirX * w * 0.22;
      const driftY = Math.sin(t * 1.3) * h * 0.0016 - dirY * h * 0.22;
      context.globalAlpha = 0.965;
      context.drawImage(
        buffer,
        (w - w * zoom) / 2 + driftX,
        (h - h * zoom) / 2 + driftY,
        w * zoom,
        h * zoom,
      );
      context.globalAlpha = 1;

      // 2. inject fresh ink at the cursor
      const cx = x * w;
      const cy = y * h;
      const radius = Math.max(w, h) * (0.1 + Math.min(velocity * 8, 0.07));
      const strength = 0.1 + Math.min(velocity * 6, 0.22);

      context.globalCompositeOperation = "lighter";
      const paint = (px: number, py: number, r: number, a: number) => {
        const g = context.createRadialGradient(px, py, 0, px, py, r);
        g.addColorStop(0, `rgba(236,236,238,${a})`);
        g.addColorStop(0.4, `rgba(150,150,155,${a * 0.5})`);
        g.addColorStop(1, "rgba(11,11,12,0)");
        context.fillStyle = g;
        context.beginPath();
        context.arc(px, py, r, 0, Math.PI * 2);
        context.fill();
      };

      paint(cx, cy, radius, strength);
      paint(
        cx + Math.cos(t * 2.1) * radius * 0.5 - dirX * w * 0.9,
        cy + Math.sin(t * 1.6) * radius * 0.5 - dirY * h * 0.9,
        radius * 0.66,
        strength * 0.5,
      );
      paint(
        cx - Math.sin(t * 1.9) * radius * 0.7 - dirX * w * 1.8,
        cy - Math.cos(t * 2.3) * radius * 0.7 - dirY * h * 1.8,
        radius * 0.44,
        strength * 0.32,
      );
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
