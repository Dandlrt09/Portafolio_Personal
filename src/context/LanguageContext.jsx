import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    es: {
        hero: {
            badge: "ANALISTA DE DATOS & BI",
            title: "Daniel Josué De los Ríos Trespalacios",
            subtitle: "De la Ingeniería Multimedia al Mundo de los Datos | Python | Power BI | Machine Learning",
            cta: "Ver Proyectos",
            resume: "Ver CV"
        },
        nav: {
            projects: "Proyectos",
            about: "Sobre Mí",
            contact: "Contacto",
        },
        projects: {
            title: "Mis Proyectos",
            dsTitle: "Ciencia de Datos",
            biTitle: "Análisis de Datos",
            viewCode: "Ver Código",
            viewReport: "Ver Reporte",
            viewHere: "Ver aquí",
            viewStreamlit: "Ver en Streamlit",
            stars: "Estrellas",
            comingSoon: "Próximamente…",
            comingSoonDesc: "Aquí publicaré dashboards e informes interactivos desarrollados con Power BI y otras herramientas de visualización de datos."
        },
        about: {
            title: "Sobre Mí",
            description: "Profesional con formación en Ingeniería Multimedia en transición activa hacia Ciencia de Datos y Business Intelligence. Combino habilidades técnicas en Python (Pandas, NumPy, Scikit-learn) y Power BI con una sólida comprensión del diseño de información y la comunicación visual, lo que me permite transformar datos complejos en narrativas claras y accionables para equipos no técnicos. He desarrollado proyectos personales de machine learning — incluyendo predicción de churn y análisis de ventas globales — y tengo proyección hacia arquitecturas de datos en la nube con Databricks y Azure/AWS."
        },
        skills: {
            python: "Python (Pandas, NumPy, Scikit-learn)",
            ml: "EDA & Machine Learning",
            bi: "Power BI & Visualización",
            storytelling: "Data Storytelling & Comunicación Visual"
        },
        footer: {
            rights: "Todos los derechos reservados."
        }
    },
    en: {
        hero: {
            badge: "DATA ANALYST & BI",
            title: "Daniel Josué De los Ríos Trespalacios",
            subtitle: "From Multimedia Engineering to Data | Python | Power BI | Machine Learning",
            cta: "View Projects",
            resume: "View CV"
        },
        nav: {
            projects: "Projects",
            about: "About Me",
            contact: "Contact",
        },
        projects: {
            title: "My Projects",
            dsTitle: "Data Science",
            biTitle: "Data Analysis",
            viewCode: "View Code",
            viewReport: "View Report",
            viewHere: "View here",
            viewStreamlit: "View in Streamlit",
            stars: "Stars",
            comingSoon: "Coming soon…",
            comingSoonDesc: "Here I will publish interactive dashboards and reports built with Power BI and other data visualization tools."
        },
        about: {
            title: "About Me",
            description: "Professional with a Multimedia Engineering background in active transition toward Data Science and Business Intelligence. I combine technical skills in Python (Pandas, NumPy, Scikit-learn) and Power BI with a strong understanding of information design and visual communication, enabling me to transform complex data into clear, actionable narratives for non-technical teams. I have developed personal machine learning projects — including churn prediction and global sales analysis — with a forward-looking focus on cloud data architectures using Databricks and Azure/AWS."
        },
        skills: {
            python: "Python (Pandas, NumPy, Scikit-learn)",
            ml: "EDA & Machine Learning",
            bi: "Power BI & Visualization",
            storytelling: "Data Storytelling & Visual Communication"
        },
        footer: {
            rights: "All rights reserved."
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('es');

    const t = translations[language];

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
    };

    return (
        <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
