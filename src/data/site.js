/**
 * Single source of truth for outbound links used in more than one component.
 * Keeping them here avoids the same URL drifting across Hero, Header and Contact.
 */
export const CV_URL =
    'https://drive.google.com/file/d/18K0VyqUcnGKAGnFtOs223WszclZnH9YB/view?usp=sharing';

export const GITHUB_URL = 'https://github.com/Dandlrt09';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/danieldlrt09';

/**
 * Hero orbit rings. Language-neutral product names, so they live here instead of
 * being duplicated in both translation trees.
 *
 * Each ring is a circle in 3D projected onto the panel:
 *   radius     orbit radius as a fraction of the panel width
 *   tilt       vertical squash of the projected ellipse (smaller = flatter)
 *   speed      auto-rotation in rad/s; negative counter-rotates
 *   dragFactor how much a drag spins this ring (slightly apart reads as depth)
 *   phase      starting angle offset, used to interleave the rings
 *
 * Geometric constraint, do not break it by eye: a label never overlaps the
 * portrait, so each ring needs radius * tilt > portrait radius + half a label.
 * The portrait is 280px in a 640px panel (radius 140 of 320), which is what
 * forces these tilts to stay fairly round. Making the portrait bigger shrinks
 * the rings until labels land on the face again.
 *
 * The six per ring are the most representative of each group in the Skills
 * section: Desarrollo, Datos & ML, IA aplicada, BI and Diseño.
 */
export const HERO_ORBITS = [
    {
        radius: 0.315,
        tilt: 0.74,
        speed: 0.055,
        dragFactor: 1.15,
        phase: 0,
        labels: ['Python', 'FastAPI', 'React', 'SQL', 'Pandas', 'Scikit-learn'],
    },
    {
        radius: 0.43,
        tilt: 0.78,
        speed: -0.038,
        dragFactor: 0.85,
        phase: Math.PI / 6,
        labels: ['TypeScript', 'Postgres', 'Gemini API', 'Streamlit', 'Power BI', 'UX/UI'],
    },
];

/** Flat chip list for the static fallback (narrow viewports and reduced motion). */
export const HERO_STACK = HERO_ORBITS.flatMap((orbit) => orbit.labels);
