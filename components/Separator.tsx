"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

// DATABASE: Masukan data nama, icon (string iconify), dan warna di sini
const MARQUEE_ITEMS = [
    // Frontend
    {
        id: 1,
        name: "Next.js",
        icon: "simple-icons:nextdotjs",
        color: "text-white"
    },
    {
        id: 2,
        name: "React JS",
        icon: "simple-icons:react",
        color: "text-sky-400"
    },
    {
        id: 3,
        name: "Tailwind",
        icon: "simple-icons:tailwindcss",
        color: "text-cyan-400"
    },
    {
        id: 4,
        name: "TypeScript",
        icon: "simple-icons:typescript",
        color: "text-blue-500"
    },
    {
        id: 14,
        name: "JavaScript",
        icon: "simple-icons:javascript",
        color: "text-yellow-400"
    },
    {
        id: 10,
        name: "Vite",
        icon: "simple-icons:vite",
        color: "text-purple-400"
    },
    // Frameworks
    {
        id: 11,
        name: "Nuxt.js",
        icon: "simple-icons:nuxtdotjs",
        color: "text-green-400"
    },
    {
        id: 13,
        name: "Angular",
        icon: "simple-icons:angular",
        color: "text-red-500"
    },
    // Backend
    {
        id: 5,
        name: "Node.js",
        icon: "simple-icons:nodedotjs",
        color: "text-green-500"
    },
    {
        id: 12,
        name: "Nest.js",
        icon: "simple-icons:nestjs",
        color: "text-red-600"
    },
    {
        id: 6,
        name: "Laravel",
        icon: "simple-icons:laravel",
        color: "text-red-500"
    },
    // Database
    {
        id: 7,
        name: "PostgreS SQL",
        icon: "simple-icons:postgresql",
        color: "text-blue-400"
    },
    {
        id: 8,
        name: "MongoDB",
        icon: "simple-icons:mongodb",
        color: "text-green-400"
    },
    // Mobile
    {
        id: 9,
        name: "Expo",
        icon: "simple-icons:expo",
        color: "text-white"
    },
    {
        id: 15,
        name: "Flutter",
        icon: "simple-icons:flutter",
        color: "text-blue-400"
    },
];

export default function Separator() {
    return (
        <section className="py-24 bg-[#0C2B4E] overflow-hidden flex flex-col justify-center transform -skew-y-2 origin-top-left my-10 border-y-4 border-[#1A3D64]">
            <div className="relative flex select-none overflow-hidden transform skew-y-2">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40, // Slower duration for many items
                    }}
                >
                    {/* Loop double for infinite effect */}
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                        <div key={i} className="flex items-center gap-6 mx-12">
                            <Icon icon={item.icon} className={`w-12 h-12 md:w-16 md:h-16 ${item.color}`} />
                            <span className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter opacity-90">
                                {item.name}
                            </span>
                            <span className="w-3 h-3 rounded-full bg-[#1A3D64]"></span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
