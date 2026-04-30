import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Code } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProjectCard = ({ project, index }) => {
    const { t, language } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-surface border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-colors flex flex-col h-full"
        >
            {/* Project Image */}
            <div className="h-48 overflow-hidden relative">
                <img
                    src={project.image}
                    alt={project.title}
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
                    {project.title}
                </h3>

                <p className="text-text-muted text-sm mb-6 flex-grow line-clamp-3">
                    {project.description[language] || project.description['es']}
                </p>

                <div className="flex flex-col gap-2 mt-auto">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-text hover:text-primary transition-colors"
                    >
                        <Github size={16} />
                        {t.projects.viewCode}
                    </a>
                    {project.streamlit && (
                        <a
                            href={project.streamlit}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-text hover:text-primary transition-colors"
                        >
                            <ExternalLink size={16} />
                            {t.projects.viewStreamlit}
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
