import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Target, Compass, Lightbulb, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ContextSection = ({ context, labels }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 py-4 border-b border-white/10">
        <div className="rounded-lg bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
                <Target size={14} className="text-amber-400" />
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">{labels.problem}</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{context.problem}</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
                <Compass size={14} className="text-blue-400" />
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">{labels.approach}</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{context.approach}</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} className="text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">{labels.insight}</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{context.insight}</p>
        </div>
    </div>
);

const GalleryView = ({ pages, title, pageLabels }) => {
    const [current, setCurrent] = useState(0);

    return (
        <div className="flex flex-col min-h-0">
            {/* Image counter */}
            <div className="flex items-center justify-between px-5 py-2 border-b border-white/5">
                <span className="text-xs text-text-muted">
                    {pageLabels?.[current] || `Página ${current + 1}`} — {current + 1} / {pages.length}
                </span>
            </div>

            {/* Image container — altura fija para que se vea completo */}
            <div className="relative flex items-center justify-center bg-black/40 p-4"
                 style={{ minHeight: '400px', maxHeight: '70vh' }}>
                <img
                    src={pages[current]}
                    alt={`${title} — ${pageLabels[current]}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />

                {/* Nav arrows */}
                {pages.length > 1 && (
                    <>
                        <button
                            onClick={() => setCurrent(p => Math.max(0, p - 1))}
                            disabled={current === 0}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            onClick={() => setCurrent(p => Math.min(pages.length - 1, p + 1))}
                            disabled={current === pages.length - 1}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={22} />
                        </button>
                    </>
                )}
            </div>

            {/* Dot indicators */}
            {pages.length > 1 && (
                <div className="flex items-center justify-center gap-2 py-3 border-t border-white/5">
                    {pages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                i === current ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const ReportModal = ({ project, onClose }) => {
    const { t, language } = useLanguage();
    const isGallery = !!project.pages;

    const title = project.title[language] || project.title?.es;
    const context = project.context?.[language] || project.context?.['es'];

    // Construir link externo segun el tipo de proyecto
    const externalHref = project.pdfPath
        ? project.pdfPath
        : project.localFile
        ? `${window.location.origin}${project.link}`
        : project.link;

    const externalLabel = project.pdfPath ? t.projects.viewPdf : t.projects.viewReport;

    // Cerrar con Escape
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    // Bloquear scroll del body mientras el modal está abierto
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex flex-col"
                style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="relative flex flex-col w-full h-full max-w-6xl mx-auto my-6 rounded-2xl overflow-hidden border border-white/10"
                    style={{ background: '#0f0f1a' }}
                >
                    {/* Header bar — siempre visible */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-white/80">{title}</span>
                            <span className="text-xs font-mono bg-accent/20 text-accent px-2 py-0.5 rounded-full border border-accent/30">
                                {project.tool}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            {externalHref && (
                                <a
                                    href={externalHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent transition-colors"
                                >
                                    {project.pdfPath ? <Download size={13} /> : <ExternalLink size={13} />}
                                    {externalLabel}
                                </a>
                            )}
                            <button
                                onClick={onClose}
                                className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Cerrar"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Contenido scrolleable */}
                    <div className="flex-1 overflow-y-auto min-h-0">
                        {/* Context cards */}
                        {context && <ContextSection context={context} labels={t.projects.contextLabels} />}

                        {/* Content: Gallery o Iframe */}
                        {isGallery ? (
                            <GalleryView pages={project.pages} title={title} pageLabels={project.pageLabels?.[language] || project.pageLabels?.es} />
                        ) : (
                            <div className="relative" style={{ height: 'calc(100vh - 200px)' }}>
                                <iframe
                                    title={title}
                                    src={project.link}
                                    frameBorder="0"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ReportModal;
