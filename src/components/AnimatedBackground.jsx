import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];

    const particleCount = 6;
    const colors = [
      "#1e3a8a",
      "#7e22ce",
      "#d946ef",
      "#4c1d95",
      "#172554",
      "#c026d3",
    ];

    let mouse = { x: 0, y: 0, active: false };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.max(width, height) / 2.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = 0.01 + Math.random() * 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.radius || this.x > width + this.radius)
          this.vx *= -1;
        if (this.y < -this.radius || this.y > height + this.radius)
          this.vy *= -1;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = width * 0.4;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const dirX = dx / dist;
            const dirY = dy / dist;
            this.x -= dirX * force * 5;
            this.y -= dirY * force * 5;
          }
        }

        this.angle += this.angleSpeed;
        this.currentRadius =
          this.radius + Math.sin(this.angle) * (this.radius * 0.2);
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.currentRadius
        );
        gradient.addColorStop(0, hexToRgba(this.color, 0.8));
        gradient.addColorStop(1, hexToRgba(this.color, 0));
        ctx.fillStyle = gradient;

        ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    window.addEventListener("mouseleave", () => (mouse.active = false));

    window.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      },
      { passive: false }
    );

    window.addEventListener("touchend", () => (mouse.active = false));

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        filter: "blur(80px)",
        opacity: 0.9,
        zIndex: -1,
      }}
    />
  );
}
