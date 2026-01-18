'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from '@/lib/axios';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
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
            const res = await api.post('/auth/register', formData);
            const { token, user } = res.data;

            // Auto login logic: store token
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success('Account created successfully!');

            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
            <Toaster position="top-center" />

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
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
                        <UserPlus size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-white/50">Join to stay connected</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70 ml-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                                placeholder="johndoe"
                            />
                        </div>
                    </div>

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
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
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
                                minLength={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                                placeholder="Min 6 characters"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
                    </button>
                </form>

                <p className="text-center mt-8 text-white/50 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
