"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, User, MessageSquare, LogIn, Lock, LogOut } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
    const { dictionary } = useLanguage();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        subject: "",
        message: "",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("user");
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }
    }, []);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
            toast.success("Logged out successfully");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/messages", {
                content: `Subject: ${formData.subject}\n\n${formData.message}`,
            });
            toast.success("Message sent successfully!");
            setFormData({ subject: "", message: "" });
        } catch (error: any) {
            console.error(error);
            // Handle specific rate limit 429
            if (error.response?.status === 429) {
                toast.error("Limit reached: You can send 4 messages per 24 hours.");
            } else {
                toast.error(error.response?.data?.message || "Failed to send message");
            }
        } finally {
            setLoading(false);
        }
    };

    // Centralized Styles
    const styles = {
        section: "py-24 px-6 bg-white dark:bg-[var(--color-bg)] scroll-mt-28 transition-colors duration-300",
        container: "max-w-7xl mx-auto",
        grid: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
        heading: "text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-6",
        subheading: "text-[var(--color-secondary)] uppercase tracking-widest font-medium mb-4",
        paragraph: "text-lg text-gray-600 dark:text-gray-400 mb-12 leading-relaxed",
        emailLink: "flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-[var(--color-primary)] transition-colors group",
        socialLink: "w-12 h-12 rounded-full bg-gray-50 dark:bg-white/5 shadow-lg dark:shadow-none dark:border dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[var(--color-secondary)] hover:text-white transition-all",
        emailIconBox: "w-12 h-12 rounded-full bg-gray-50 dark:bg-white/5 shadow-lg dark:shadow-none dark:border dark:border-white/10 flex items-center justify-center group-hover:bg-[var(--color-secondary)] group-hover:text-white transition-all",
        formCard: "bg-gray-50 dark:bg-white/5 p-8 rounded-[2.5rem] dark:border dark:border-white/10 shadow-lg dark:shadow-none transition-all relative overflow-hidden",
        label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block",
        inputWrapper: "relative",
        inputIcon: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-600",
        inputField: "w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/10 outline-none transition-all text-gray-900 dark:text-gray-100 placeholder:text-gray-400 disabled:opacity-70 disabled:cursor-not-allowed",
        submitButton: "w-full py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold text-lg hover:bg-[var(--color-secondary)] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[var(--color-primary)]/20 disabled:opacity-70 disabled:cursor-not-allowed",
    };

    return (
        <section id="contact" className={styles.section}>
            <Toaster position="bottom-right" />
            <div className={styles.container}>
                <div className={styles.grid}>

                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={styles.subheading}>{dictionary.contact.subheading}</h2>
                        <h3 className={styles.heading}>{dictionary.contact.heading}</h3>
                        <p className={styles.paragraph}>
                            {dictionary.contact.description}
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:bagaspermana1409@gmail.com" className={styles.emailLink}>
                                <div className={styles.emailIconBox}>
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-lg">bagaspermana1409@gmail.com</span>
                            </a>

                            <div className="flex gap-4 pt-4">
                                <a href="#" className={styles.socialLink}>
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className={styles.socialLink}>
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={styles.formCard}
                    >
                        {user ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-white/10 mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Hi, {user.username}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="text-xs flex items-center gap-1.5 text-red-500 hover:text-red-600 font-bold bg-red-50 dark:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all hover:bg-red-100 dark:hover:bg-red-500/20"
                                    >
                                        <LogOut className="w-3.5 h-3.5" />
                                        Logout
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={styles.label}>{dictionary.contact.form.name}</label>
                                        <div className={styles.inputWrapper}>
                                            <User className={styles.inputIcon} />
                                            <input
                                                type="text"
                                                value={user.username}
                                                disabled
                                                className={`${styles.inputField} bg-gray-100 dark:bg-white/5 opacity-70`}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className={styles.label}>{dictionary.contact.form.email}</label>
                                        <div className={styles.inputWrapper}>
                                            <Mail className={styles.inputIcon} />
                                            <input
                                                type="email"
                                                value={user.email}
                                                disabled
                                                className={`${styles.inputField} bg-gray-100 dark:bg-white/5 opacity-70`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className={styles.label}>{dictionary.contact.form.subject}</label>
                                    <div className={styles.inputWrapper}>
                                        <MessageSquare className={styles.inputIcon} />
                                        <input
                                            type="text"
                                            placeholder={dictionary.contact.form.subject_placeholder}
                                            className={styles.inputField}
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className={styles.label}>{dictionary.contact.form.message}</label>
                                    <textarea
                                        rows={4}
                                        placeholder={dictionary.contact.form.message_placeholder}
                                        className={`${styles.inputField} resize-none p-4`}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={styles.submitButton}
                                >
                                    {loading ? dictionary.contact.form.btn_sending : dictionary.contact.form.btn_submit}
                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
                                <div className="w-20 h-20 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)] mb-2">
                                    <Lock className="w-10 h-10" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-[var(--color-primary)] dark:text-white mb-2">{dictionary.contact.login_required}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
                                        {dictionary.contact.login_msg}
                                    </p>
                                </div>
                                <div className="flex gap-4 w-full max-w-sm">
                                    <Link href="/login" className="flex-1 py-3 px-6 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:bg-[var(--color-secondary)] transition-all flex items-center justify-center gap-2">
                                        <LogIn className="w-5 h-5" />
                                        {dictionary.contact.btn_signin}
                                    </Link>
                                    <Link href="/register" className="flex-1 py-3 px-6 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all text-center">
                                        {dictionary.contact.btn_register}
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
