import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-surface py-8 border-t border-white/5 mt-auto">
            <div className="max-w-7xl mx-auto px-6 text-center text-text-muted text-sm">
                <p>&copy; {year} Daniel Josué De los Ríos Trespalacios. {t.footer.rights}</p>
            </div>
        </footer>
    );
};

export default Footer;
