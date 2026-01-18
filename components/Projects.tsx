"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/lib/config";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const filters = ["All", "Web", "Mobile"];
const ITEMS_PER_PAGE = 3;

export default function Projects() {
  const { dictionary } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${API_URL}/projects?status=published&visibility=public`
        );
        const json = await res.json();
        // Handle both direct array and { data: [...] } response formats
        const data = Array.isArray(json) ? json : (json.data || []);

        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page when filter changes
    if (filter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.type.toLowerCase() === filter.toLowerCase())
      );
    }
  }, [filter, projects]);

  const getFilterLabel = (f: string) => {
    if (f === "All") return dictionary.projects.filter_all;
    if (f === "Web") return dictionary.projects.filter_web;
    if (f === "Mobile") return dictionary.projects.filter_mobile;
    return f;
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section id="projects" className="py-24 px-6 scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 md:gap-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h2 className="text-[var(--color-secondary)] uppercase tracking-widest font-medium mb-3 text-sm">{dictionary.projects.portfolio}</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
              {dictionary.projects.selected_works}<span className="text-[var(--color-secondary)]">.</span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex p-1.5 bg-gray-100/50 dark:bg-white/5 rounded-full border border-gray-100 dark:border-white/10 relative"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10",
                  filter === f
                    ? "text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-[var(--color-primary)] dark:hover:text-white"
                )}
              >
                {getFilterLabel(f)}
                {filter === f && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-[var(--color-secondary)] rounded-full -z-10 shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px] content-start">
              <AnimatePresence mode="wait">
                {paginatedProjects.map((project, index) => {
                  return (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group relative bg-white dark:bg-white/5 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 flex flex-col"
                    >
                      <div className="block h-full flex flex-col ml-0">
                        {/* Image Section - Inset with padding - Animated Fade In */}
                        <div className="p-4 pb-0">
                          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl relative shadow-inner">
                            {project.images?.[0] ? (
                              <Image
                                src={project.images[0]}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                            )}
                          </div>
                        </div>

                        {/* Content Section - Animated Fade In */}
                        <div className="p-6 pt-6 flex flex-col grow">
                          <span className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                            {project.type} DEVELOPMENT
                          </span>
                          <h4 className="text-2xl font-bold text-[var(--color-primary)] dark:text-white mb-4 line-clamp-2 leading-tight">
                            {project.title}
                          </h4>

                          {/* Tech Stack & Features */}
                          <div className="flex flex-col gap-4 mb-8">
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.slice(0, 3).map((tech, i) => (
                                <div
                                  key={i}
                                  className="px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-[var(--color-secondary)]/10 dark:border-white/10 text-[10px] text-[var(--color-secondary)] dark:text-gray-300 font-bold shadow-sm"
                                >
                                  {tech}
                                </div>
                              ))}
                              {project.techStack.length > 3 && (
                                <div className="px-3 py-1 rounded-full bg-gray-50 dark:bg-white/5 text-[10px] text-gray-400 font-bold">
                                  +{project.techStack.length - 3}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm text-[var(--color-primary)]/60 dark:text-gray-400">
                                {dictionary.projects.stack_used}
                              </span>
                              <span className="h-1 w-1 rounded-full bg-[var(--color-secondary)]/30"></span>
                              <span className="text-sm font-medium text-[var(--color-secondary)] bg-[var(--color-secondary)]/5 px-2 py-0.5 rounded-full border border-[var(--color-secondary)]/10">
                                {project.features.length} Features
                              </span>
                            </div>
                          </div>

                          {/* Footer Row */}
                          <div className="mt-auto flex items-center justify-end border-t border-[var(--color-secondary)]/10 pt-4">
                            <Link
                              href={`/projects/${project.slug}`}
                              className="relative flex items-center justify-center h-10 px-6 rounded-full bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] text-white transition-colors duration-300 ease-in-out w-36 group/btn overflow-hidden"
                            >
                              <span className="absolute whitespace-nowrap transform transition-all duration-300 ease-in-out group-hover/btn:-translate-x-3 font-medium text-sm">
                                {dictionary.projects.view_project}
                              </span>
                              <ArrowUpRight className="absolute right-4 w-4 h-4 opacity-0 transform translate-x-4 transition-all duration-300 ease-out group-hover/btn:opacity-100 group-hover/btn:translate-x-0 delay-75" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] disabled:opacity-30 disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-all cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer",
                        currentPage === page
                          ? "bg-[var(--color-primary)] text-white shadow-lg scale-110"
                          : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] disabled:opacity-30 disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-all cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
