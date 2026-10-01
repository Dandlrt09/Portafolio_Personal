import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const StarRating = ({ count }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} size={12} className={i <= count ? 'fill-amber-400 text-amber-400' : 'text-white/10'} />
        ))}
    </div>
);

const ProjectCard = ({ project, index }) => {
    const { t, language } = useLanguage();
    const [expanded, setExpanded] = useState(false);
    const metrics = project.metrics?.[language] || project.metrics?.es;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-surface border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-colors flex flex-col h-full"
        >
            {/* Project Image */}
            <div className="h-48 overflow-hidden relative">
                <img
                    src={project.image}
                    alt={project.title[language] || project.title?.es}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map(tech => (
                            <span key={tech} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <StarRating count={project.stars} />
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title[language] || project.title?.es}
                </h3>

                {(() => {
                    const desc = project.description[language] || project.description['es'];
                    const needsClamp = desc.length > 100;
                    return (
                        <>
                            <p className={`text-text-muted text-sm mb-1 flex-grow ${needsClamp && !expanded ? 'line-clamp-3' : ''}`}>
                                {desc}
                            </p>
                            {needsClamp && (
                                <button
                                    onClick={() => setExpanded(!expanded)}
                                    className="text-xs text-text-muted hover:text-primary transition-colors cursor-pointer mt-1 mb-2"
                                >
                                    {expanded ? t.projects.showLess : t.projects.showMore}
                                </button>
                            )}
                        </>
                    );
                })()}

                {/* Métricas de resultado */}
                {metrics && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {metrics.map((m, i) => (
                            <span key={i} className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                                <TrendingUp size={11} />
                                {m}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-white/5">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-text hover:text-primary transition-colors"
                    >
                        <Github size={16} />
                        {t.projects.viewRepo}
                    </a>
                    {project.streamlit && (
                        <a
                            href={project.streamlit}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-text hover:text-primary transition-colors"
                        >
                            <ExternalLink size={16} />
                            {t.projects.viewDemo}
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
