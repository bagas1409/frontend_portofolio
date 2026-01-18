"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-full hover:bg-[var(--color-secondary)]/10 transition-colors"
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6 perspective-1000">
                <motion.div
                    initial={false}
                    animate={{
                        rotateY: theme === "dark" ? 180 : 0,
                    }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="w-full h-full relative preserve-3d"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Sun Face (Front) */}
                    <div className="absolute inset-0 backface-hidden flex items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
                        <Sun className="w-6 h-6 text-orange-500 fill-orange-500" />
                    </div>

                    {/* Moon Face (Back) */}
                    <div className="absolute inset-0 backface-hidden flex items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                        <Moon className="w-6 h-6 text-blue-400 fill-blue-400" />
                    </div>
                </motion.div>
            </div>
        </button>
    );
}
