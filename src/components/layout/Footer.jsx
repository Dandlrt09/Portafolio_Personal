import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="bg-surface py-12 border-t border-white/5 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

                <h3 className="text-2xl font-bold mb-6 text-primary">{t.nav.contact}</h3>

                <div className="flex items-center gap-6 mb-8">
                    <a href="https://github.com/Dandlrt09" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                        <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/danieldlrt09" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                        <Linkedin size={24} />
                    </a>
                    <a href="mailto:danieldelosriost@gmail.com" className="text-text-muted hover:text-primary transition-colors">
                        <Mail size={24} />
                    </a>
                </div>

                <div className="text-text-muted text-sm text-center">
                    <p className="mb-2">danieldelosriost@gmail.com</p>
                    <p>&copy; {year} Daniel Josué De los Ríos Trespalacios. {t.footer.rights}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
