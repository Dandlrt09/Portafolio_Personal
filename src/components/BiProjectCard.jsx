import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BarChart2, Maximize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ReportModal from './ReportModal';

const BiProjectCard = ({ project, index }) => {
    const { t, language } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-surface border border-white/5 rounded-xl overflow-hidden hover:border-accent/50 transition-colors flex flex-col h-full"
            >
                {/* Project Image */}
                <div className="h-48 overflow-hidden relative">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
                    {/* Tool badge */}
                    <div className="absolute top-3 right-3 bg-accent/20 border border-accent/30 text-accent text-xs font-mono px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                        <BarChart2 size={12} />
                        {project.tool}
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.topics?.map(topic => (
                            <span key={topic} className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
                                {topic}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-text-muted text-sm mb-6 flex-grow line-clamp-3">
                        {project.description[language] || project.description['es']}
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                        {/* Ver aquí — abre el modal */}
                        <button
                            onClick={() => setModalOpen(true)}
                            className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg bg-accent/15 text-accent border border-accent/25 hover:bg-accent/25 transition-colors"
                        >
                            <Maximize2 size={14} />
                            {t.projects.viewHere}
                        </button>

                        {/* Ver Reporte — abre en pestaña nueva */}
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-accent transition-colors"
                        >
                            <ExternalLink size={14} />
                            {t.projects.viewReport}
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Modal con iframe */}
            {modalOpen && (
                <ReportModal project={project} onClose={() => setModalOpen(false)} />
            )}
        </>
    );
};

export default BiProjectCard;

