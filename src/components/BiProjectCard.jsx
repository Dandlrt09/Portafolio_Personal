import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BarChart2, Maximize2, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ReportModal from './ReportModal';
import { ProjectRole, ComplexityRating } from './ProjectBlocks';

const BiProjectCard = ({ project, index }) => {
    const { t, language } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const metrics = project.metrics?.[language] || project.metrics?.es;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-surface border border-white/5 rounded-xl overflow-hidden hover:border-accent/50 transition-colors flex flex-col h-full"
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
                    {/* Tool badge */}
                    <div className="absolute top-3 right-3 bg-accent/20 border border-accent/30 text-accent text-xs font-mono px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                        <BarChart2 size={12} />
                        {project.tool}
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-wrap gap-2">
                            {project.topics?.map(topic => (
                                <span key={topic} className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
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

                    {/* Metrics */}
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

                    {/* El mismo par de CTA que las tarjetas de data science: secundario a la
                        izquierda, primario solido a la derecha. El informe abre la fila porque
                        es el detalle; el dashboard, que abre el modal, es la accion principal y
                        usa el violeta de accion del sistema en vez del rosa de la seccion. */}
                    <div className="mt-auto flex gap-3 border-t border-white/5 pt-4">
                        <a
                            href={project.pdfPath || project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors border border-white/10 bg-white/5 text-text hover:bg-white/10"
                        >
                            <ExternalLink size={16} />
                            {project.pdfPath ? t.projects.viewPdf : t.projects.viewReport}
                        </a>

                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors bg-primary text-white hover:bg-primary/90"
                        >
                            <Maximize2 size={16} />
                            {t.projects.viewDashboard}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Modal con galería o iframe. Se mantiene montado para que AnimatePresence
                pueda animar la salida; la visibilidad la controla `isOpen`. */}
            <ReportModal
                project={project}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
};

export default BiProjectCard;

