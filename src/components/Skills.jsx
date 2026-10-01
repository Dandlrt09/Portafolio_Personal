import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
    const { t } = useLanguage();
    const groups = t.skills.groups;

    return (
        <section id="about" className="py-20 bg-surface text-text">
            <div className="max-w-7xl mx-auto px-6">

                {/* About */}
                <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-8 md:gap-12 mb-16">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
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
                        className="text-lg text-text-muted leading-relaxed whitespace-pre-line"
                    >
                        {t.about.description}
                    </motion.p>
                </div>

                {/* Skills */}
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-text-muted">
                    {t.skills.title}
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groups.map((group, index) => (
                        <motion.div
                            key={group.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.07 }}
                            className="rounded-xl border border-white/5 bg-background p-5 transition-colors hover:border-primary/40"
                        >
                            <p className="mb-3 text-sm font-semibold text-primary">{group.label}</p>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded bg-white/5 px-2 py-1 font-mono text-xs text-text-muted"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
