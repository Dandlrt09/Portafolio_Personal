import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Github, Linkedin, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    const { t } = useLanguage();
    const cvUrl = "https://drive.google.com/file/d/18K0VyqUcnGKAGnFtOs223WszclZnH9YB/view?usp=sharing";

    return (
        <section id="contact" className="py-20 bg-gradient-to-t from-surface/50 to-background">
            <div className="max-w-3xl mx-auto px-6 text-center">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {t.contact.title}
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed"
                >
                    {t.contact.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-6"
                >
                    {/* Main CTA — Email */}
                    <a
                        href={`mailto:${t.contact.email}`}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                    >
                        <Mail size={22} />
                        {t.contact.cta}
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </a>

                    {/* Email text */}
                    <p className="text-text-muted text-sm -mt-2">
                        {t.contact.email}
                    </p>

                    {/* Social + CV row */}
                    <div className="flex items-center gap-4 mt-4">
                        <a
                            href="https://github.com/Dandlrt09"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 text-text-muted hover:text-primary hover:bg-white/5 rounded-full transition-all border border-white/5"
                            aria-label="GitHub"
                        >
                            <Github size={22} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/danieldlrt09"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 text-text-muted hover:text-primary hover:bg-white/5 rounded-full transition-all border border-white/5"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={22} />
                        </a>
                        <a
                            href={cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 text-text-muted hover:text-secondary hover:bg-white/5 rounded-full transition-all border border-white/5"
                            aria-label={t.contact.cv}
                            title={t.contact.cv}
                        >
                            <FileText size={22} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
