"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Layout, Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Added Image
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { dictionary } = useLanguage();

    const floatingIcons = [
        { Icon: Code, top: "0%", left: "10%", delay: 0 },
        { Icon: Database, top: "10%", right: "0%", delay: 1 },
        { Icon: Layout, bottom: "10%", left: "0%", delay: 2 },
        { Icon: Smartphone, bottom: "0%", right: "10%", delay: 3 },
    ];

    return (
        <section className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto relative pt-20 lg:pt-0 pb-24 lg:pb-0">

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* LEFT: Text Content */}
                <div className="order-2 lg:order-1 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-[var(--color-secondary)] font-medium mb-4 tracking-wider">
                            HELLO, I'M BAGAS
                        </h2>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-[var(--color-primary)] mb-6 leading-tight"
                    >
                        {dictionary.hero.role}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed"
                    >
                        {dictionary.hero.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-4 items-center"
                    >
                        <Link
                            href="#projects"
                            className="group flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-secondary)] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                        >
                            {dictionary.hero.cta_projects}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="#contact"
                            className="px-8 py-4 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] font-medium rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition-all"
                        >
                            {dictionary.hero.cta_contact}
                        </Link>
                    </motion.div>
                </div>

                {/* RIGHT: Visual Element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="order-1 lg:order-2 flex justify-center relative"
                >
                    <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">

                        {/* 1. Animated Gradient Ring (The "Chasing Colors") */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-[60%_40%_30%_70%/60%_30%_70%_40%]"
                            style={{
                                background: "conic-gradient(from 0deg, transparent 0%, var(--color-secondary) 20%, transparent 40%)",
                                filter: "blur(20px)",
                                transform: "scale(1.1)",
                            }}
                        />

                        {/* 2. Solid Ring Border */}
                        <div
                            className="absolute inset-2 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] border-2 border-[var(--color-secondary)]/30 animate-[morph_8s_ease-in-out_infinite]"
                        />

                        {/* 3. The Image Mask (Blob) */}
                        <div className="absolute inset-4 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] overflow-hidden border-4 border-white shadow-2xl animate-[morph_8s_ease-in-out_infinite] bg-gray-100 dark:bg-slate-800">
                            <Image
                                src="/bagas.png"
                                alt="Bagas Developer"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* 4. Floating Icons */}
                        {floatingIcons.map((item, index) => (
                            <motion.div
                                key={index}
                                className="absolute w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 dark:border-white/10 z-20"
                                style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                                animate={{ y: [0, -15, 0] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: item.delay,
                                    ease: "easeInOut"
                                }}
                            >
                                <item.Icon className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-secondary)]" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
            >
                <div className="w-[30px] h-[50px] rounded-3xl border-2 border-gray-400/50 flex justify-center p-2 shadow-sm">
                    <motion.div
                        className="w-1.5 h-3 bg-[var(--color-secondary)] rounded-full"
                        animate={{
                            y: [0, 12, 0],
                            opacity: [1, 0.5, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Scroll Down</span>
            </motion.div>

            {/* Global Style for Morph Animation */}
            <style jsx global>{`
                @keyframes morph {
                    0% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
                    50% { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
                    100% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
                }
            `}</style>
        </section>
    );
}
