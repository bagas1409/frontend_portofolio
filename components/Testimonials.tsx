"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// DATABASE: Masukan data testimoni di sini
const TESTIMONIALS = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "CEO, TechStart",
    image: "/avatar-placeholder.PNG", // Replace with actual photo
    quote:
      "Bagas adalah developer yang luar biasa. Hasil kerjanya melebihi ekspektasi kami, sangat detail dan profesional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Wijaya",
    role: "Product Manager",
    image: "/avatar-placeholder.PNG", // Replace with actual photo
    quote:
      "Kerjasama yang sangat menyenangkan. Komunikasi lancar dan pengerjaan proyek tepat waktu.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder, StartupKita",
    image: "/avatar-placeholder.PNG", // Replace with actual photo
    quote:
      "Website yang dibangun sangat responsif dan cepat. UX yang diterapkan benar-benar memanjakan user kami.",
    rating: 4,
  },
  {
    id: 4,
    name: "Linda Kusuma",
    role: "Marketing Director",
    image: "/avatar-placeholder.PNG", // Replace with actual photo
    quote:
      "Desain yang modern dan fungsionalitas yang handal. Sangat merekomendasikan jasa ini.",
    rating: 5,
  },
  {
    id: 5,
    name: "Reza Rahardian",
    role: "Art Director",
    image: "/avatar-placeholder.PNG", // Replace with actual photo
    quote:
      "Estetika yang sangat bagus. Bagas mengerti betul tentang komposisi warna dan layout.",
    rating: 5,
  },
];

export default function Testimonials() {
  const { dictionary } = useLanguage();

  return (
    <section
      id="testimonials"
      className="py-24 bg-[var(--color-bg)] overflow-hidden relative scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 rounded-full bg-[var(--color-primary)]/5 text-[var(--color-primary)] font-medium text-sm tracking-widest uppercase">
            {dictionary.testimonials.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            {dictionary.testimonials.heading}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {dictionary.testimonials.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT COLUMN: Feature Image */}
          <div className="relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/20 group select-none">
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center text-gray-400 font-bold text-xl">
              Loading Image...
            </div>

            <Image
              src="/testimonial.jpg"
              alt="Testimonial Feature"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay: Glass Stats Card with Avatar Stack */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 left-8 right-8 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-white"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Rating */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400 gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-current drop-shadow-sm"
                        />
                      ))}
                    </div>
                    <span className="font-bold text-xl drop-shadow-md">
                      5.0
                    </span>
                  </div>
                  <p className="text-white/90 text-sm font-medium drop-shadow-sm">
                    {dictionary.testimonials.based_on}
                  </p>
                </div>

                {/* Divider (Hidden on mobile) */}
                <div className="hidden md:block h-10 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

                {/* Avatar Stack */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-4">
                    {TESTIMONIALS.slice(0, 4).map((user, i) => (
                      <div
                        key={i}
                        className="relative w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden bg-gray-300"
                      >
                        <Image
                          src={user.image}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg drop-shadow-md">
                      2.5K+
                    </span>
                    <span className="text-xs text-white/80 font-medium">
                      {dictionary.testimonials.happy_clients}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Vertical Scrolling Cards */}
          <div className="h-[600px] overflow-hidden relative mask-vertical-fade">
            {/* The scrolling track */}
            <motion.div
              animate={{ y: "-50%" }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 20, // Adjust speed here
              }}
              className="flex flex-col gap-6 pb-6"
            >
              {/* Loop double for infinite effect */}
              {[...TESTIMONIALS, ...TESTIMONIALS].map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-4 h-4 ${starIndex < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200 dark:text-gray-700"}`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                    "{item.quote}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-primary)] text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[var(--color-secondary)]">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Quote Icon Background */}
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-[var(--color-primary)]/10 dark:text-white/10 rotate-180" />
                </div>
              ))}
            </motion.div>

            {/* Gradient Masks for Top/Bottom Fade */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
