"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Layout,
  Server,
  Smartphone,
  Star,
  Terminal,
  Briefcase,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import RainEffect from "./RainEffect";

export default function About() {
  const { dictionary } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    {
      icon: Layout,
      name: dictionary.about.skills.frontend_title,
      desc: dictionary.about.skills.frontend_desc,
      type: 'frontend',
      image: '/about-frontend.jpg'
    },
    {
      icon: Database,
      name: dictionary.about.skills.backend_title,
      desc: dictionary.about.skills.backend_desc,
      type: 'backend',
      image: '/about-backend.jpg'
    },
    {
      icon: Smartphone,
      name: dictionary.about.skills.mobile_title,
      desc: dictionary.about.skills.mobile_desc,
      type: 'mobile',
      image: '/about-mobile.jpg'
    },
  ];

  // Determine which image to display
  const currentImage = hoveredSkill
    ? skills.find(s => s.type === hoveredSkill)?.image || '/about.jpg'
    : '/about.jpg';

  return (
    <section
      id="about"
      className="py-24 px-6 bg-[#0C2B4E] text-white scroll-mt-28 overflow-hidden relative"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[var(--color-secondary)] rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-purple-600 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Side: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden bg-gray-800 border-4 border-[var(--color-secondary)]/20 shadow-2xl">
            {/* Placeholder for Profile Image - modifying to use a high quality placeholder or asset if available.
                     Using a generic dev image for now as per standard practice when no asset is provided. */}
            <Image
              src={currentImage}
              alt="Bagas Developer"
              fill
              className="object-cover transition-all duration-500 ease-in-out"
              priority
            />
            {/* Rain Effect Overlay */}
            <RainEffect intensity={60} />
          </div>

          {/* Floating Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-8 -left-4 md:left-8 bg-[var(--color-secondary)] text-white p-6 rounded-3xl shadow-xl flex items-center gap-4 max-w-xs"
          >
            <Briefcase className="w-8 h-8 text-white fill-white/20" />
            <div>
              <h4 className="text-2xl font-bold">
                {dictionary.about.years_exp}
              </h4>
              <p className="text-sm text-white/80">
                {dictionary.about.badge_exp}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold leading-tight mb-8 transition-colors duration-300 ${isHovered ? "text-[var(--color-secondary)]" : "text-white"
              }`}
          >
            {dictionary.about.title_main}{" "}
            <span
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`cursor-pointer transition-colors duration-300 ${isHovered ? "text-white" : "text-[var(--color-secondary)]"
                }`}
            >
              {dictionary.about.title_accent}
            </span>
          </h2>

          <div className="space-y-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex gap-4 md:gap-6 group cursor-pointer"
                onMouseEnter={() => setHoveredSkill(skill.type)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center border border-[var(--color-secondary)]/50 group-hover:bg-[var(--color-secondary)] group-hover:border-[var(--color-secondary)] transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.1)] group-hover:shadow-[0_0_25px_var(--color-secondary)]">
                    <skill.icon className="w-7 h-7 text-[var(--color-secondary)] group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-secondary)] transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <p className="text-gray-400 leading-relaxed md:max-w-md group-hover:text-white transition-colors duration-300">
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
