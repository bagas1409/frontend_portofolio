"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Globe } from "lucide-react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";

const FooterMap = dynamic(() => import("./FooterMap"), { ssr: false });

export default function Footer() {
    const { dictionary } = useLanguage();

    const socialLinks = [
        { name: "GitHub", icon: "simple-icons:github", url: "https://github.com", color: "hover:text-white" },
        { name: "LinkedIn", icon: "simple-icons:linkedin", url: "https://linkedin.com", color: "hover:text-blue-400" },
        { name: "Instagram", icon: "simple-icons:instagram", url: "https://instagram.com", color: "hover:text-pink-400" },
        { name: "Email", icon: "material-symbols:mail-rounded", url: "bagaspermana1409@gmail.com", color: "hover:text-yellow-400" }
    ];

    const quickLinks = [
        { name: dictionary.nav.home, href: "#home" },
        { name: dictionary.nav.about, href: "#about" },
        { name: dictionary.nav.projects, href: "#projects" },
        { name: dictionary.nav.contact, href: "#contact" },
    ];

    const accountLinks = [
        { name: dictionary.contact.btn_signin, href: "/login" },
        { name: dictionary.contact.btn_register, href: "/register" },
    ];

    return (
        <footer className="relative overflow-hidden bg-gradient-to-b from-[#0C2B4E] to-[#071d36] text-white pt-24 pb-10 border-t border-white/10">

            {/* Decorative Glow */}
            <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#1A3D64]/20 blur-[120px]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-20">

                    {/* Brand */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-4xl font-extrabold tracking-tight"
                        >
                            God
                            <span className="text-[#1A3D64]">Dev</span>
                        </motion.div>

                        <p className="text-white/70 text-lg leading-relaxed max-w-md">
                            {dictionary.footer.description}
                        </p>

                        <div className="flex gap-4 pt-2">
                            {socialLinks.map((link, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -4 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Link
                                        href={link.url}
                                        target="_blank"
                                        aria-label={link.name}
                                        className={`group w-11 h-11 rounded-full bg-white/5 backdrop-blur flex items-center justify-center transition-all duration-300 hover:bg-white/10 ${link.color}`}
                                    >
                                        <Icon icon={link.icon} className="w-5 h-5 opacity-80 group-hover:opacity-100 transition" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 tracking-wide">{dictionary.footer.quick_links}</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-white/70 hover:text-[#1A3D64] transition"
                                    >
                                        <span className="h-[1px] w-0 bg-[#1A3D64] transition-all duration-300 group-hover:w-4" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 tracking-wide">{dictionary.footer.account}</h4>
                        <ul className="space-y-4">
                            {accountLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-white/70 hover:text-[#1A3D64] transition"
                                    >
                                        <span className="h-[1px] w-0 bg-[#1A3D64] transition-all duration-300 group-hover:w-4" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Location */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 tracking-wide">{dictionary.footer.location}</h4>
                        <div className="space-y-4">
                            <FooterMap />
                            <p className="text-white/70 leading-relaxed text-sm flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#1A3D64]" />
                                Lampung, Indonesia
                            </p>
                            <p className="text-white/70 leading-relaxed text-sm flex items-center gap-2">
                                <Globe className="w-4 h-4 text-[#1A3D64]" />
                                {dictionary.footer.remote_friendly}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} Bagas Developer. {dictionary.footer.rights}
                    </p>
                    <p className="flex items-center gap-1">
                        {dictionary.footer.built_with}
                        <span className="text-red-500 animate-pulse">❤</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
