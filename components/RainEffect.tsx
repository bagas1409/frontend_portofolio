"use client";

import { useEffect, useRef, useState } from "react";

interface RainEffectProps {
    intensity?: number;
}

export default function RainEffect({ intensity = 50 }: RainEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const mouseTrailRef = useRef<Array<{ x: number; y: number; life: number }>>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        // Rain drops
        const drops: Array<{
            x: number;
            y: number;
            speed: number;
            length: number;
            opacity: number;
        }> = [];

        // Initialize rain drops
        for (let i = 0; i < intensity; i++) {
            drops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: Math.random() * 7 + 8, // Increased from 5+3 to 7+8 (faster)
                length: Math.random() * 20 + 10,
                opacity: Math.random() * 0.5 + 0.5, // Increased from 0.5+0.3 to 0.5+0.5 (more visible)
            });
        }

        // Animation loop
        let animationFrame: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw rain drops
            drops.forEach((drop) => {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity})`;
                ctx.lineWidth = 2.5; // Increased from 1.5 to 2.5
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x, drop.y + drop.length);
                ctx.stroke();

                // Update position
                drop.y += drop.speed;
                drop.x += Math.sin(drop.y * 0.05) * 0.5; // Slight wind effect

                // Reset if out of bounds
                if (drop.y > canvas.height) {
                    drop.y = -drop.length;
                    drop.x = Math.random() * canvas.width;
                }
            });

            // Draw mouse trail
            mouseTrailRef.current = mouseTrailRef.current.filter(
                (trail) => trail.life > 0
            );

            mouseTrailRef.current.forEach((trail, index) => {
                const size = trail.life * 3;
                const gradient = ctx.createRadialGradient(
                    trail.x,
                    trail.y,
                    0,
                    trail.x,
                    trail.y,
                    size
                );
                gradient.addColorStop(0, `rgba(124, 58, 237, ${trail.life * 0.3})`);
                gradient.addColorStop(1, "rgba(124, 58, 237, 0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(trail.x, trail.y, size, 0, Math.PI * 2);
                ctx.fill();

                // Decay trail
                mouseTrailRef.current[index].life -= 0.02;
            });

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", setCanvasSize);
        };
    }, [intensity]);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePos({ x, y });

        // Add trail effect
        mouseTrailRef.current.push({
            x,
            y,
            life: 1,
        });

        // Limit trail length
        if (mouseTrailRef.current.length > 50) {
            mouseTrailRef.current.shift();
        }
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            className="absolute inset-0 w-full h-full pointer-events-auto"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
