import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LABEL = 'text-xs font-semibold uppercase tracking-wider';

/**
 * The lead block of every project ficha: who did it and under what conditions.
 *
 * It replaces the old order, where the first thing a reader met was the problem and the
 * person only appeared halfway through the technical decision.
 */
export const ProjectRole = ({ role, timeline, className = '' }) => {
    const { t, language } = useLanguage();
    if (!role) return null;

    return (
        <div className={`border-l-2 border-primary/60 pl-4 ${className}`}>
            <p className={`${LABEL} text-primary`}>{t.projects.labels.role}</p>
            <p className="mt-2 text-sm leading-relaxed text-text">{role[language] || role.es}</p>
            {timeline && (
                <p className="mt-2 text-xs font-medium text-text-muted">{timeline[language] || timeline.es}</p>
            )}
        </div>
    );
};

/**
 * Project complexity — never Daniel's skill level with those technologies.
 *
 * Two 1-5 self-ratings on the same page would be two scales with the same range and
 * different meanings. This one is always labelled, and it always carries the reason behind
 * the number: a bare score cannot be verified and reads as self-praise.
 */
export const ComplexityRating = ({ complexity, className = '' }) => {
    const { t, language } = useLanguage();
    if (!complexity) return null;

    return (
        <div className={className}>
            <div className="mb-2 flex items-center gap-2">
                <span className={`${LABEL} text-text-muted`}>{t.projects.labels.complexity}</span>
                <span className="flex items-center gap-0.5" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <Star
                            key={step}
                            size={12}
                            className={step <= complexity.level ? 'fill-amber-400 text-amber-400' : 'text-white/10'}
                        />
                    ))}
                </span>
                <span className="font-mono text-xs text-text-muted">{complexity.level}/5</span>
            </div>
            <p className="text-xs leading-relaxed text-text-muted/85">
                {complexity.reason[language] || complexity.reason.es}
            </p>
        </div>
    );
};
