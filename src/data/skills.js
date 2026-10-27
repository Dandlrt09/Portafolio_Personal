import { featuredProjects, analyticsProjects } from './projects';

/**
 * Skills: the canonical list, its groups, and the declared level (1 to 5).
 *
 * This lives outside the translation tree on purpose. A level is not language,
 * and a skill id must not change when the language does, or every relationship
 * computed from it would break. Labels carry both languages, the same way
 * `projects.js` does it.
 *
 * Level is self-assessed:
 *   5 production-ready, could defend or teach the decision
 *   4 fluent, looks up details
 *   3 uses it, but not the main tool
 *   2 touched it in a scoped project
 *   1 saw it / did it once
 */
export const SKILL_GROUPS = [
    {
        id: 'dev',
        label: { es: 'Desarrollo', en: 'Development' },
        skills: [
            { id: 'python', level: 5, label: { es: 'Python', en: 'Python' } },
            { id: 'fastapi', level: 3, label: { es: 'FastAPI', en: 'FastAPI' } },
            { id: 'react', level: 3, label: { es: 'React', en: 'React' } },
            { id: 'typescript', level: 3, label: { es: 'TypeScript', en: 'TypeScript' } },
            { id: 'tailwind-css', level: 2, label: { es: 'Tailwind CSS', en: 'Tailwind CSS' } },
            { id: 'sql', level: 5, label: { es: 'SQL', en: 'SQL' } },
            { id: 'postgres', level: 3, label: { es: 'Postgres', en: 'Postgres' } },
            { id: 'sqlite', level: 5, label: { es: 'SQLite', en: 'SQLite' } },
            { id: 'supabase', level: 3, label: { es: 'Supabase', en: 'Supabase' } },
            { id: 'git', level: 4, label: { es: 'Git', en: 'Git' } },
            { id: 'pytest', level: 2, label: { es: 'pytest', en: 'pytest' } },
            { id: 'github-actions', level: 1, label: { es: 'GitHub Actions', en: 'GitHub Actions' } },
        ],
    },
    {
        id: 'data',
        label: { es: 'Datos & ML', en: 'Data & ML' },
        skills: [
            { id: 'pandas', level: 4, label: { es: 'Pandas', en: 'Pandas' } },
            { id: 'numpy', level: 4, label: { es: 'NumPy', en: 'NumPy' } },
            { id: 'scikit-learn', level: 3, label: { es: 'Scikit-learn', en: 'Scikit-learn' } },
            { id: 'pycaret', level: 2, label: { es: 'PyCaret', en: 'PyCaret' } },
            { id: 'eda', level: 1, label: { es: 'EDA', en: 'EDA' } },
            { id: 'feature-engineering', level: 1, label: { es: 'Ingeniería de características', en: 'Feature engineering' } },
            { id: 'predictive-modeling', level: 2, label: { es: 'Modelado predictivo', en: 'Predictive modeling' } },
            { id: 'time-series', level: 1, label: { es: 'Series temporales', en: 'Time series' } },
            { id: 'jupyter', level: 4, label: { es: 'Jupyter', en: 'Jupyter' } },
        ],
    },
    {
        id: 'ai',
        label: { es: 'IA aplicada', en: 'Applied AI' },
        skills: [
            { id: 'gemini-api', level: 4, label: { es: 'Gemini API', en: 'Gemini API' } },
            { id: 'llm-integration', level: 3, label: { es: 'Integración de LLM', en: 'LLM integration' } },
            { id: 'streamlit', level: 3, label: { es: 'Streamlit', en: 'Streamlit' } },
            { id: 'agent-assisted-development', level: 3, label: { es: 'Desarrollo asistido por agentes', en: 'Agent-assisted development' } },
        ],
    },
    {
        id: 'bi',
        label: { es: 'BI & visualización', en: 'BI & visualization' },
        skills: [
            { id: 'power-bi', level: 5, label: { es: 'Power BI', en: 'Power BI' } },
            { id: 'matplotlib', level: 4, label: { es: 'Matplotlib', en: 'Matplotlib' } },
            { id: 'seaborn', level: 4, label: { es: 'Seaborn', en: 'Seaborn' } },
            { id: 'data-storytelling', level: 5, label: { es: 'Data storytelling', en: 'Data storytelling' } },
        ],
    },
    {
        id: 'design',
        label: { es: 'Diseño', en: 'Design' },
        skills: [
            { id: 'adobe-creative-suite', level: 2, label: { es: 'Adobe Creative Suite', en: 'Adobe Creative Suite' } },
            { id: 'ux-ui', level: 4, label: { es: 'UX/UI', en: 'UX/UI' } },
        ],
    },
];

