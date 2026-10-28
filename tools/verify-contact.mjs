#!/usr/bin/env node
/**
 * Verificación del formulario de contacto (feature `contact-form`).
 *
 * El repo no tiene runner de tests. Este es su chequeo determinístico: renderiza
 * `Contact` con SSR en los dos idiomas y ejerce la lógica de envío contra un `fetch`
 * falso. No toca la red ni necesita credenciales.
 *
 *   npm run verify:contact
 *
 * Sale con código 1 si algo falla. Las specs (S1-S12) están en
 * odd/tasks/contact-form.md.
 */
import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const cacheDir = path.join(root, 'node_modules', '.cache', 'verify-contact');

const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: Boolean(ok), detail });
const count = (html, re) => (html.match(re) || []).length;

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

const loadBundle = (out) => createRequire(import.meta.url)(out);

// --- A. Markup SSR en los dos idiomas -------------------------------------
const ssr = loadBundle(await buildBundle(path.join(here, 'ssr-entry.jsx'), 'ssr.cjs'));

const es = ssr.renderContact('es');
const en = ssr.renderContact('en');

check('S3/S4: hay exactamente un <form>', count(es, /<form\b/g) === 1, `encontrados=${count(es, /<form\b/g)}`);

for (const [field, re] of [
    ['name', /<input\b[^>]*name="name"/],
    ['email', /<input\b[^>]*name="email"/],
    ['subject', /<input\b[^>]*name="subject"/],
    ['message', /<textarea\b[^>]*name="message"/],
]) {
    check(`S4: existe el campo ${field}`, re.test(es), 'no está en el HTML');
}

check('S10: los 4 campos tienen <label>', count(es, /<label\b/g) >= 4, `labels=${count(es, /<label\b/g)}`);
check('S8: hay un botón de envío', /<button\b[^>]*type="submit"/.test(es));
check('S7: el honeypot botcheck está presente', /name="botcheck"/.test(es));

check(
    'S2: el correo se muestra como texto',
    /danieldlrt\.jobs@gmail\.com/.test(es),
    'no aparece danieldlrt.jobs@gmail.com'
);

