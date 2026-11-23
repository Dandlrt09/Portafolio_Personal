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
import FeaturedProjectCard from '../src/components/FeaturedProjectCard';
import ProjectCard from '../src/components/ProjectCard';
import BiProjectCard from '../src/components/BiProjectCard';
import ArchiveSection from '../src/components/ArchiveSection';
import { ComplexityRating } from '../src/components/ProjectBlocks';
import { featuredProjects, analyticsProjects, archivedProjects } from '../src/data/projects';
import * as site from '../src/data/site';

export const siteExports = site;

/** Los datos crudos, para que el arnés pueda calcular lo esperado en vez de fijar números. */
export const projectExports = { featuredProjects, analyticsProjects, archivedProjects };

const withLanguage = (lang, node) =>
    renderToStaticMarkup(<LanguageProvider initialLanguage={lang}>{node}</LanguageProvider>);

/** Las tres fichas destacadas, separadas por un marcador para poder contarlas. */
export const renderFeaturedProjects = (lang) =>
    featuredProjects.map((project) => withLanguage(lang, <FeaturedProjectCard project={project} />)).join('\n<!--FICHA-->\n');

/**
 * Las tarjetas de analítica. No las toca la feature de métricas, pero comparten
 * `ComplexityRating` con las destacadas: se renderizan justamente para pinchar que el
 * componente compartido no cambió para ellas.
 */
export const renderAnalyticsCards = (lang) =>
    analyticsProjects
        .map((project, index) =>
            project.kind === 'bi'
                ? withLanguage(lang, <BiProjectCard project={project} index={index} />)
                : withLanguage(lang, <ProjectCard project={project} index={index} />)
        )
        .join('\n<!--FICHA-->\n');

export const renderArchive = (lang) => withLanguage(lang, <ArchiveSection />);

/**
 * El componente compartido, aislado. `ComplexityRating` lo consumen las destacadas, las
 * siete tarjetas de analítica y el archivo: un solo formato, estrellas.
 */
export const renderComplexityRating = (lang) =>
    withLanguage(
        lang,
        <ComplexityRating complexity={{ level: 3, reason: { es: 'razón de prueba', en: 'test reason' } }} />
    );

export function renderContact(lang) {
    return withLanguage(lang, <Contact />);
}

/** Sin prop: el comportamiento histórico del provider tiene que seguir siendo español. */
export function renderContactDefault() {
    return renderToStaticMarkup(
        <LanguageProvider>
            <Contact />
        </LanguageProvider>
    );
}
