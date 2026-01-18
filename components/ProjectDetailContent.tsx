"use client";

import { Project } from "@/types";
import { ArrowLeft, Github, Globe, Smartphone, Monitor, CheckCircle2, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Helper to get correct embed URL
const getYouTubeEmbedUrl = (url: string) => {
    try {
        if (!url) return "";
        let videoId = "";

        // Handle youtube.com/watch?v=ID
        if (url.includes("youtube.com/watch?v=")) {
            videoId = url.split("v=")[1]?.split("&")[0];
        }
        // Handle youtu.be/ID
        else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1]?.split("?")[0];
        }
        // Handle already embed/ID
        else if (url.includes("youtube.com/embed/")) {
            return url;
        }

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    } catch (e) {
        return url;
    }
};

export default function ProjectDetailContent({ project }: { project: Project }) {
    const isWeb = project.type === "web";
    const embedUrl = project.videoUrl ? getYouTubeEmbedUrl(project.videoUrl) : "";

    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[var(--color-bg)]"
        >
            {/* Header */}
            <header className="pt-32 pb-12 px-6 bg-[var(--color-bg)] relative overflow-hidden text-center">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6 flex justify-center"
                    >
                        <span className="px-4 py-1.5 rounded-full border border-[var(--color-secondary)]/30 text-[10px] font-bold tracking-widest uppercase text-[var(--color-secondary)] bg-[var(--color-secondary)]/5">
                            {isWeb ? "Web Development" : "Mobile Development"}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-7xl font-bold text-[var(--color-primary)] mb-8 leading-tight tracking-tight"
                    >
                        {project.title}
                    </motion.h1>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="inline-flex items-center bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:shadow-md transition-shadow">
                            <Link
                                href="/"
                                className="px-6 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-[#0C2B4E] hover:bg-gray-50 transition-all flex items-center gap-2"
                            >
                                Home
                            </Link>
                            <div className="px-6 py-2 rounded-full text-sm font-medium bg-[#0C2B4E] text-white shadow-md">
                                Project Details
                            </div>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
                    >
                        {project.shortDescription}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-8 py-4 border border-gray-200 text-gray-700 bg-white rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                            >
                                <Github className="w-5 h-5" /> Source Code
                            </a>
                        )}
                    </motion.div>
                </div>
            </header>

            {/* Main Content Grid */}
            <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="max-w-6xl mx-auto px-6 -mt-10 mb-24 relative z-10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Left Column: Project Image (Preview) & Description */}
                    <div className="space-y-12">
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={project.images?.[0] || ""}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Case Study Description */}
                        <div>
                            <h2 className="text-[var(--color-primary)] dark:text-white text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-[var(--color-secondary)] rounded-full"></span>
                                Case Study
                            </h2>
                            <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                                {project.description}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Specs & Media */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-xl">

                            {/* 1. Project Assets (Video, Download, Live View) */}
                            {(project.videoUrl || project.downloadUrl || project.liveUrl) && (
                                <div className="mb-8">
                                    <h3 className="text-[var(--color-primary)] dark:text-white font-bold mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-6 bg-[var(--color-secondary)] rounded-full"></span>
                                        Project Assets
                                    </h3>

                                    {project.videoUrl && (
                                        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-gray-900 relative mb-6">
                                            <iframe
                                                src={embedUrl}
                                                className="w-full h-full"
                                                title="Project Demo"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-3">
                                        {project.downloadUrl && (
                                            <a
                                                href={project.downloadUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] text-white rounded-xl font-bold transition-all shadow-md group"
                                            >
                                                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                                Download Project
                                            </a>
                                        )}

                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 text-[var(--color-primary)] hover:bg-gray-50 rounded-xl font-bold transition-all shadow-sm hover:shadow-md group"
                                            >
                                                <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                View Project
                                            </a>
                                        )}
                                    </div>

                                    <div className="w-full h-px bg-gray-100 mt-8" />
                                </div>
                            )}

                            {/* 2. Tech Stack */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-md text-sm font-medium text-[var(--color-primary)] dark:text-gray-300 hover:bg-[var(--color-primary)] hover:text-white transition-colors cursor-default"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-px bg-gray-100 my-8" />

                            {/* 3. Features */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Key Features</h3>
                                <div className="space-y-3">
                                    {project.features.map((f, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-3 items-start p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-[var(--color-secondary)]/20 transition-all duration-300"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-px bg-gray-100 my-8" />

                            {/* 4. Type Info */}
                            <div>
                                <span className="block text-xs text-gray-400 mb-1">Type</span>
                                <div className="font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    {isWeb ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                    {isWeb ? "Web Application" : "Mobile Application"}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </motion.section>
        </motion.article>
    );
}
