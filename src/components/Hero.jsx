import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-secondary border border-secondary/20 rounded-full bg-secondary/5">
                        INGENIERO MULTIMEDIA
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                            {t.hero.title}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
                        {t.hero.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            {t.hero.cta} <ArrowRight size={18} />
                        </motion.a>

                        <motion.a
                            href="https://drive.google.com/file/d/18K0VyqUcnGKAGnFtOs223WszclZnH9YB/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            {t.hero.resume || "Ver CV"} <FileText size={18} />
                        </motion.a>

                        <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-4">
                            <SocialLink href="https://github.com/Dandlrt09" icon={<Github size={20} />} />
                            <SocialLink href="https://www.linkedin.com/in/danieldlrt09" icon={<Linkedin size={20} />} />
                            <SocialLink href="mailto:danieldelosriost@gmail.com" icon={<Mail size={20} />} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const SocialLink = ({ href, icon }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, color: '#8b5cf6' }}
        className="p-2 text-text-muted hover:text-primary transition-colors border border-white/5 rounded-full hover:bg-white/5"
    >
        {icon}
    </motion.a>
);

export default Hero;
