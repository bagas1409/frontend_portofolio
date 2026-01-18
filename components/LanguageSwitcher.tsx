"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "id", label: "Indonesia", flag: "🇮🇩" },
    { code: "jp", label: "日本語", flag: "🇯🇵" },
    { code: "cn", label: "中文", flag: "🇨🇳" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
] as const;

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const activeLang = languages.find(l => l.code === language) || languages[0];

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                aria-label="Switch Language"
            >
                <Globe className="w-4 h-4 text-[var(--color-text)]" />
                <span className="text-sm font-medium text-[var(--color-text)] hidden sm:block">{activeLang.label}</span>
                <span className="text-lg sm:hidden">{activeLang.flag}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-[var(--color-bg)] rounded-xl shadow-xl border border-[var(--color-primary)]/10 overflow-hidden z-50 ring-1 ring-black/5"
                    >
                        <div className="p-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code as any);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                                        language === lang.code
                                            ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium"
                                            : "text-[var(--color-text)] hover:bg-[var(--color-primary)]/5"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{lang.flag}</span>
                                        <span>{lang.label}</span>
                                    </div>
                                    {language === lang.code && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
