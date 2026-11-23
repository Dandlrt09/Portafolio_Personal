#!/usr/bin/env node
/**
 * Verificación de las fichas de Proyectos (feature `proyectos-visual`, dirección B).
 *
 * El repo no tiene runner de tests. Este es su chequeo determinístico para esta feature:
 * renderiza las tarjetas con SSR en los dos idiomas y comprueba la estructura observable.
 *
 *   npm run verify:projects
 *
 * Sale con código 1 si algo falla. El diseño elegido está en
 * design/projects-visual/02-metricas-primero.html.
 */
import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const cacheDir = path.join(root, 'node_modules', '.cache', 'verify-projects');

const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: Boolean(ok), detail });
const count = (html, re) => (html.match(re) || []).length;
const has = (html, needle) => html.includes(needle);

async function buildBundle(entry, outfile) {
    mkdirSync(cacheDir, { recursive: true });
    const out = path.join(cacheDir, outfile);
    await build({
        entryPoints: [entry],
        outfile: out,
        bundle: true,
        platform: 'node',
        format: 'cjs',
        target: 'node20',
        jsx: 'automatic',
        logLevel: 'silent',
        loader: { '.png': 'dataurl', '.webp': 'dataurl', '.jpg': 'dataurl', '.svg': 'dataurl' },
        define: { 'import.meta.env': '{}' },
    });
    return out;
}

const ssr = createRequire(import.meta.url)(await buildBundle(path.join(here, 'ssr-entry.jsx'), 'ssr.cjs'));
const { projectExports } = ssr;

const featuredEs = ssr.renderFeaturedProjects('es');
const featuredEn = ssr.renderFeaturedProjects('en');
const analyticsEs = ssr.renderAnalyticsCards('es');
const archiveEs = ssr.renderArchive('es');

// --- A. La franja de métricas reemplaza al párrafo de complejidad ----------
check(
    'B1: cada ficha destacada trae 3 cifras (3 fichas = 9)',
    count(featuredEs, /<dt\b/g) === 9,
    `encontradas=${count(featuredEs, /<dt\b/g)}`
);
check(
    'B1: cada cifra trae su línea de apoyo',
    count(featuredEs, /<dd\b/g) === 9,
    `encontradas=${count(featuredEs, /<dd\b/g)}`
);
check('B1: hay 3 fichas destacadas', count(featuredEs, /<!--FICHA-->/g) === 2, `separadores=${count(featuredEs, /<!--FICHA-->/g)}`);

// --- B. El orden sigue poniendo a la persona primero ----------------------
const roleAt = featuredEs.indexOf('Lo construyo yo, de punta a punta');
const decisionAt = featuredEs.indexOf('El reto no fue la IA');
const problemAt = featuredEs.indexOf('Para analizar datos con IA');
check(
    'B2: orden rol → lo que hice → el problema',
    roleAt > -1 && decisionAt > -1 && problemAt > -1 && roleAt < decisionAt && decisionAt < problemAt,
    `rol=${roleAt} decision=${decisionAt} problema=${problemAt}`
);

// --- C. La complejidad, en un solo formato --------------------------------
// Se cuentan las estrellas llenas desde los datos para que agregar una ficha o cambiar un
// nivel no obligue a tocar este número.
const expectedStars = projectExports.featuredProjects.reduce((total, project) => total + project.complexity.level, 0);
check(
    'B3: las destacadas muestran una estrella por nivel, sin medidor',
    count(featuredEs, /fill-amber-400/g) === expectedStars && count(featuredEs, /bg-amber-400/g) === 0,
    `estrellas=${count(featuredEs, /fill-amber-400/g)} esperadas=${expectedStars} segmentos=${count(featuredEs, /bg-amber-400/g)}`
);
check(
    'B3: el medidor sigue anclado con su justificación',
    has(featuredEs, 'Sandbox de ejecución aislado escrito a medida') && has(featuredEs, 'Catálogo en vivo detrás de un gate'),
    'falta la razón de complejidad'
);

// --- D. Regresión del componente compartido -------------------------------
// `ComplexityRating` lo usan también las 7 tarjetas de analítica y el archivo. El
// `variant` nuevo no puede cambiarles nada: siguen con estrellas, nunca con el medidor.
const complexityDefault = ssr.renderComplexityRating('es');

check(
    'B4: analítica sigue con estrellas',
    count(analyticsEs, /fill-amber-400/g) > 0 && count(analyticsEs, /bg-amber-400/g) === 0,
    `estrellas=${count(analyticsEs, /fill-amber-400/g)} segmentos=${count(analyticsEs, /bg-amber-400/g)}`
);
check(
    'B4: el componente compartido tiene un solo formato, estrellas',
    count(complexityDefault, /fill-amber-400/g) === 3 && count(complexityDefault, /bg-amber-400/g) === 0,
    `estrellas=${count(complexityDefault, /fill-amber-400/g)} segmentos=${count(complexityDefault, /bg-amber-400/g)}`
);
// El archivo es un desplegable cerrado por defecto: su complejidad no entra en el markup
// hasta que se abre, así que acá solo se pincha que arranca cerrado. La garantía real de
// que no cambió la da el diferencial byte a byte contra el commit base.
check(
    'B4: el archivo arranca cerrado y no filtra complejidad',
    count(archiveEs, /fill-amber-400/g) === 0 && count(archiveEs, /bg-amber-400/g) === 0,
    `estrellas=${count(archiveEs, /fill-amber-400/g)} segmentos=${count(archiveEs, /bg-amber-400/g)}`
);

// --- E. Stack con monograma ----------------------------------------------
check(
    'B5: cada tecnología conserva su nombre como texto',
    has(featuredEs, '>Python<') && has(featuredEs, '>TypeScript<') && has(featuredEs, '>Supabase<'),
    'falta el nombre de alguna tecnología'
);
check(
    'B5: el monograma no colisiona dentro de una ficha',
    has(featuredEs, '>Py<') && has(featuredEs, '>Pt<'),
    'Python y pytest deberían distinguirse (Py / Pt)'
);

// --- F. Bilingüe ----------------------------------------------------------
check('B6: es y en rinden distinto', featuredEs !== featuredEn, 'los dos idiomas rinden igual');
check(
    'B6: las cifras se traducen',
    has(featuredEs, 'capas') && has(featuredEn, 'layers') && has(featuredEs, 'semanas') && has(featuredEn, 'weeks'),
    'alguna unidad no se tradujo'
);

// --- Salida ---------------------------------------------------------------
let failed = 0;
for (const { name, ok, detail } of results) {
    if (!ok) failed += 1;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : `  → ${detail}`}`);
}
console.log(`\n${results.length - failed}/${results.length} en verde${failed ? ` · ${failed} en rojo` : ''}`);
process.exit(failed ? 1 : 0);
