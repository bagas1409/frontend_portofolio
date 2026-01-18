'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from '@/lib/axios';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post('/auth/login', formData);
            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success('Welcome back!');

            // Redirect to home or previous page
            setTimeout(() => {
                router.push('/');
                // Optional: Force reload to update UI state if needed
                // window.location.href = '/'; 
            }, 1000);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
            <Toaster position="top-center" />

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10"
            >
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                        <LogIn size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-white/50">Sign in to manage your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                    </button>
                </form>

                <p className="text-center mt-8 text-white/50 text-sm">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        Sign Up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
