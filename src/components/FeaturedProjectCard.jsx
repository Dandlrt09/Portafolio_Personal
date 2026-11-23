import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Target, Lightbulb } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';
import { useReveal } from '../lib/motion';
import { ProjectRole, ComplexityRating } from './ProjectBlocks';
import StackChips from './StackChips';

/* Grilla técnica de la banda. Va en `style` y no como clase arbitraria de Tailwind para
   que el build no dependa de cómo el JIT parsea dos `linear-gradient` en un `bg-[…]`. */
const GRID_STYLE = {
    backgroundImage:
        'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
    backgroundSize: '44px 44px',
};

const LABEL = 'text-xs font-semibold uppercase tracking-wider';

const LabeledBlock = ({ label, text, icon: Icon, iconClass }) => (
    <div>
        <div className="mb-2 flex items-center gap-2">
            <Icon size={14} className={iconClass} />
            <span className={cn(LABEL, iconClass)}>{label}</span>
        </div>
        <p className="text-sm leading-relaxed text-text-muted">{text}</p>
    </div>
);

/**
 * Tres cifras grandes en lugar del párrafo de complejidad.
 *
 * El párrafo de "sandbox aislado escrito a medida…" no lo lee nadie; los números sí se
 * escanean. Cada uno sigue anclado a un hecho ya aprobado en el `decision`, así que la
 * cifra nunca es una afirmación nueva: `0 archivos` describe la frontera de datos de
 * Datara (al modelo le llegan esquema, metadata, estadísticas y una muestra mínima de
 * filas; el dataset no se sube), no un dato inventado para la ficha.
 */
const MetricStrip = ({ metrics }) => {
    if (!metrics || metrics.length === 0) return null;

    return (
        <dl className="grid border-y border-white/10 md:grid-cols-3">
            {metrics.map((metric) => (
                <div
                    key={metric.label}
                    className="border-t border-white/10 px-7 py-6 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0 lg:px-9"
                >
                    <dt className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-bold leading-none tracking-tight text-text">{metric.value}</span>
                        {metric.unit && <span className="text-base font-medium text-secondary">{metric.unit}</span>}
                    </dt>
                    <dd className="mt-2.5 text-xs leading-relaxed text-text-muted">{metric.label}</dd>
                </div>
            ))}
        </dl>
    );
};

/**
 * Ficha destacada. De arriba hacia abajo: banda visual, título, tres métricas y recién
 * ahí la narrativa en dos columnas.
 *
 * Antes la tarjeta era 50% media / 50% texto y el lector tenía que atravesar dos párrafos
 * largos para llegar al stack. Ahora la banda abre a lo ancho, los números dan el resumen
 * de un vistazo y el detalle queda abajo para quien lo quiera.
 *
 * El orden de bloques sigue mandando la persona: rol → lo que hice → el problema.
 */
const FeaturedProjectCard = ({ project }) => {
    const { t, language } = useLanguage();
    const labels = t.projects.labels;

    const title = project.title[language] || project.title.es;
    const tagline = project.tagline[language] || project.tagline.es;
    const status = project.status ? project.status[language] || project.status.es : null;
    const alt = project.imageAlt ? project.imageAlt[language] || project.imageAlt.es : title;
    const metrics = project.metrics ? project.metrics[language] || project.metrics.es : null;

    /* `margin: '-60px'` mantiene el margen negativo que ya tenía: la ficha entra un poco más
       tarde, cuando de verdad está en pantalla y no asomando por el borde. */
    const reveal = useReveal({ duration: 0.5, from: 24, margin: '-60px' });

    return (
        <motion.article
            {...reveal}
            className="overflow-hidden rounded-2xl border border-white/10 bg-surface"
        >
            {/* Banda visual. La imagen del proyecto es una placa ancha (1200×630 en Datara),
                así que se recorta a lo ancho con `object-cover` y se lee como una franja. */}
            <div className="relative h-[240px] overflow-hidden bg-background lg:h-[300px]" style={GRID_STYLE}>
                {project.image ? (
                    <img src={project.image} alt={alt} className="h-full w-full object-cover" />
                ) : project.logo ? (
                    /* Lockup: símbolo + nombre, dibujado en HTML y no como una sola imagen. El
                       nombre tiene que salir en la Inter del sitio, y un SVG cargado como <img>
                       no puede usar los @font-face de la página (un PNG directamente trae los
                       píxeles cocidos). El símbolo sí es un SVG, y adentro no tiene texto. */
                    <div className="flex h-full w-full items-center justify-center gap-5 px-8">
                        <img src={project.logo} alt="" className="w-20 lg:w-28" />
                        <span className="text-3xl font-semibold tracking-tight text-white/90 lg:text-4xl">{title}</span>
                    </div>
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-8 text-center">
                        <span className="text-3xl font-bold tracking-tight text-white/85 lg:text-4xl">{title}</span>
                        <span className="font-mono text-xs leading-relaxed text-text-muted">
                            {project.stack.join(' · ')}
                        </span>
                    </div>
                )}

                {status && (
                    <span className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm lg:left-9">
                        {status}
                    </span>
                )}
            </div>

            {/* Título */}
            <div className="px-7 pb-6 pt-8 lg:px-9">
                <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{tagline}</p>
            </div>

            <MetricStrip metrics={metrics} />

            {/* Narrativa */}
            <div className="grid md:grid-cols-2">
                <div className="flex flex-col gap-6 px-7 py-8 lg:px-9">
                    <ProjectRole role={project.role} timeline={project.timeline} />

                    <LabeledBlock
                        label={labels.decision}
                        text={project.decision[language] || project.decision.es}
                        icon={Lightbulb}
                        iconClass="text-emerald-400"
                    />
                </div>

                <div className="flex flex-col gap-6 border-t border-white/10 px-7 py-8 md:border-l md:border-t-0 lg:px-9">
                    <LabeledBlock
                        label={labels.problem}
                        text={project.problem[language] || project.problem.es}
                        icon={Target}
                        iconClass="text-amber-400"
                    />

                    <div>
                        <p className={cn(LABEL, 'mb-2 text-text-muted')}>{labels.stack}</p>
                        <StackChips items={project.stack} />
                    </div>

                    <ComplexityRating complexity={project.complexity} />

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
            </div>
        </motion.article>
    );
};

export default FeaturedProjectCard;
