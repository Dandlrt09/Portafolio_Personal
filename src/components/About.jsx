import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../lib/motion';

/**
 * The "Sobre mí" section on its own.
 *
 * It used to be the top half of Skills.jsx, which meant Habilidades shared this
 * section's background and read as a sub-block of it. Splitting them gives each
 * one its own section element and its own heading level, like Projects has.
 */
const About = () => {
    const { t } = useLanguage();
    /* El titulo entra desde arriba y la bajada desde abajo; el retraso los escalona. */
    const revealTitle = useReveal({ duration: 0.5, from: -20 });
    const revealLead = useReveal({ duration: 0.5, delay: 0.1 });

    return (
        <section id="about" className="py-20 bg-surface text-text">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center text-center">
                    <motion.h2
                        {...revealTitle}
                        className="text-3xl md:text-4xl font-bold"
                    >
                        <span className="border-b-4 border-primary pb-2">{t.about.title}</span>
                    </motion.h2>

                    <motion.p
                        {...revealLead}
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
