import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Check, Github, Linkedin, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTACT_EMAIL, CONTACT_LOCATION, CV_URL, GITHUB_URL, LINKEDIN_URL } from '../data/site';
import ContactForm from './ContactForm';
import { useReveal } from '../lib/motion';

/**
 * Botón de copiar con confirmación real.
 *
 * El estado "Copiado" se pinta recién cuando `writeText` resuelve. Si el navegador la
 * rechaza — contexto no seguro, permiso denegado — el botón no miente: se queda en
 * "Copiar" y el correo sigue ahí, seleccionable a mano.
 */
const CopyEmailButton = ({ email, label, copiedLabel }) => {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            timer.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            /* Sin confirmación del navegador no se anuncia éxito. */
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium tracking-wide text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
        >
            {copied ? copiedLabel : label}
            <span role="status" className="sr-only">
                {copied ? copiedLabel : ''}
            </span>
        </button>
    );
};

const Contact = () => {
    const { t } = useLanguage();

    const revealTitle = useReveal({ delay: 0 });
    const revealLead = useReveal({ delay: 0.1 });
    const revealInfo = useReveal({ delay: 0.2 });
    const revealForm = useReveal({ delay: 0.3 });

    const channels = [
        { href: GITHUB_URL, Icon: Github, name: 'GitHub', note: t.contact.channelGithubNote },
        { href: LINKEDIN_URL, Icon: Linkedin, name: 'LinkedIn', note: t.contact.channelLinkedinNote },
        { href: CV_URL, Icon: FileText, name: 'CV', note: t.contact.channelCvNote },
    ];

    return (
        <section id="contact" className="py-20 bg-gradient-to-t from-surface/50 to-background">
            <div className="max-w-5xl mx-auto px-6">
                <motion.h2 {...revealTitle} className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    <span className="border-b-4 border-primary pb-2">{t.contact.title}</span>
                </motion.h2>

                <motion.p
                    {...revealLead}
                    className="text-text-muted text-lg mb-12 max-w-xl mx-auto leading-relaxed text-center"
                >
                    {t.contact.description}
                </motion.p>

                {/* Info a la izquierda, formulario a la derecha. En mobile se apila:
                    el correo primero, porque es la vía que siempre funciona.

                    Sin `items-start`: el panel tiene que estirarse hasta la altura del
                    formulario y repartir su contenido con `justify-between`. Antes eran
                    tres líneas sueltas contra ~530px de formulario, y el hueco de abajo
                    era lo que hacía que la columna se leyera vacía. */}
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
                    <motion.aside
                        {...revealInfo}
                        className="flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-surface p-6 lg:p-7"
                    >
                        <span className="inline-flex items-center gap-2 self-start rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1 text-xs font-medium tracking-wide text-secondary">
                            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary" />
                            {t.contact.availability}
                        </span>

                        <div>
                            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
                                {t.contact.helpTitle}
                            </p>
                            <ul className="flex list-none flex-col gap-2.5 p-0">
                                {t.contact.help.map((item) => (
                                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                                        <Check size={14} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
                                {t.contact.directTitle}
                            </p>
                            <div className="flex flex-wrap items-center gap-2.5">
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="inline-flex items-center gap-2 text-base font-semibold text-text transition-colors hover:text-primary md:text-lg"
                                >
                                    <Mail size={18} aria-hidden="true" className="shrink-0 text-primary" />
                                    <span className="break-all">{CONTACT_EMAIL}</span>
                                </a>
                                <CopyEmailButton
                                    email={CONTACT_EMAIL}
                                    label={t.contact.copy}
                                    copiedLabel={t.contact.copied}
                                />
                            </div>
                            <p className="mt-2.5 text-xs text-text-muted">
                                {t.contact.responseTime} · {CONTACT_LOCATION}
                            </p>
                        </div>

                        {/* Los canales con nombre y no solo el ícono: un círculo sin etiqueta
                            obliga a adivinar cuál es cuál, y la guía de UX pide conservar el
                            texto cuando el ícono por sí solo es ambiguo. */}
                        <nav
                            aria-label={t.contact.channelsLabel}
                            className="flex flex-col border-t border-white/10 pt-4"
                        >
                            {channels.map(({ href, Icon, name, note }) => (
                                <a
                                    key={name}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2.5 py-2 text-sm text-text-muted transition-colors hover:text-primary"
                                >
                                    <Icon size={16} aria-hidden="true" className="shrink-0" />
                                    <span>
                                        <b className="font-medium text-text transition-colors group-hover:text-primary">
                                            {name}
                                        </b>
                                        {' — '}
                                        {note}
                                    </span>
                                </a>
                            ))}
                        </nav>
                    </motion.aside>

                    <motion.div {...revealForm}>
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
