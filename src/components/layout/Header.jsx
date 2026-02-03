import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: t.nav.about, href: "#about" },
        { name: t.nav.projects, href: "#projects" },
        { name: t.nav.contact, href: "#contact" },
    ];

    return (
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Daniel DLRT
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}

                    <div className="h-4 w-[1px] bg-white/20"></div>

                    <button
                        onClick={toggleLanguage}
                        className="text-xs font-semibold px-3 py-1 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                    >
                        {language === 'es' ? 'EN' : 'ES'}
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text hover:text-primary"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-base font-medium text-text-muted hover:text-primary"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <hr className="border-white/10" />
                            <button
                                onClick={() => {
                                    toggleLanguage();
                                    setIsMenuOpen(false);
                                }}
                                className="text-sm font-semibold text-left text-text-muted hover:text-primary"
                            >
                                Switch to {language === 'es' ? 'English' : 'Español'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
