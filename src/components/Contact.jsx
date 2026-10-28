import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTACT_EMAIL } from '../data/site';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';

const fadeIn = (delay) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay },
});

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" className="py-20 bg-gradient-to-t from-surface/50 to-background">
            <div className="max-w-5xl mx-auto px-6">
                <motion.h2 {...fadeIn(0)} className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    <span className="border-b-4 border-primary pb-2">{t.contact.title}</span>
                </motion.h2>

                <motion.p
                    {...fadeIn(0.1)}
                    className="text-text-muted text-lg mb-12 max-w-xl mx-auto leading-relaxed text-center"
                >
                    {t.contact.description}
                </motion.p>

                {/* Info a la izquierda, formulario a la derecha. En mobile se apila:
                    el correo primero, porque es la vía que siempre funciona. */}
                <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
                    <motion.div {...fadeIn(0.2)} className="flex flex-col gap-6 text-center lg:pt-2 lg:text-left">
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                                {t.contact.directTitle}
                            </p>
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="inline-flex items-center gap-2 text-lg font-medium text-text transition-colors hover:text-primary md:text-xl"
                            >
                                <Mail size={20} className="shrink-0 text-primary" />
                                <span className="break-all">{CONTACT_EMAIL}</span>
                            </a>
                        </div>

                        <SocialLinks withCv className="justify-center lg:justify-start" />
                    </motion.div>

                    <motion.div {...fadeIn(0.3)}>
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
