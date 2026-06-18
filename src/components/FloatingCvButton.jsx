import React from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const FloatingCvButton = () => {
    const { t } = useLanguage();
    const cvUrl = "https://drive.google.com/file/d/18K0VyqUcnGKAGnFtOs223WszclZnH9YB/view?usp=sharing";

    return (
        <motion.a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 p-3.5 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
            title={t.contact.cv}
        >
            <FileText size={22} />
        </motion.a>
    );
};

export default FloatingCvButton;
