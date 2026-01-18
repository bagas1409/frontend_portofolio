"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Droplet {
    id: number;
    x: number;
    y: number;
    size: number;
}

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [droplets, setDroplets] = useState<Droplet[]>([]);
    const dropletIdCounter = useRef(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Create water droplets (only if moving significantly or periodically)
            // Increased density for "splash" effect
            if (Math.random() > 0.5) {
                const newDroplet: Droplet = {
                    id: dropletIdCounter.current++,
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 6 + 2, // Random size 2-8px
                };

                setDroplets(prev => {
                    const newArr = [...prev, newDroplet];
                    if (newArr.length > 20) return newArr.slice(newArr.length - 20); // Limit max droplets
                    return newArr;
                });
            }
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        // Hover detection for interactive elements
        const handleLinkHover = () => setIsHovering(true);
        const handleLinkLeave = () => setIsHovering(false);

        const attachListeners = () => {
            const links = document.querySelectorAll("a, button, input, textarea, [role='button']");
            links.forEach(link => {
                link.addEventListener("mouseenter", handleLinkHover);
                link.addEventListener("mouseleave", handleLinkLeave);
            });
            return links;
        };

        const initialLinks = attachListeners();

        // Observe DOM changes to attach listeners to new elements (like modals/dynamic content)
        const observer = new MutationObserver((mutations) => {
            attachListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            observer.disconnect();
            initialLinks.forEach(link => {
                link.removeEventListener("mouseenter", handleLinkHover);
                link.removeEventListener("mouseleave", handleLinkLeave);
            });
        };
    }, []);

    // Cleanup interval just in case
    useEffect(() => {
        const interval = setInterval(() => {
            if (droplets.length > 0) {
                setDroplets(prev => prev.slice(1));
            }
        }, 50);
        return () => clearInterval(interval);
    }, [droplets.length]);

    return (
        <>
            {/* Force Hide Cursor Globally - The "Nuclear" Option */}
            <style jsx global>{`
                * {
                    cursor: none !important;
                }
                body, a, button, input, textarea {
                    cursor: none !important;
                }
            `}</style>

            <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
                {/* Water Splash Trail */}
                <AnimatePresence>
                    {droplets.map((droplet) => (
                        <motion.div
                            key={droplet.id}
                            initial={{ opacity: 0.6, scale: 1 }}
                            animate={{
                                opacity: 0,
                                scale: 0,
                                y: 15, // Falling gravity effect
                                x: (Math.random() - 0.5) * 10 // Random spread
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute bg-blue-300 rounded-full blur-[1px]"
                            style={{
                                left: droplet.x,
                                top: droplet.y,
                                width: droplet.size,
                                height: droplet.size,
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    ))}
                </AnimatePresence>

                {/* Yellow Hand Cursor */}
                <motion.div
                    className="absolute top-0 left-0"
                    animate={{
                        x: mousePosition.x,
                        y: mousePosition.y,
                        scale: isHovering ? 0.8 : 1, // Shrink slightly on hover
                        rotate: isHovering ? -15 : 0, // Tilt on hover
                    }}
                    transition={{
                        type: "tween",
                        ease: "linear",
                        duration: 0.01 // Zero latency
                    }}
                >
                    {/* Custom SVG Hand - Yellow with Black Outline */}
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-lg"
                        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))" }}
                    >
                        <path
                            d="M19.5 10C19.5 10 20.6 13.5 18.5 15.5C16.4 17.5 13.5 18.5 13.5 18.5L12 21.5L9 20L10 17C10 17 8 16.5 6.5 15C5 13.5 4.5 11 5 9.5C5.5 8 8 7 8 7L9.5 3L13.5 3.5L14.5 7H19.5V10Z"
                            fill="#FACC15"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M13.5 3.5L13 13M9.5 3L10 12"
                            stroke="black"
                            strokeWidth="1"
                            strokeLinecap="round"
                        />
                    </svg>
                </motion.div>
            </div>
        </>
    );
}
