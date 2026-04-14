import olistImg from '../assets/projects/olist.png';
import gamesImg from '../assets/projects/games.png';
import diamondsImg from '../assets/projects/diamonds.png';
import titanicImg from '../assets/projects/titanic.png';
import churnImg from '../assets/projects/churn.png';
import globalSuperstoreImg from '../assets/projects/global_superstore.png';
import hospitalDashboardImg from '../assets/projects/hospital_dashboard.png';

export const projects = [
    {
        id: 1,
        category: "data-science",
        title: "Análisis de Ventas - E-commerce Olist",
        description: {
            es: "Análisis del conjunto de datos de Olist para explorar y visualizar patrones de ventas, identificando categorías rentables y comportamiento de precios.",
            en: "Analysis of the Olist dataset to explore and visualize sales patterns, identifying profitable categories and pricing behavior."
        },
        tech: ["Python", "Pandas", "Matplotlib", "NumPy"],
        image: olistImg,
        link: "https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%201/Main.ipynb",
        stars: 3,
        topics: ["Data Analysis", "E-commerce"]
    },
    {
        id: 2,
        category: "data-science",
        title: "Análisis de Ventas de Videojuegos (2000-2016)",
        description: {
            es: "Análisis global de ventas de videojuegos utilizando técnicas de ML. Dataset de +16,000 juegos, explorando variables como plataforma, género y ventas regionales.",
            en: "Global video game sales analysis using ML techniques. Dataset of +16,000 games, exploring platform, genre, and regional sales variables."
        },
        tech: ["Python", "Pandas", "Seaborn", "Scikit-learn"],
        image: gamesImg,
        link: "https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%202/Main.ipynb",
        stars: 2,
        topics: ["Machine Learning", "Gaming"]
    },
    {
        id: 3,
        category: "data-science",
        title: "Predicción de Precios de Diamantes",
        description: {
            es: "Pipeline de Machine Learning con PyCaret para predecir precios de diamantes basado en características físicas. Demostración de herramientas low-code.",
            en: "Machine Learning pipeline with PyCaret to predict diamond prices based on physical characteristics. Demonstration of low-code tools."
        },
        tech: ["PyCaret", "Python", "Pandas", "Jupyter"],
        image: diamondsImg,
        link: "https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%203/Pycaret%20y%20Entrenamiento.ipynb",
        stars: 4,
        topics: ["PyCaret", "Prediction"]
    },
    {
        id: 4,
        category: "data-science",
        title: "Predicción de Supervivencia Titanic",
        description: {
            es: "Estudio del clásico dataset del Titanic utilizando PyCaret para explorar capacidades de machine learning de bajo código.",
            en: "Study of the classic Titanic dataset using PyCaret to explore low-code machine learning capabilities."
        },
        tech: ["PyCaret", "Pandas", "NumPy"],
        image: titanicImg,
        link: "https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%204/Main.ipynb",
        stars: 5,
        topics: ["PyCaret", "Classification"]
    },
    {
        id: 5,
        category: "data-science",
        title: "Predicción de Fuga de Clientes (Churn Rate)",
        description: {
            es: "Análisis y predicción de fuga de clientes en telecomunicaciones usando PyCaret y AdaBoost Classifier. Modelo optimizado para Recall que identifica clientes con alta probabilidad de cancelar servicios.",
            en: "Customer churn analysis and prediction in telecommunications using PyCaret and AdaBoost Classifier. Recall-optimized model that identifies customers with high probability of canceling services."
        },
        tech: ["PyCaret", "Python", "Pandas", "AdaBoost"],
        image: churnImg,
        link: "https://github.com/Dandlrt09/Proyecto_Analisis-y-Prediccion-de-Fuga-de-Clientes",
        stars: 4,
        topics: ["Machine Learning", "Classification", "Churn"]
    }
];

// Proyectos de Análisis de Datos (Power BI, Tableau, Looker, etc.)
// Agrega aquí tus proyectos de BI cuando estén listos.
// Ejemplo de estructura:
// {
//     id: 1,
//     category: "data-analysis",
//     title: "Dashboard de Ventas - Power BI",
//     description: { es: "...", en: "..." },
//     tool: "Power BI",
//     image: someImg,
//     link: "https://...",
//     topics: ["Sales", "Dashboard"]
// }
export const biProjects = [
    {
        id: 1,
        category: "data-analysis",
        title: "Global Superstore Project",
        description: {
            es: "Dashboard interactivo de Power BI que analiza las ventas globales del dataset Global Superstore. Explora métricas clave como ingresos, márgenes de ganancia y tendencias de ventas por región, categoría de producto y segmento de cliente.",
            en: "Interactive Power BI dashboard analyzing global sales from the Global Superstore dataset. Explores key metrics including revenue, profit margins, and sales trends by region, product category, and customer segment."
        },
        tool: "Power BI",
        image: globalSuperstoreImg,
        link: "https://app.powerbi.com/view?r=eyJrIjoiNTJmNWM1OGYtZTRjNC00NmVjLTk3OGItMDI2NzgwNmYzMTdlIiwidCI6IjM0MzAzNTQxLTc0ZWMtNGQ0YS04YzVhLTgwNDlkMmZkNmNlNiIsImMiOjR9",
        topics: ["Sales Analytics", "Power BI", "Global"]
    },
    {
        id: 2,
        category: "data-analysis",
        title: "Dashboard Hospitalario",
        description: {
            es: "Dashboard interactivo de análisis hospitalario con datos de 984 pacientes. Visualiza KPIs clave como costo promedio, tasa de readmisión y satisfacción del paciente. Incluye filtros dinámicos por género, resultado clínico y readmisión, con gráficos de condiciones frecuentes, distribución por edad, procedimientos y más.",
            en: "Interactive hospital analytics dashboard with data from 984 patients. Visualizes key KPIs such as average cost, readmission rate, and patient satisfaction. Includes dynamic filters by gender, clinical outcome and readmission, with charts for frequent conditions, age distribution, procedures, and more."
        },
        tool: "Chart.js",
        image: hospitalDashboardImg,
        link: "/hospital_dashboard.html",
        localFile: true,
        topics: ["Healthcare", "Dashboard", "Chart.js"]
    }
];
