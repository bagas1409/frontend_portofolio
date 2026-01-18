'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from '@/lib/axios';

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/auth/forgotpassword', { email });
            setSent(true);
            toast.success('Reset link sent to your email!');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
            <Toaster position="top-center" />

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] right-[10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10"
            >
                <Link href="/login" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm">
                    <ArrowLeft size={16} /> Back to Login
                </Link>

                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                        <Mail size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
                    <p className="text-white/50">Enter your email to reset your password</p>
                </div>

                {sent ? (
                    <div className="text-center bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                        <p className="text-green-400 font-medium mb-2">Check your email</p>
                        <p className="text-white/60 text-sm">We've sent password reset instructions to {email}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Reset Link'}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