const bigMailtoCta = /<a\b[^>]*href="mailto:[^"]*"[^>]*class="[^"]*\bpy-4\b/;
check('S1: se eliminó el CTA grande de mailto', !bigMailtoCta.test(es), 'el <a> con py-4 sigue ahí');

const labelText = (html, field) =>
    new RegExp(`<label\\b[^>]*for="([^"]*${field}[^"]*)"[^>]*>([^<]+)<`).exec(html)?.[2];
check(
    'S11: el label del nombre cambia entre es y en',
    Boolean(es !== en && labelText(es, 'name') && labelText(es, 'name') !== labelText(en, 'name')),
    `es="${labelText(es, 'name')}" en="${labelText(en, 'name')}"`
);

check(
    'Regresión: sin prop, LanguageProvider sigue en español',
    ssr.renderContactDefault() === es,
    'el idioma por defecto cambió'
);

// --- B. Configuración y lógica de envío -----------------------------------
const site = ssr.siteExports;
check(
    'S5: el endpoint de Web3Forms está declarado',
    site.CONTACT_FORM_ENDPOINT === 'https://api.web3forms.com/submit',
    `valor=${site.CONTACT_FORM_ENDPOINT}`
);
check(
    'S7: la access key está declarada y no vacía',
    typeof site.WEB3FORMS_ACCESS_KEY === 'string' && site.WEB3FORMS_ACCESS_KEY.length > 0,
    'falta WEB3FORMS_ACCESS_KEY en site.js'
);
check(
    'S2: el correo vive en site.js como fuente única',
    site.CONTACT_EMAIL === 'danieldlrt.jobs@gmail.com',
    `valor=${site.CONTACT_EMAIL}`
);

const libPath = path.join(root, 'src', 'lib', 'contactForm.js');
if (!existsSync(libPath)) {
    check('S5-S9: existe src/lib/contactForm.js', false, 'el módulo de envío no existe todavía');
} else {
    const { buildContactPayload, sendContactMessage, buildSuccessMessage } = loadBundle(await buildBundle(libPath, 'contactForm.cjs'));
    const values = { name: 'Ana', email: 'ana@ejemplo.com', subject: 'Consulta', message: 'Hola Daniel' };

    const payload = buildContactPayload(values, 'token-123');
    check('S5: el payload lleva la access key', payload.access_key === site.WEB3FORMS_ACCESS_KEY);
    check('S6: el correo del visitante viaja como reply-to', payload.email === values.email);
    check(
        'S4: los cuatro campos van en el payload',
        payload.name === 'Ana' && payload.subject === 'Consulta' && payload.message === 'Hola Daniel'
    );
    check(
        'S7: el payload lleva el honeypot y el token de captcha',
        payload.botcheck === '' && payload['h-captcha-response'] === 'token-123'
    );

    const calls = [];
    const fakeFetch = (url, init) => {
        calls.push({ url, init });
        return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({ success: true, message: 'Email sent successfully!' }),
        });
    };
    const okResult = await sendContactMessage(values, 'token-123', { fetchImpl: fakeFetch });
    check('S5: postea al endpoint por AJAX', calls[0]?.url === site.CONTACT_FORM_ENDPOINT && calls[0]?.init?.method === 'POST');
    check('S5: pide JSON para que no redirija', calls[0]?.init?.headers?.Accept === 'application/json');
    check('S8: un 200 devuelve ok', okResult.ok === true);

    const failFetch = () =>
        Promise.resolve({ ok: false, status: 400, json: async () => ({ success: false, message: 'Invalid access key' }) });
    const badResult = await sendContactMessage(values, 'token-123', { fetchImpl: failFetch });
    check('S8: un 400 devuelve el motivo del servidor', badResult.ok === false && /access key/i.test(badResult.message));

    const boomFetch = () => Promise.reject(new Error('offline'));
    const boomResult = await sendContactMessage(values, 'token-123', { fetchImpl: boomFetch });
    check('S8: una caída de red no explota, devuelve error', boomResult.ok === false && typeof boomResult.message === 'string');

    const serverErrorFetch = () =>
        Promise.resolve({ ok: false, status: 500, json: async () => ({ success: false, message: 'Server error' }) });
    const serverError = await sendContactMessage(values, 'token-123', { fetchImpl: serverErrorFetch });
    check('S8: un 500 devuelve el motivo del servidor', serverError.ok === false && /server error/i.test(serverError.message));

    const notJsonFetch = () =>
        Promise.resolve({
            ok: false,
            status: 502,
            json: async () => {
                throw new Error('not json');
            },
        });
    const notJson = await sendContactMessage(values, 'token-123', { fetchImpl: notJsonFetch });
    check('S8: un cuerpo no-JSON no explota y reporta el status', notJson.ok === false && notJson.message === 'HTTP 502');

    const successFalseFetch = () =>
        Promise.resolve({ ok: true, status: 200, json: async () => ({ success: false, message: 'Captcha invalid' }) });
    const successFalse = await sendContactMessage(values, 'token-123', { fetchImpl: successFalseFetch });
    check('S8: un 200 con success:false no se toma como enviado', successFalse.ok === false && /captcha/i.test(successFalse.message));

    check(
        'S4/S7: no viajan campos de más en el payload',
        Object.keys(buildContactPayload(values, 'tok')).sort().join(',') ===
            'access_key,botcheck,email,h-captcha-response,message,name,subject',
        `claves=${Object.keys(buildContactPayload(values, 'tok')).sort().join(',')}`
    );

    // El mensaje de éxito promete a qué dirección va a llegar la respuesta: si el token
    // no se reemplaza, promete un correo que no existe y nadie lo nota.
    check(
        'S8: el mensaje de éxito nombra la dirección del visitante',
        buildSuccessMessage('Te respondo a {email}.', 'ana@ejemplo.com') === 'Te respondo a ana@ejemplo.com.',
        `resultado=${buildSuccessMessage('Te respondo a {email}.', 'ana@ejemplo.com')}`
    );
    check(
        'S8: sin dirección el mensaje igual se renderiza',
        buildSuccessMessage('Sin token', 'ana@ejemplo.com') === 'Sin token'
    );
}

// --- Reporte --------------------------------------------------------------
const failed = results.filter((r) => !r.ok);
for (const r of results) {
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : `  → ${r.detail}`}`);
}
console.log(`\n${results.length - failed.length}/${results.length} PASS`);
if (failed.length) {
    console.log(`RED: ${failed.length} fallo(s).`);
    process.exit(1);
}
console.log('GREEN');