const ALL_SKILLS = SKILL_GROUPS.flatMap((group) => group.skills);

/** Lookup by id, and by either language label. A stack string is written in English. */
const SKILL_BY_LABEL = new Map();
ALL_SKILLS.forEach((skill) => {
    SKILL_BY_LABEL.set(skill.id, skill.id);
    SKILL_BY_LABEL.set(skill.label.es.toLowerCase(), skill.id);
    SKILL_BY_LABEL.set(skill.label.en.toLowerCase(), skill.id);
});

/**
 * A project stack is a human label, not a skill id: these are the two that name
 * the same thing differently. Anything with no skill behind it (ReportLab,
 * OpenAI, RLS) is simply not a skill and gets dropped by the filter below.
 */
const STACK_ALIAS = {
    'React 19': 'react',
    // AdaBoost ships in scikit-learn, which is the skill behind it.
    AdaBoost: 'scikit-learn',
    Gemini: 'gemini-api',
};

/**
 * Skills a project demonstrably uses but whose stack label never spells out.
 * Only ever added when the project's own description, tool field or linked
 * artifact states it — never guessed from what the stack "usually" includes.
 *
 * Archived practice work is deliberately not a rail hub: the Projects section
 * already frames it as secondary, and promoting it here would put a coursework
 * notebook on the same footing as Datara. The cost is that Seaborn, whose only
 * home is the video-games notebook, shows up with no project behind it.
 */
const EXTRA_PROJECT_SKILLS = {
    // Uses Postgres; the card lists the engine, not the language.
    anvbar: ['sql'],
    // Composes the content across Gemini and OpenAI behind one provider interface.
    aipdf: ['llm-integration'],
    // The description names EDA, feature engineering and class balancing directly.
    churn: ['eda', 'feature-engineering', 'predictive-modeling'],
    // The linked artifact is a Jupyter notebook.
    olist: ['jupyter'],
    // Superstore's description names data storytelling outright.
    superstore: ['data-storytelling'],
    // Its executive summary is written to be read in 30 seconds.
    hr: ['data-storytelling'],
};

/** Short rail labels: a project title is far too long for a pill. */
const SHORT_LABEL = {
    datara: { es: 'Datara', en: 'Datara' },
    anvbar: { es: 'ANV·BAR', en: 'ANV·BAR' },
    aipdf: { es: 'AI PDF', en: 'AI PDF' },
    churn: { es: 'Churn', en: 'Churn' },
    olist: { es: 'Olist', en: 'Olist' },
    superstore: { es: 'Superstore', en: 'Superstore' },
    hr: { es: 'RRHH', en: 'HR' },
    games: { es: 'Videojuegos', en: 'Video games' },
};

/** Analytics cards store the stack under `tech`, dashboards only under `tool`. */
const rawStackOf = (project) => project.stack ?? project.tech ?? (project.tool ? [project.tool] : []);

const skillIdsOf = (project) => [
    ...new Set([
        ...rawStackOf(project)
            .map((raw) => STACK_ALIAS[raw] ?? SKILL_BY_LABEL.get(String(raw).toLowerCase()) ?? null)
            .filter(Boolean),
        ...(EXTRA_PROJECT_SKILLS[project.id] ?? []),
    ]),
];

/**
 * The portfolio is a project too, and it is the only thing that backs Git,
 * GitHub Actions and UX/UI. Its stack is declared here because it has no card
 * in `projects.js`.
 */
const PORTFOLIO_PROJECT = {
    id: 'portfolio',
    title: { es: 'Este portafolio', en: 'This portfolio' },
    skills: ['react', 'typescript', 'tailwind-css', 'git', 'github-actions', 'ux-ui'],
};

/** Every project as a rail hub: id, translated title, short label and its skill ids. */
export const SKILL_PROJECTS = [
    ...featuredProjects.map((project) => ({
        id: project.id,
        title: project.title,
        short: SHORT_LABEL[project.id] ?? project.title,
        skills: skillIdsOf(project),
    })),
    ...analyticsProjects.map((project) => ({
        id: project.id,
        title: project.title,
        short: SHORT_LABEL[project.id] ?? project.title,
        skills: skillIdsOf(project),
    })),
    {
        ...PORTFOLIO_PROJECT,
        short: { es: 'Portafolio', en: 'Portfolio' },
    },
];

/** Ids that no project backs yet. The UI marks them instead of hiding them. */
export const SKILL_IDS_WITHOUT_PROJECT = ALL_SKILLS
    .map((skill) => skill.id)
    .filter((id) => !SKILL_PROJECTS.some((project) => project.skills.includes(id)));
