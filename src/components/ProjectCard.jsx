import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../lib/motion';
import { ProjectRole, ComplexityRating } from './ProjectBlocks';

const ProjectCard = ({ project, index }) => {
    const { t, language } = useLanguage();
    const [expanded, setExpanded] = useState(false);
    const metrics = project.metrics?.[language] || project.metrics?.es;
    const reveal = useReveal({ delay: index * 0.05 });

    return (
        <motion.div
            {...reveal}
            className="group relative bg-surface border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-colors flex flex-col h-full"
        >
            {/* Project Image */}
            {/* aspect-[16/10] en vez de h-48: en la grilla de 2 columnas la tarjeta mide
                ~600px de ancho, así que una altura fija de 192px dejaba una franja 3.14:1
                que recortaba el 68% de una imagen cuadrada. */}
            <div className="aspect-[16/10] overflow-hidden relative">
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
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title[language] || project.title?.es}
                </h3>

                <ProjectRole role={project.role} timeline={project.timeline} className="mb-4" />

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

                <ComplexityRating complexity={project.complexity} className="mb-4" />

                {/* Dos CTA rellenos, lado a lado y a mitad cada uno. Nunca los dos solidos:
                    `design/system.md` define primary (accion) y secondary (apoyo), y dos
                    rellenos primarios competirian entre si. El demo va primero porque es la
                    prueba de que funciona; si no hay demo, el codigo toma el rol primario. */}
                <div className="mt-auto flex gap-3 border-t border-white/5 pt-4">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                            project.streamlit
                                ? 'border border-white/10 bg-white/5 text-text hover:bg-white/10'
                                : 'bg-primary text-white hover:bg-primary/90'
                        }`}
                    >
                        <Github size={16} />
                        {t.projects.viewRepo}
                    </a>
                    {project.streamlit && (
                        <a
                            href={project.streamlit}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors bg-primary text-white hover:bg-primary/90"
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
