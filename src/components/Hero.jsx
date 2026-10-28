import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, FileText } from 'lucide-react';
import { CV_URL, HERO_STACK } from '../data/site';
import SocialLinks from './SocialLinks';
import HeroOrbit from './HeroOrbit';
import danielPhoto from '../assets/profile/daniel.webp';

/**
 * Canvas draws with literal colour strings: it cannot read CSS custom properties.
 * These mirror the tokens in tailwind.config.js — keep them in sync.
 */
const CANVAS_TOKEN = {
    primary: '139,92,246',
    muted: '148,163,184',
};

/** A link is drawn while the squared distance stays under this value. */
const LINK_DISTANCE_SQ = 18000;
/** One particle per this many square pixels, so density survives resizing. */
const POINT_AREA = 26000;
/** Kept low on purpose: the orbit labels are the main motion, this is depth. */
const LINK_ALPHA = 0.22;

/**
 * Ambient node network behind the portrait. Pauses when off screen and renders a
 * single static frame when the user prefers reduced motion.
 */
const NetworkCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;
        const ctx = canvas.getContext('2d');
        if (!ctx) return undefined;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        let width = 0;
        let height = 0;
        let points = [];
        let frameId = null;
        let running = false;

        const build = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.max(12, Math.round((width * height) / POINT_AREA));
            points = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.24,
                vy: (Math.random() - 0.5) * 0.24,
                radius: Math.random() * 1.4 + 0.5,
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            points.forEach((point) => {
                point.x += point.vx;
                point.y += point.vy;
                if (point.x < 0 || point.x > width) point.vx *= -1;
                if (point.y < 0 || point.y > height) point.vy *= -1;
            });

            for (let i = 0; i < points.length; i += 1) {
                for (let j = i + 1; j < points.length; j += 1) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const distanceSq = dx * dx + dy * dy;
                    if (distanceSq < LINK_DISTANCE_SQ) {
                        const alpha = (1 - distanceSq / LINK_DISTANCE_SQ) * LINK_ALPHA;
                        ctx.strokeStyle = `rgba(${CANVAS_TOKEN.primary},${alpha.toFixed(3)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
            }

            points.forEach((point) => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${CANVAS_TOKEN.muted},.5)`;
                ctx.fill();
            });
        };

        const loop = () => {
            draw();
            frameId = window.requestAnimationFrame(loop);
        };
        const start = () => {
            if (running || reduceMotion) return;
            running = true;
            loop();
        };
        const stop = () => {
            running = false;
            if (frameId) window.cancelAnimationFrame(frameId);
            frameId = null;
        };

        build();
        draw();

        let observer = null;
        if (!reduceMotion) {
            if ('IntersectionObserver' in window) {
                observer = new IntersectionObserver(
                    (entries) => {
                        if (entries[0].isIntersecting) {
                            start();
                        } else {
                            stop();
                        }
                    },
                    { threshold: 0.15 },
                );
                observer.observe(canvas);
            } else {
                start();
            }
        }

        const handleResize = () => {
            stop();
            build();
            draw();
            start();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            stop();
            if (observer) observer.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
};

const Hero = () => {
    const { t } = useLanguage();
    const reduceMotion = useReducedMotion();

    // One staggered entrance for the whole column. When the user prefers reduced
    // motion the elements start at their final state instead of animating.
    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.11 } },
    };
    const item = {
        hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduceMotion ? 0 : 0.7, ease: [0.2, 0.7, 0.3, 1] },
        },
    };

    return (
        <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
            {/* Background: dot grid masked towards the copy, plus a scanning line. */}
            <div aria-hidden="true" className="hero-dot-grid pointer-events-none absolute inset-0" />
            <div
                aria-hidden="true"
                className="hero-scan-line hero-anim-scan pointer-events-none absolute inset-x-0 top-0 h-px"
            />

            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                /* pt-24 clears the fixed 64px header. Budget at 1440x900:
                   96 + 720 + 64 = 880, so the disc stays above the fold. */
                className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-16 px-6 pb-16 pt-24 lg:grid-cols-[0.78fr_1.22fr]"
            >
                <div className="text-center lg:text-left">
                    <motion.p
                        variants={item}
                        className="mb-5 flex items-center justify-center gap-2.5 text-xs font-medium tracking-[0.05em] text-secondary lg:justify-start"
                    >
                        <span
                            aria-hidden="true"
                            className="hero-anim-blink h-[7px] w-[7px] rounded-full bg-secondary"
                        />
                        {t.hero.badge}
                    </motion.p>

                    {/* The name carries the brand gradient as one whole element: never
                        split a phrase between flat and gradient. */}
                    <motion.h1
                        variants={item}
                        className="mb-5 text-4xl font-bold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[58px]"
                    >
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {t.hero.title}
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="mx-auto mb-8 max-w-[48ch] text-base leading-[1.7] text-text-muted lg:mx-0 lg:text-lg"
                    >
                        {t.hero.subtitle}
                    </motion.p>

                    <motion.div
                        variants={item}
                        className="flex flex-wrap items-center justify-center gap-3.5 lg:justify-start"
                    >
                        <a
                            href="#projects"
                            className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
                        >
                            {t.hero.cta}
                            <ArrowRight size={18} aria-hidden="true" />
                        </a>
                        <a
                            href={CV_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-8 py-3 text-base font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10"
                        >
                            {t.hero.resume}
                            <FileText size={18} aria-hidden="true" />
                        </a>

                        {/* Los iconos sociales vuelven al hero. Van en la misma fila de CTA para
                            no sumar un bloque vertical: el presupuesto de encuadre a 1440x900
                            está justo (pt-24 + panel + pb-16). El CV no va acá: ya es el botón
                            de al lado, mismo destino. */}
                        <SocialLinks />
                    </motion.div>

                    {/* Static fallback for the orbit: narrow viewports and reduced motion. */}
                    <motion.ul
                        variants={item}
                        aria-label={t.hero.stackLabel}
                        className={`mt-9 flex flex-wrap justify-center gap-2 lg:justify-start ${
                            reduceMotion ? '' : 'lg:hidden'
                        }`}
                    >
                        {HERO_STACK.map((tech) => (
                            <li
                                key={tech}
                                className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[12.5px] font-medium text-text-muted"
                            >
                                {tech}
                            </li>
                        ))}
                    </motion.ul>
                </div>

                <motion.div
                    variants={item}
                    /* A disc, not a rounded square: the orbit system reads as a planet. */
                    className="relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-surface/75 to-background/90 shadow-[0_40px_90px_-50px_rgba(139,92,246,0.6)] sm:max-w-[720px] lg:justify-self-end"
                >
                    <NetworkCanvas />

                    <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="hero-anim-breathe h-[320px] w-[320px] rounded-full bg-primary/20 blur-[70px] sm:h-[420px] sm:w-[420px]" />
                    </div>

                    <HeroOrbit
                        label={t.hero.stackLabel}
                        className={reduceMotion ? 'hidden' : 'hidden lg:block'}
                    />

                    {/* Circular portrait. pointer-events-none so a drag that starts on
                        the photo still reaches the orbit field underneath. */}
                    {/* Percentages of the square panel, not fixed px: the portrait then
                        scales with the orbits, which are also panel fractions. */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/15 sm:h-[44%] sm:w-[44%]">
                        <img
                            src={danielPhoto}
                            alt={t.hero.title}
                            width="640"
                            height="640"
                            decoding="async"
                            className="h-full w-full object-cover brightness-[0.96]"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/35 via-primary/10 to-background/60 mix-blend-multiply"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
