import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { archivedProjects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

const ArchiveSection = () => {
    const { t, language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-16">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 rounded-xl border border-white/10 bg-surface px-6 py-4 text-left transition-colors hover:border-white/20"
            >
                <div>
                    <span className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                        {t.projects.archiveTitle}
                    </span>
                    <span className="ml-3 font-mono text-xs text-text-muted/60">
                        {archivedProjects.length}
                    </span>
                </div>
                <span className="flex items-center gap-2 text-sm text-text-muted">
                    {isOpen ? t.projects.archiveHide : t.projects.archiveShow}
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={18} />
                    </motion.span>
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="archive"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-2 pt-5">
                            <p className="mb-5 text-sm text-text-muted">{t.projects.archiveNote}</p>

                            <ul className="divide-y divide-white/5">
                                {archivedProjects.map((project) => {
                                    const href =
                                        project.local && typeof window !== 'undefined'
                                            ? `${window.location.origin}${project.link}`
                                            : project.link;

                                    return (
                                        <li key={project.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3">
                                            <span className="text-sm text-text">
                                                {project.title[language] || project.title.es}
                                            </span>
                                            <span className="font-mono text-xs text-text-muted/70">
                                                {project.detail[language] || project.detail.es}
                                            </span>
                                            <span className="ml-auto flex items-center gap-4">
                                                {project.demo && (
                                                    <a
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-primary"
                                                    >
                                                        <ExternalLink size={13} />
                                                        {t.projects.viewDemo}
                                                    </a>
                                                )}
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-primary"
                                                >
                                                    <ExternalLink size={13} />
                                                    {t.projects.viewRepo}
                                                </a>
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArchiveSection;
