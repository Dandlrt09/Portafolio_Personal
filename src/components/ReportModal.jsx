import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Target, Compass, Lightbulb } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ContextSection = ({ context }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 py-4 border-b border-white/10">
        <div className="rounded-lg bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
                <Target size={14} className="text-amber-400" />
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Problema</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{context.problem}</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
                <Compass size={14} className="text-blue-400" />
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Enfoque</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{context.approach}</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} className="text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Insight</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{context.insight}</p>
        </div>
    </div>
);

const ReportModal = ({ project, onClose }) => {
    const { t, language } = useLanguage();

    const context = project.context?.[language] || project.context?.['es'];

    // Para archivos HTML locales construimos la URL absoluta; para reportes externos usamos el link tal cual
    const externalHref = project.localFile
        ? `${window.location.origin}${project.link}`
        : project.link;

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
                    {/* Header bar */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-white/80">{project.title}</span>
                            <span className="text-xs font-mono bg-accent/20 text-accent px-2 py-0.5 rounded-full border border-accent/30">
                                {project.tool}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href={externalHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent transition-colors"
                            >
                                <ExternalLink size={13} />
                                {t.projects.viewReport}
                            </a>
                            <button
                                onClick={onClose}
                                className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Cerrar"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Context cards (only if project has context) */}
                    {context && <ContextSection context={context} />}

                    {/* Iframe */}
                    <div className={`relative ${context ? 'flex-1' : 'flex-1'}`}>
                        <iframe
                            title={project.title}
                            src={project.link}
                            frameBorder="0"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ReportModal;
