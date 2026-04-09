import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ReportModal = ({ project, onClose }) => {
    const { t } = useLanguage();

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
                                href={project.link}
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

                    {/* Iframe */}
                    <div className="flex-1 relative">
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
