/**
 * Entrada para el chequeo SSR. La consume tools/verify-contact.mjs vía esbuild.
 *
 * `site` se importa como namespace a propósito: el arnés corre ANTES de que los
 * exports nuevos existan, y un import con nombre fallaría en el bundling en vez de
 * reportar un FAIL legible. El namespace siempre resuelve.
 */
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageProvider } from '../src/context/LanguageContext';
import Contact from '../src/components/Contact';
import * as site from '../src/data/site';

export const siteExports = site;

export function renderContact(lang) {
    return renderToStaticMarkup(
        <LanguageProvider initialLanguage={lang}>
            <Contact />
        </LanguageProvider>
    );
}

/** Sin prop: el comportamiento histórico del provider tiene que seguir siendo español. */
export function renderContactDefault() {
    return renderToStaticMarkup(
        <LanguageProvider>
            <Contact />
        </LanguageProvider>
    );
}
