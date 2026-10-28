import React from 'react';
import { Github, Linkedin, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CV_URL, GITHUB_URL, LINKEDIN_URL } from '../data/site';

/**
 * Los links de identidad, en un solo lugar.
 *
 * El hero y Contacto los quieren los dos, y las URLs ya viven en `site.js` justamente para esto:
 * duplicar el markup dejaría que las dos copias se desincronicen, y una URL de perfil equivocada
 * es de esos errores que nadie mira.
 *
 * `withCv` va en false en el hero a propósito: ahí el CV ya es un botón propio en la fila de CTA,
 * y el mismo destino dos veces en el mismo bloque se lee como error, no como énfasis.
 *
 * La forma (círculo, borde translúcido, hover) es la regla "Social icon" de `design/system.md`.
 */
const SocialLinks = ({ withCv = false, size = 22, className = '' }) => {
    const { t } = useLanguage();

    const links = [
        { href: GITHUB_URL, label: 'GitHub', Icon: Github, hover: 'hover:text-primary' },
        { href: LINKEDIN_URL, label: 'LinkedIn', Icon: Linkedin, hover: 'hover:text-primary' },
        ...(withCv
            ? [{ href: CV_URL, label: t.contact.cv, Icon: FileText, hover: 'hover:text-secondary' }]
            : []),
    ];

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {links.map(({ href, label, Icon, hover }) => (
                <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`rounded-full border border-white/5 p-3 text-text-muted transition-all hover:bg-white/5 ${hover}`}
                >
                    <Icon size={size} aria-hidden="true" />
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;
