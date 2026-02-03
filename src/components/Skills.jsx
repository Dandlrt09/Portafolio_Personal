import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Code2, BarChart, Palette, Cpu } from 'lucide-react';

const skills = [
    { key: "python", icon: <Code2 size={24} />, level: 90 },
    { key: "dataviz", icon: <BarChart size={24} />, level: 85 },
    { key: "design", icon: <Palette size={24} />, level: 90 },
    { key: "automation", icon: <Cpu size={24} />, level: 80 },
];

const Skills = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-20 bg-surface text-text">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* About Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        <span className="border-b-4 border-primary pb-2">
                            {t.about.title}
                        </span>
                    </h2>
                    <p className="text-lg text-text-muted leading-relaxed mb-6">
                        {t.about.description}
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-background border border-white/5 rounded-lg flex items-center gap-3 hover:border-primary/50 transition-colors group"
                        >
                            <div className="text-primary group-hover:scale-110 transition-transform">
                                {skill.icon}
                            </div>
                            <span className="font-medium">{t.skills[skill.key]}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
