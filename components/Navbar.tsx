"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export default function Navbar() {
    const { dictionary } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { key: "about", href: "#about" },
        { key: "projects", href: "#projects" },
        { key: "testimonials", href: "#testimonials" },
        { key: "contact", href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 backdrop-blur-md",
                scrolled ? "bg-[var(--color-bg)]/80 shadow-sm" : "bg-transparent"
            )}
        >
            <Link href="/" className="text-xl font-bold tracking-tight text-[var(--color-primary)] z-50 relative">
                God<span className="text-[var(--color-secondary)]">Dev</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-8 mr-4">
                    {links.map((link) => (
                        <Link
                            key={link.key}
                            href={link.href}
                            className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors relative group"
                        >
                            {dictionary.nav[link.key as keyof typeof dictionary.nav]}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-secondary)] transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>
            </div>

            {/* Mobile Toggle */}
            <button
                className="md:hidden z-50 relative text-[var(--color-primary)]"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[var(--color-bg)] z-40 flex flex-col items-center justify-center gap-8 md:hidden h-screen"
                    >
                        <motion.div
                            className="absolute top-24 right-6 flex items-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center gap-8"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                            }}
                        >
                            {links.map((link) => (
                                <motion.div
                                    key={link.key}
                                    variants={{
                                        open: { y: 0, opacity: 1 },
                                        closed: { y: 20, opacity: 0 }
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-4xl font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors tracking-tight"
                                    >
                                        {dictionary.nav[link.key as keyof typeof dictionary.nav]}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
