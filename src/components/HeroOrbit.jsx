import React, { useEffect, useRef } from 'react';
import { HERO_ORBITS } from '../data/site';

/** Flat label list, carrying the ring and slot each one belongs to. */
const LABELS = HERO_ORBITS.flatMap((orbit, ringIndex) =>
    orbit.labels.map((label, positionIndex) => ({
        label,
        ringIndex,
        positionIndex,
        key: `${ringIndex}-${positionIndex}`,
    })),
);

/** Radians of rotation per pixel dragged horizontally. */
const DRAG_SENSITIVITY = 0.006;
/** Fraction of the spin velocity still left after one second of free glide. */
const FRICTION_PER_SECOND = 0.12;

/**
 * Planet diameter and font size, as fractions of the panel width, so the
 * proportions hold at any panel size. A circle needs far more room than a chip:
 * the longest label decides the diameter.
 */
const PLANET_DIAMETER = 0.108;
const PLANET_FONT = 0.0145;

/**
 * The stack orbiting the portrait as two counter-rotating rings.
 *
 * A circle in 3D projected onto the panel: each label sits at
 * (cos a * r, sin a * r * tilt), and sin a doubles as its depth. Depth drives
 * scale, opacity and z-index, so labels pass behind the portrait on the way up
 * and in front of it on the way down. Labels never rotate: only their position
 * moves, which is what keeps them readable.
 *
 * Drag anywhere in the panel to spin; releasing glides with friction. The whole
 * field is skipped for reduced motion or below the lg breakpoint, where the
 * static chip list in Hero takes over.
 */
const HeroOrbit = ({ label, className = '' }) => {
    const fieldRef = useRef(null);
    const labelRefs = useRef({});

    useEffect(() => {
        const field = fieldRef.current;
        if (!field) return undefined;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const desktop = window.matchMedia('(min-width: 1024px)');
        let frameId = null;
        let running = false;
        let auto = 0;
        let spin = 0;
        let spinVelocity = 0;
        let dragging = false;
        let lastX = 0;
        let lastTime = 0;

        /** Scale the planet circles to the panel once per layout, not per frame. */
        const resize = () => {
            const size = field.getBoundingClientRect().width;
            if (!size) return;
            const diameter = `${(size * PLANET_DIAMETER).toFixed(1)}px`;
            const fontSize = `${(size * PLANET_FONT).toFixed(2)}px`;
            Object.keys(labelRefs.current).forEach((key) => {
                const el = labelRefs.current[key];
                if (!el) return;
                el.style.width = diameter;
                el.style.height = diameter;
                el.style.fontSize = fontSize;
            });
        };

        const place = () => {
            const size = field.getBoundingClientRect().width;
            if (!size) return;
            HERO_ORBITS.forEach((orbit, ringIndex) => {
                const radius = orbit.radius * size;
                for (let positionIndex = 0; positionIndex < orbit.labels.length; positionIndex += 1) {
                    const el = labelRefs.current[`${ringIndex}-${positionIndex}`];
                    if (!el) continue;
                    const angle =
                        orbit.phase +
                        (positionIndex * Math.PI * 2) / orbit.labels.length +
                        orbit.speed * auto +
                        spin * orbit.dragFactor;
                    const depth = Math.sin(angle);
                    const front = (depth + 1) / 2;
                    const x = Math.cos(angle) * radius;
                    const y = depth * radius * orbit.tilt;
                    el.style.transform = `translate(-50%,-50%) translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${(0.78 + 0.22 * front).toFixed(3)})`;
                    el.style.opacity = (0.35 + 0.65 * front).toFixed(3);
                    el.style.zIndex = depth >= 0 ? '30' : '10';
                }
            });
        };

        const frame = (time) => {
            const delta = Math.min(0.05, (time - lastTime) / 1000);
            lastTime = time;
            auto += delta;
            if (!dragging) {
                spin += spinVelocity * delta;
                spinVelocity *= FRICTION_PER_SECOND ** delta;
            }
            place();
            frameId = window.requestAnimationFrame(frame);
        };

        const canAnimate = () => !reduceMotion && desktop.matches;
        const start = () => {
            if (running || !canAnimate()) return;
            running = true;
            lastTime = window.performance.now();
            frameId = window.requestAnimationFrame(frame);
        };
        const stop = () => {
            running = false;
            if (frameId) window.cancelAnimationFrame(frameId);
            frameId = null;
        };

        const handleDown = (event) => {
            dragging = true;
            lastX = event.clientX;
            spinVelocity = 0;
            field.setPointerCapture(event.pointerId);
        };
        const handleMove = (event) => {
            if (!dragging) return;
            const dx = event.clientX - lastX;
            lastX = event.clientX;
            const delta = dx * DRAG_SENSITIVITY;
            spin += delta;
            spinVelocity = delta * 45;
        };
        const handleUp = (event) => {
            dragging = false;
            if (field.hasPointerCapture && field.hasPointerCapture(event.pointerId)) {
                field.releasePointerCapture(event.pointerId);
            }
        };
        const handleBreakpoint = () => {
            if (canAnimate()) {
                start();
            } else {
                stop();
                relayout();
            }
        };

        const relayout = () => {
            resize();
            place();
        };

        field.addEventListener('pointerdown', handleDown);
        field.addEventListener('pointermove', handleMove);
        field.addEventListener('pointerup', handleUp);
        field.addEventListener('pointercancel', handleUp);
        window.addEventListener('resize', relayout);
        desktop.addEventListener('change', handleBreakpoint);

        relayout();
        start();

        return () => {
            stop();
            field.removeEventListener('pointerdown', handleDown);
            field.removeEventListener('pointermove', handleMove);
            field.removeEventListener('pointerup', handleUp);
            field.removeEventListener('pointercancel', handleUp);
            window.removeEventListener('resize', relayout);
            desktop.removeEventListener('change', handleBreakpoint);
        };
    }, []);

    return (
        /* No z-index here on purpose: the field must not create a stacking
           context, so each label's own z-index can interleave with the portrait. */
        <div
            ref={fieldRef}
            role="group"
            aria-label={label}
            className={`hero-orbit-field absolute inset-0 ${className}`}
        >
            {HERO_ORBITS.map((orbit, ringIndex) => (
                <div
                    key={ringIndex}
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-secondary/20"
                    style={{
                        width: `${orbit.radius * 200}%`,
                        height: `${orbit.radius * 200 * orbit.tilt}%`,
                        transform: 'translate(-50%,-50%)',
                    }}
                />
            ))}

            <ul className="pointer-events-none absolute inset-0 m-0 list-none p-0">
                {LABELS.map((item) => (
                    <li
                        key={item.key}
                        ref={(el) => {
                            labelRefs.current[item.key] = el;
                        }}
                        className="absolute left-1/2 top-1/2 will-change-transform"
                    >
                        {/* The wrapper carries the JS transform, the span carries the hover
                            scale, so a CSS transition never fights the per-frame positioning. */}
                        <span className="hero-planet flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-background/90 px-1.5 text-center font-medium leading-tight text-text">
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HeroOrbit;
