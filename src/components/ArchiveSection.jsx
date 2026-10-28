import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Github, ExternalLink, TrendingUp } from 'lucide-react';
import { archivedProjects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { ComplexityRating } from './ProjectBlocks';

/**
 * Análisis y resultados de proyectos — los cuatro ejercicios de práctica.
 *
 * Sigue siendo un desplegable, pero dejó de ser una lista de links sueltos: cada
 * ejercicio es una tarjeta horizontal, más liviana que las fichas destacadas porque
 * no pretende el mismo peso. El símbolo es un gráfico ascendente, no un ícono
 * genérico: dice "análisis y resultados" sin inventar un lenguaje nuevo.
 *
 * Las estrellas son la misma escala de complejidad del resto del sitio, con la misma
 * regla: el número siempre va acompañado de la línea que lo justifica, porque un
 * puntaje pelado se lee como autobombo. Por eso se reusa `ComplexityRating` en vez de
 * rearmar el bloque acá.
 */
const ACTION_BASE =
    'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors';

const ArchiveSection = () => {
    const { t, language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-16">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-controls="archive-panel"
                className="flex w-full items-center justify-between gap-4 rounded-xl border border-white/10 bg-surface px-6 py-4 text-left transition-colors hover:border-white/20"
            >
                <span className="flex items-baseline gap-3">
                    {/* Sin mayúsculas sostenidas: con el nombre largo, uppercase + tracking
                        obliga a leer letra por letra. */}
                    <span className="text-[15px] font-semibold text-text">{t.projects.archiveTitle}</span>
                    <span className="font-mono text-xs text-text-muted/60">{archivedProjects.length}</span>
                </span>
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
                        id="archive-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-2 pt-5">
                            <p className="mb-5 max-w-[70ch] text-sm text-text-muted">{t.projects.archiveNote}</p>

                            <ul className="grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-2">
                                {archivedProjects.map((project) => {
                                    const isLocal = Boolean(project.local) && typeof window !== 'undefined';
                                    const href = isLocal ? `${window.location.origin}${project.link}` : project.link;

                                    return (
                                        <li
                                            key={project.id}
                                            className="flex gap-4 rounded-xl border border-white/10 bg-surface p-5 transition-colors hover:border-primary/40"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary"
                                            >
                                                <TrendingUp size={24} />
                                            </span>

                                            <div className="flex min-w-0 flex-1 flex-col gap-2">
                                                <h3 className="text-[15px] font-semibold leading-snug text-text">
                                                    {project.title[language] || project.title.es}
                                                </h3>

                                                <p className="text-xs text-text-muted">
                                                    {project.detail[language] || project.detail.es}
                                                </p>

                                                <ComplexityRating complexity={project.complexity} className="mt-1" />

                                                {/* Un solo destino por tarjeta: cuando el proyecto vive
                                                    local (el dashboard), no hay repo que ofrecer, así que
                                                    no se repite el mismo link en dos botones. */}
                                                <div className="mt-auto flex gap-2 pt-2">
                                                    {project.demo && (
                                                        <>
                                                            <a
                                                                href={href}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`${ACTION_BASE} border border-white/10 bg-white/5 text-text hover:bg-white/10`}
                                                            >
                                                                <Github size={14} />
                                                                {t.projects.viewRepo}
                                                            </a>
                                                            <a
                                                                href={project.demo}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`${ACTION_BASE} bg-primary text-white hover:bg-primary/90`}
                                                            >
                                                                <ExternalLink size={14} />
                                                                {t.projects.viewDemo}
                                                            </a>
                                                        </>
                                                    )}

                                                    {!project.demo && (
                                                        <a
                                                            href={href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`${ACTION_BASE} bg-primary text-white hover:bg-primary/90`}
                                                        >
                                                            <ExternalLink size={14} />
                                                            {t.projects.viewDashboard}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
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
