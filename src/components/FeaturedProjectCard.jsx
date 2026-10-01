import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Target, Lightbulb } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';

const LabeledBlock = ({ label, text, icon: Icon, iconClass }) => (
    <div>
        <div className="mb-2 flex items-center gap-2">
            <Icon size={14} className={iconClass} />
            <span className={cn('text-xs font-semibold uppercase tracking-wider', iconClass)}>{label}</span>
        </div>
        <p className="text-sm leading-relaxed text-text-muted">{text}</p>
    </div>
);

const FeaturedProjectCard = ({ project, index }) => {
    const { t, language } = useLanguage();
    const labels = t.projects.labels;
    const reversed = index % 2 === 1;

    const title = project.title[language] || project.title.es;
    const tagline = project.tagline[language] || project.tagline.es;
    const status = project.status ? project.status[language] || project.status.es : null;
    const alt = project.imageAlt ? project.imageAlt[language] || project.imageAlt.es : title;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="grid overflow-hidden rounded-2xl border border-white/10 bg-surface lg:grid-cols-2"
        >
            {/* Media */}
            <div className={cn('relative min-h-[240px]', reversed && 'lg:order-2')}>
                {project.image ? (
                    <img src={project.image} alt={alt} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-background px-8 py-12 text-center">
                        <span className="text-2xl font-bold tracking-tight text-white/85">{title}</span>
                        <span className="font-mono text-xs leading-relaxed text-text-muted">
                            {project.stack.join(' · ')}
                        </span>
                    </div>
                )}

                {status && (
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm">
                        {status}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className={cn('flex flex-col gap-6 p-7 lg:p-9', reversed && 'lg:order-1')}>
                <div>
                    <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">{tagline}</p>
                </div>

                <LabeledBlock
                    label={labels.problem}
                    text={project.problem[language] || project.problem.es}
                    icon={Target}
                    iconClass="text-amber-400"
                />

                <LabeledBlock
                    label={labels.decision}
                    text={project.decision[language] || project.decision.es}
                    icon={Lightbulb}
                    iconClass="text-emerald-400"
                />

                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                        {labels.stack}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                            <span
                                key={item}
                                className="rounded bg-white/5 px-2.5 py-1 font-mono text-xs text-text-muted"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
                    <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    >
                        <Github size={16} />
                        {t.projects.viewRepo}
                    </a>

                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                        >
                            <ExternalLink size={16} />
                            {t.projects.viewDemo}
                        </a>
                    )}

                    {project.meta && (
                        <span className="font-mono text-xs text-text-muted/70">
                            {project.meta[language] || project.meta.es}
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

export default FeaturedProjectCard;
