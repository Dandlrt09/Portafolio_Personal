import React from 'react';
import { cn } from '../lib/utils';

/**
 * Stack chips with a monogram tile.
 *
 * Why monograms and not real brand logos: `design/system.md` allows no colour outside the
 * palette (the only exception is `amber-400`, bound to complexity). A row of Python blue,
 * React cyan and Supabase green would break the system, and `lucide-react` — the icon set
 * already in the project — ships no brand marks. The tile carries recognition by shape and
 * the name stays as real text, so nothing depends on colour alone.
 *
 * If real logos are ever wanted, the swap is local to this file: `react-icons/si` is
 * tree-shakeable and fits the existing Vite build.
 */

/** Two-letter monograms, chosen by hand so no two technologies in one ficha collide
 *  (`Python` and `pytest` would both fall back to `PY`). */
const MONOGRAMS = {
    Python: 'Py',
    FastAPI: 'Fa',
    React: 'Re',
    'React 19': 'Re',
    TypeScript: 'Ts',
    SQLite: 'Sq',
    Gemini: 'Gm',
    'Gemini API': 'Gm',
    'Tailwind CSS': 'Tw',
    Supabase: 'Sb',
    Postgres: 'Pg',
    RLS: 'RL',
    Streamlit: 'St',
    ReportLab: 'Rl',
    OpenAI: 'Ai',
    pytest: 'Pt',
    PyCaret: 'Pc',
    Pandas: 'Pd',
    AdaBoost: 'Ab',
    Matplotlib: 'Mp',
    NumPy: 'Np',
    'Power BI': 'Pb',
};

const monogram = (name) => {
    if (MONOGRAMS[name]) return MONOGRAMS[name];
    const letters = name.replace(/[^A-Za-z]/g, '').slice(0, 2);
    return letters.charAt(0).toUpperCase() + letters.slice(1).toLowerCase();
};

const StackChips = ({ items, className = '' }) => {
    if (!items || items.length === 0) return null;

    return (
        <ul className={cn('flex flex-wrap gap-2', className)}>
            {items.map((item) => (
                <li
                    key={item}
                    className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 py-1 pl-1 pr-2.5 transition-colors hover:border-primary/40"
                >
                    <span
                        aria-hidden="true"
                        className="grid h-[22px] w-[22px] flex-none place-items-center rounded bg-white/[0.06] font-mono text-[10px] font-semibold text-text-muted transition-colors group-hover:bg-primary/20 group-hover:text-primary"
                    >
                        {monogram(item)}
                    </span>
                    <span className="text-xs font-medium text-text-muted transition-colors group-hover:text-text">
                        {item}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default StackChips;
