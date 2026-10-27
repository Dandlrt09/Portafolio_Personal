import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SKILL_GROUPS, SKILL_PROJECTS } from '../data/skills';

/** Tailwind's `lg` breakpoint. Below it the rail and the connection layer are dropped. */
const DESKTOP_QUERY = '(min-width: 1024px)';
const isDesktop = () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches;

const LEVEL_STEPS = [1, 2, 3, 4, 5];

/**
 * The level is carried by shape — five segments — and never by a new colour:
 * `secondary` is the information accent and `primary` stays reserved for action.
 */
const LevelBar = ({ level }) => (
    <span className="flex flex-none gap-[3px]" aria-hidden="true">
        {LEVEL_STEPS.map((step) => (
            <i
                key={step}
                className={`block h-[5px] w-2 rounded-[1px] ${step <= level ? 'bg-secondary' : 'bg-white/10'}`}
            />
        ))}
    </span>
);

/** A chip used by the caption line to name a project or a technology. */
const CaptionChip = ({ children }) => (
    <span className="ml-2 inline-block rounded border border-secondary/25 bg-secondary/5 px-2 py-px text-xs font-medium text-secondary">
        {children}
    </span>
);

const Skills = () => {
    const { t, language } = useLanguage();

    /** Focus is a single key, `skill:<id>` or `project:<id>`, so it never re-fires on the same entry. */
    const [focus, setFocus] = useState(null);
    const [pinned, setPinned] = useState(null);
    const [onlyHigh, setOnlyHigh] = useState(false);
    const [paths, setPaths] = useState([]);

    const mapRef = useRef(null);
    const rowRefs = useRef(new Map());
    const hubRefs = useRef(new Map());

    const focusedSkill = focus?.startsWith('skill:') ? focus.slice('skill:'.length) : null;
    const focusedProject = focus?.startsWith('project:') ? focus.slice('project:'.length) : null;

    /** Within a group the strongest comes first: level desc, then the locale's own order. */
    const groups = useMemo(
        () =>
            SKILL_GROUPS.map((group) => ({
                id: group.id,
                label: group.label[language],
                skills: [...group.skills]
                    .sort(
                        (a, b) =>
                            b.level - a.level ||
                            a.label[language].localeCompare(b.label[language], language),
                    )
                    .map((skill) => ({ ...skill, name: skill.label[language] })),
            })),
        [language],
    );

    const skillById = useMemo(
        () => new Map(SKILL_GROUPS.flatMap((group) => group.skills).map((skill) => [skill.id, skill])),
        [],
    );
    const projectById = useMemo(() => new Map(SKILL_PROJECTS.map((project) => [project.id, project])), []);

    /** skill id -> the ids of the projects that used it. The whole relation lives here. */
    const projectsBySkill = useMemo(() => {
        const index = new Map(SKILL_GROUPS.flatMap((group) => group.skills.map((skill) => [skill.id, []])));
        SKILL_PROJECTS.forEach((project) => {
            project.skills.forEach((id) => index.get(id)?.push(project.id));
        });
        return index;
    }, []);

    /**
     * What stays lit. Focusing a skill lights only that skill and its projects;
     * focusing a project lights its whole stack. Everything else dims.
     */
    const active = useMemo(() => {
        if (focusedSkill) {
            return {
                skills: new Set([focusedSkill]),
                projects: new Set(projectsBySkill.get(focusedSkill) ?? []),
            };
        }
        if (focusedProject) {
            return {
                skills: new Set(projectById.get(focusedProject)?.skills ?? []),
                projects: new Set([focusedProject]),
            };
        }
        return null;
    }, [focusedSkill, focusedProject, projectsBySkill, projectById]);

    /**
     * Connections exist only under focus. Measurements are pure reads of the live
     * DOM: one cubic curve from the focused row up to each project pill.
     */
    const measurePaths = useCallback(
        (skillId) => {
            const map = mapRef.current;
            const row = rowRefs.current.get(skillId);
            if (!map || !row || !isDesktop()) return [];

            const base = map.getBoundingClientRect();
            const box = row.getBoundingClientRect();
            const x1 = box.left - base.left;
            const y1 = box.top - base.top + box.height / 2;

            return (projectsBySkill.get(skillId) ?? []).flatMap((projectId) => {
                const hub = hubRefs.current.get(projectId);
                if (!hub) return [];
                const hubBox = hub.getBoundingClientRect();
                const x2 = hubBox.left - base.left + hubBox.width / 2;
                const y2 = hubBox.top - base.top + hubBox.height;
                const bend = Math.max(24, (y1 - y2) * 0.5);
                return [
                    {
                        projectId,
                        x2,
                        y2,
                        d: `M${x2},${y2} C${x2},${y2 + bend} ${x1},${y1 - bend} ${x1},${y1}`,
                    },
                ];
            });
        },
        [projectsBySkill],
    );

    /**
     * Measuring has to happen after the commit that changed the caption, because
     * the caption can wrap and shift the grid. A frame is scheduled instead of
     * measuring in the handler, and no state is written from inside an effect.
     */
    const frameRef = useRef(null);
    const scheduleDraw = useCallback(
        (skillId) => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            frameRef.current = requestAnimationFrame(() => {
                frameRef.current = null;
                setPaths(skillId ? measurePaths(skillId) : []);
            });
        },
        [measurePaths],
    );

    useEffect(() => () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
    }, []);

    useEffect(() => {
        const handleResize = () => scheduleDraw(focusedSkill);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [focusedSkill, scheduleDraw]);

    const skillIdOfKey = (key) => (key.startsWith('skill:') ? key.slice('skill:'.length) : null);

    const enter = useCallback(
        (key) => {
            if (pinned && pinned !== key) return;
            if (focus === key) return;
            setFocus(key);
            scheduleDraw(skillIdOfKey(key));
        },
        [pinned, focus, scheduleDraw],
    );

    const leave = useCallback(
        (key) => {
            if (pinned || focus !== key) return;
            setFocus(null);
            scheduleDraw(null);
        },
        [pinned, focus, scheduleDraw],
    );

    const togglePin = useCallback(
        (key) => {
            if (pinned === key) {
                setPinned(null);
                setFocus(null);
                scheduleDraw(null);
                return;
            }
            setPinned(key);
            setFocus(key);
            scheduleDraw(skillIdOfKey(key));
        },
        [pinned, scheduleDraw],
    );

    const setRowRef = (id) => (el) => {
        if (el) rowRefs.current.set(id, el);
        else rowRefs.current.delete(id);
    };
    const setHubRef = (id) => (el) => {
        if (el) hubRefs.current.set(id, el);
        else hubRefs.current.delete(id);
    };

    /* ------------------------------ caption ------------------------------ */
    let caption = <span>{t.skills.idle}</span>;

    if (focusedSkill) {
        const skill = skillById.get(focusedSkill);
        const projectIds = projectsBySkill.get(focusedSkill) ?? [];
        caption = (
            <>
                <span className="font-semibold text-text">{skill.label[language]}</span>
                <span>
                    {' · '}
                    {t.skills.levelLabel(skill.level)}
                    {' · '}
                    {projectIds.length ? t.skills.inProjects(projectIds.length) : t.skills.noProject}
                </span>
                {projectIds.map((id) => (
                    <CaptionChip key={id}>{projectById.get(id)?.title[language] ?? id}</CaptionChip>
                ))}
            </>
        );
    } else if (focusedProject) {
        const project = projectById.get(focusedProject);
        caption = (
            <>
                <span className="font-semibold text-text">{project.title[language]}</span>
                <span>
                    {' · '}
                    {t.skills.projectStack(project.skills.length)}
                </span>
                {project.skills.map((id) => (
                    <CaptionChip key={id}>{skillById.get(id)?.label[language] ?? id}</CaptionChip>
                ))}
            </>
        );
    }

    return (
        <section id="skills" className="py-20 bg-background text-text">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            <span className="border-b-4 border-primary pb-2">{t.skills.title}</span>
                        </h2>
                        <p className="mt-6 max-w-2xl text-lg text-text-muted leading-relaxed">
                            {t.skills.lead}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 pb-1">
                        <span className="text-sm font-medium text-text-muted">{t.skills.minLevel}</span>
                        <button
                            type="button"
                            onClick={() => setOnlyHigh((value) => !value)}
                            aria-pressed={onlyHigh}
                            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                                onlyHigh
                                    ? 'border-secondary/35 bg-secondary/10 text-secondary'
                                    : 'border-white/10 bg-white/5 text-text-muted hover:text-text'
                            }`}
                        >
                            {t.skills.onlyHigh}
                        </button>
                    </div>
                </div>

                <div ref={mapRef} className="relative mt-12">
                    {/* Project rail: aligned, never floating, so nothing can overlap. */}
                    <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wider text-text-muted lg:block">
                        {t.skills.railLabel}
                    </p>
                    <div className="hidden flex-wrap gap-3 lg:flex">
                        {SKILL_PROJECTS.map((project) => {
                            const key = `project:${project.id}`;
                            const dimmed = active && !active.projects.has(project.id);
                            return (
                                <button
                                    key={project.id}
                                    ref={setHubRef(project.id)}
                                    type="button"
                                    onPointerEnter={() => enter(key)}
                                    onFocus={() => enter(key)}
                                    onPointerLeave={() => leave(key)}
                                    onBlur={() => leave(key)}
                                    onClick={() => togglePin(key)}
                                    aria-pressed={pinned === key}
                                    aria-label={t.skills.ariaProject(project.title[language], project.skills.length)}
                                    className={`flex w-[134px] items-center justify-center gap-1.5 rounded-full border py-2 text-sm font-semibold transition-colors ${
                                        focus === key
                                            ? 'border-primary bg-primary/20 text-text'
                                            : 'border-white/10 bg-surface text-text hover:border-primary/60 hover:bg-primary/10'
                                    } ${dimmed ? 'opacity-20' : ''}`}
                                >
                                    <span className="truncate">{project.short[language]}</span>
                                    <small className="flex-none text-xs font-medium text-text-muted">
                                        {project.skills.length}
                                    </small>
                                </button>
                            );
                        })}
                    </div>

                    <p
                        className="mt-5 mb-6 hidden min-h-[24px] border-t border-white/10 pt-4 text-sm text-text-muted lg:block"
                        role="status"
                        aria-live="polite"
                    >
                        {caption}
                    </p>

                    {/* Under `lg` this is a plain ordered list, which is the whole fallback. */}
                    <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                        {groups.map((group, groupIndex) => (
                            <motion.div
                                key={group.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: groupIndex * 0.06 }}
                            >
                                <div className="mb-3 flex items-baseline gap-2">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                                        {group.label}
                                    </h3>
                                    <span className="text-xs text-text-muted/65">{group.skills.length}</span>
                                    <span className="h-px flex-1 bg-white/10" />
                                </div>

                                {group.skills.map((skill) => {
                                    const key = `skill:${skill.id}`;
                                    const projectIds = projectsBySkill.get(skill.id) ?? [];
                                    const dimmed =
                                        (onlyHigh && skill.level < 4) ||
                                        (active && !active.skills.has(skill.id));
                                    const lit = focus === key || active?.skills.has(skill.id);

                                    return (
                                        <button
                                            key={skill.id}
                                            ref={setRowRef(skill.id)}
                                            type="button"
                                            onPointerEnter={() => enter(key)}
                                            onFocus={() => enter(key)}
                                            onPointerLeave={() => leave(key)}
                                            onBlur={() => leave(key)}
                                            onClick={() => togglePin(key)}
                                            aria-pressed={pinned === key}
                                            aria-label={t.skills.ariaLevel(skill.name, skill.level)}
                                            className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
                                                focus === key ? 'bg-primary/15' : 'hover:bg-white/5'
                                            } ${dimmed ? 'opacity-20' : ''}`}
                                        >
                                            <span
                                                className={`min-w-0 flex-1 truncate text-sm font-medium transition-colors ${
                                                    lit ? 'text-text' : 'text-text-muted'
                                                }`}
                                            >
                                                {skill.name}
                                                {projectIds.length === 0 && (
                                                    <span className="ml-2 text-text-muted/50">◦</span>
                                                )}
                                            </span>
                                            <LevelBar level={skill.level} />
                                            <span
                                                className="w-3 flex-none text-right text-xs font-medium text-text-muted/60"
                                                aria-hidden="true"
                                            >
                                                {skill.level}
                                            </span>
                                        </button>
                                    );
                                })}
                            </motion.div>
                        ))}
                    </div>

                    {/* Connection layer: empty at rest, drawn only for the focused skill. */}
                    <svg
                        className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
                        aria-hidden="true"
                    >
                        {paths.map((path) => (
                            <g key={path.projectId}>
                                <path d={path.d} fill="none" strokeWidth="1.4" className="stroke-secondary opacity-45" />
                                <circle cx={path.x2} cy={path.y2} r="3" className="fill-secondary opacity-60" />
                            </g>
                        ))}
                    </svg>
                </div>

                <p className="mt-8 border-t border-white/10 pt-4 text-xs leading-relaxed text-text-muted">
                    {t.skills.legend}
                </p>
            </div>
        </section>
    );
};

export default Skills;
