import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/**
 * The "Sobre mí" section on its own.
 *
 * It used to be the top half of Skills.jsx, which meant Habilidades shared this
 * section's background and read as a sub-block of it. Splitting them gives each
 * one its own section element and its own heading level, like Projects has.
 */
const About = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-20 bg-surface text-text">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold"
                    >
                        <span className="border-b-4 border-primary pb-2">{t.about.title}</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-8 max-w-3xl text-lg text-text-muted leading-relaxed whitespace-pre-line"
                    >
                        {t.about.description}
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default About;
