import olistImg from '../assets/projects/olist.png';
import gamesImg from '../assets/projects/games.png';
import diamondsImg from '../assets/projects/diamonds.png';
import titanicImg from '../assets/projects/titanic.png';

export const projects = [
    {
        id: 1,
        title: "Análisis de Ventas - E-commerce Olist",
        description: {
            es: "Análisis del conjunto de datos de Olist para explorar y visualizar patrones de ventas, identificando categorías rentables y comportamiento de precios.",
            en: "Analysis of the Olist dataset to explore and visualize sales patterns, identifying profitable categories and pricing behavior."
        },
        tech: ["Python", "Pandas", "Matplotlib", "NumPy"],
        image: olistImg,
        link: "https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%201/Main.ipynb",
        stars: 3, // Placeholder
        topics: ["Data Analysis", "E-commerce"]
    },
    {
        id: 2,
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
    }
];
