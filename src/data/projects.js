import dataraBrand from '../assets/projects/datara.webp';
import anvbarHero from '../assets/projects/anvbar.webp';
import olistImg from '../assets/projects/olist_app.png';
import churnImg from '../assets/projects/churn_app.png';
import globalSuperstoreImg from '../assets/projects/global_superstore.png';
import globalResumen from '../assets/projects/global_resumen.png';
import globalGeografico from '../assets/projects/global_geografico.png';
import globalProductos from '../assets/projects/global_productos.png';
import hrDashboardImg from '../assets/projects/hr_dashboard.png';
import hrResumen from '../assets/projects/hr_resumen.png';
import hrEmpleados from '../assets/projects/hr_empleados.png';
import hrRotacion from '../assets/projects/hr_rotacion.png';

/**
 * Project cards lead with the person, not with the project.
 *
 * Block order in every ficha: role → decision ("Lo que hice") → problem → stack → complexity.
 *
 * - `role`       who did it and under what conditions. The first thing a reader sees.
 * - `timeline`   real duration, or the live state when the work is still open.
 * - `decision`   kept as a field name because the copy was already in first person; the
 *                visible label is "Lo que hice". Renaming the key would break the cards
 *                for nothing.
 * - `complexity` replaces `stars`. It rates the WORK, never Daniel's skill level: two 1-5
 *                self-ratings on one page would be two scales with the same range and
 *                different meanings. It always carries a `reason`, because a bare number
 *                cannot be verified and reads as self-praise.
 *
 * Honesty rules held here, do not break them:
 *   - ANV·BAR is the only real client in the whole portfolio. No other ficha may imply a
 *     client, a company or an organisation.
 *   - ANV·BAR was delivered but is NOT published: the brand has no products loaded yet,
 *     which is why no domain was bought.
 *   - Nothing states that private data never leaves the machine: the LLM provider still runs
 *     in the cloud, so Datara's local-privacy goal is written as an intent, not as a fact.
 */

/**
 * Featured projects — end-to-end data and AI applications.
 * Every card answers: what I did, what problem, what stack, how complex it was.
 */
export const featuredProjects = [
    {
        id: 'datara',
        category: 'ai',
        status: { es: 'En desarrollo activo', en: 'Active development' },
        title: { es: 'Datara', en: 'Datara' },
        tagline: {
            es: 'Análisis de datos con chat en lenguaje natural',
            en: 'Data analysis through a natural-language chat'
        },
        role: {
            es: 'Lo construyo yo, de punta a punta: arquitectura, backend y frontend. Los agentes de IA son mi equipo de ejecución, no el criterio.',
            en: 'I build it end to end: architecture, backend, and frontend. AI agents are my execution team, not the judgement.'
        },
        timeline: {
            es: 'Desde septiembre · en desarrollo activo',
            en: 'Since September · active development'
        },
        problem: {
            es: 'Para analizar datos con IA hay que saber programar o usar herramientas en inglés, y casi todas te obligan a subir tus archivos a un servidor de terceros. Busco que Datara sea un programa local: que puedas trabajar con datos privados sin miedo a subirlos a una página de internet. Siempre es bueno desconfiar.',
            en: 'Analyzing data with AI means knowing how to code or using English-only tools, and almost all of them force you to upload your files to a third party\'s server. I want Datara to be a local program: work with private data without the fear of uploading it to a website. Distrust is healthy.'
        },
        decision: {
            es: 'El reto no fue la IA, fue el sandbox. El código que genera el modelo puede tener loops infinitos, imports peligrosos o errores de sintaxis, así que construí un entorno de ejecución aislado y a la vez potente como para que pandas y Plotly funcionen. Ahí está también la frontera de los datos: el dataset no se sube, al modelo solo le llegan el esquema, la metadata, las estadísticas y una muestra mínima de filas, y los datos reales los lee el sandbox desde tu disco. La arquitectura está separada en tres capas — core, server y web — con proveedores de LLM intercambiables, para no quedar atado a uno solo.',
            en: 'The challenge was not the AI — it was the sandbox. Model-generated code can contain infinite loops, dangerous imports, or syntax errors, so I built an isolated execution environment that is still powerful enough for pandas and Plotly to run. That is also where the data boundary sits: the dataset is not uploaded — the model only receives the schema, the metadata, the statistics and a minimal sample of rows — and the real data is read by the sandbox from your disk. The architecture is split into three layers — core, server, and web — with interchangeable LLM providers so the project is not tied to a single one.'
        },
        stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQLite', 'Gemini API'],
        complexity: {
            level: 5,
            reason: {
                es: 'Sandbox de ejecución aislado escrito a medida, una frontera de datos explícita entre el modelo y tu disco, y tres capas desacopladas con proveedores de LLM intercambiables.',
                en: 'A purpose-built isolated execution sandbox, an explicit data boundary between the model and your disk, and three decoupled layers with interchangeable LLM providers.'
            }
        },
        image: dataraBrand,
        imageAlt: {
            es: 'Wordmark de Datara sobre el fondo oscuro de su design system',
            en: 'Datara wordmark on its dark design system background'
        },
        repo: 'https://github.com/Dandlrt09/Datara-2',
        meta: { es: 'Open source (MIT) · pytest · CI', en: 'Open source (MIT) · pytest · CI' }
    },
    {
        id: 'anvbar',
        category: 'client',
        status: { es: 'Cliente real · entregado, sin publicar', en: 'Real client · delivered, not published' },
        title: { es: 'ANV·BAR Web', en: 'ANV·BAR Web' },
        tagline: {
            es: 'Tienda y panel de administración para una marca de moda',
            en: 'Storefront and admin panel for a fashion brand'
        },
        role: {
            es: 'Único proyecto con cliente real. Lo diseñé y lo construí solo, de la primera reunión a la entrega.',
            en: 'The only project with a real client. I designed and built it alone, from the first meeting to delivery.'
        },
        timeline: {
            es: '4 semanas · entregado. Sin publicar: la marca todavía no cargó productos, por eso no se compró dominio.',
            en: '4 weeks · delivered. Not published yet: the brand has no products loaded, which is why no domain was bought.'
        },
        problem: {
            es: 'Una marca de moda femenina hecha a mano necesitaba vender sin carrito ni pasarela de pago: catálogo en vivo, pedidos por WhatsApp y un panel propio para gestionar productos y testimonios sin depender de un desarrollador para cada cambio.',
            en: 'A handmade women\'s fashion brand needed to sell without a shopping cart or payment gateway: a live catalogue, WhatsApp orders, and its own panel to manage products and testimonials without a developer for every change.'
        },
        decision: {
            es: 'El catálogo se lee en vivo desde Supabase con un gate de pantalla completa que bloquea el render hasta que la carga termina, así nadie ve un catálogo a medias. La seguridad la resolví con Supabase Auth, políticas RLS y una lista de administradores autorizados, en lugar de manejar permisos en el frontend. El código está organizado por dominio de negocio — catalog, favorites, reviews, admin —, no por tipo de archivo.',
            en: 'The catalogue is read live from Supabase behind a full-screen gate that blocks rendering until loading finishes, so nobody ever sees a half-loaded catalogue. Security is handled with Supabase Auth, RLS policies, and an allowlist of administrators instead of frontend-side permission checks. The code is organized by business domain — catalog, favorites, reviews, admin — not by file type.'
        },
        stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Postgres', 'RLS'],
        complexity: {
            level: 4,
            reason: {
                es: 'Catálogo en vivo detrás de un gate que bloquea el render, seguridad con Auth y políticas RLS en la base, y arquitectura por dominio de negocio en vez de por tipo de archivo.',
                en: 'A live catalogue behind a render-blocking gate, security handled with Auth plus database-level RLS policies, and code organised by business domain instead of file type.'
            }
        },
        image: anvbarHero,
        imageAlt: {
            es: 'Página de inicio de la tienda ANV·BAR con una prenda bordó sobre fondo floral',
            en: 'ANV·BAR storefront home page with a burgundy garment on a floral background'
        },
        repo: 'https://github.com/Dandlrt09/P-gina-Web-ANV-BAR',
        demo: 'https://anvbarpage.danieldelosriost.workers.dev',
        meta: {
            es: 'Único cliente real · el lanzamiento depende de la marca',
            en: 'Only real client · launch depends on the brand'
        }
    },
    {
        id: 'aipdf',
        category: 'ai',
        status: { es: 'Iniciativa propia', en: 'Self-initiated' },
        title: { es: 'AI PDF Generator', en: 'AI PDF Generator' },
        tagline: {
            es: 'Documentos generados con IA, con formato determinista',
            en: 'AI-generated documents with deterministic formatting'
        },
        role: {
            es: 'Brief real que encontré en Workana. El cliente nunca respondió, así que lo construí igual, por iniciativa propia, para sumarlo al portafolio.',
            en: 'A real brief I found on Workana. The client never replied, so I built it anyway, on my own initiative, to add it to the portfolio.'
        },
        timeline: {
            es: '2 días',
            en: '2 days'
        },
        problem: {
            es: 'Generar documentos con IA suele terminar en layouts inconsistentes: el modelo también decide el formato y cada corrida sale distinta. Un mismo pedido debería producir siempre el mismo documento.',
            en: 'Generating documents with AI usually ends in inconsistent layouts: the model also decides the formatting, so every run looks different. The same request should always produce the same document.'
        },
        decision: {
            es: 'Separé responsabilidades en lugar de dejar todo al modelo: el LLM redacta el contenido y Python determinista (ReportLab) renderiza el layout. Cinco tipos de documento — factura, propuesta, informe, carta y resumen — comparten un mismo motor, y la CLI y la app de Streamlit son envoltorios finos sobre la misma función. Un test verifica que ambos caminos producen PDFs byte-idénticos.',
            en: 'I separated responsibilities instead of leaving everything to the model: the LLM writes the content and deterministic Python (ReportLab) renders the layout. Five document types — invoice, proposal, report, letter, and summary — share one engine, and the CLI and the Streamlit app are thin wrappers over the same function. A test asserts that both paths produce byte-identical PDFs.'
        },
        stack: ['Python', 'Streamlit', 'ReportLab', 'Gemini', 'OpenAI', 'pytest'],
        complexity: {
            level: 4,
            reason: {
                es: 'Separación estricta entre el contenido que redacta el LLM y el layout que renderiza Python determinista, con cinco tipos de documento sobre un mismo motor y un test que exige PDFs byte-idénticos entre CLI y web.',
                en: 'A strict split between the content the LLM writes and the layout deterministic Python renders, with five document types over one engine and a test that demands byte-identical PDFs from CLI and web.'
            }
        },
        image: null,
        imageAlt: null,
        repo: 'https://github.com/Dandlrt09/Freelancer_Proyects/tree/main/ai-pdf-generator',
        meta: { es: 'CI · CLI + web sobre un mismo core', en: 'CI · CLI + web over a single core' }
    }
];

/**
 * Analytics work — dashboards and predictive models on public datasets.
 * This is practice built on my studies, not client work, and every ficha says so.
 * `kind` selects the card component: 'bi' renders the report gallery, 'ds' links the notebook and demo.
 *
 * None of these declares `timeline`, on purpose: how long a study exercise took is not part of
 * what these fichas are selling, and a bare duration invites a comparison that says nothing about
 * the work. The criterion and the complexity score carry that weight instead. The real durations
 * stay recorded in `odd/tasks/proyectos-protagonismo.md` (S14).
 */
export const analyticsProjects = [
    {
        id: 'churn',
        kind: 'ds',
        category: 'data-science',
        title: { es: 'Predicción de fuga de clientes (Churn)', en: 'Customer Churn Prediction' },
        role: {
            es: 'Ejercicio individual de análisis sobre un dataset público, parte de mi formación. No es trabajo para cliente.',
            en: 'An individual analysis exercise on a public dataset, part of my studies. Not client work.'
        },
        description: {
            es: 'Pipeline en PyCaret que cubre EDA, ingeniería de características y balanceo de clases, con un clasificador AdaBoost que alcanza un Recall del 64% sobre clientes con alta probabilidad de cancelar. Lo publiqué como simulador interactivo para que el resultado se pueda usar, no solo leer.',
            en: 'A PyCaret pipeline covering EDA, feature engineering, and class balancing, with an AdaBoost classifier reaching 64% Recall on customers likely to cancel. I published it as an interactive simulator so the result can be used, not just read.'
        },
        tech: ['PyCaret', 'Python', 'Pandas', 'AdaBoost'],
        complexity: {
            level: 3,
            reason: {
                es: 'Elegí optimizar Recall en vez de exactitud, porque el costo real está en no detectar a quien se va; eso obligó a balancear clases y justificar la métrica.',
                en: 'I optimised for Recall instead of accuracy, because the real cost is failing to spot who leaves; that forced class balancing and a defended metric choice.'
            }
        },
        image: churnImg,
        link: 'https://github.com/Dandlrt09/Proyecto_Analisis-y-Prediccion-de-Fuga-de-Clientes',
        streamlit: 'https://simulador-churn.streamlit.app',
        metrics: { es: ['Recall optimizado para detectar fugas', 'Modelo AdaBoost + PyCaret', 'Simulador interactivo de predicción'], en: ['Recall-optimized churn detection', 'AdaBoost + PyCaret model', 'Interactive prediction simulator'] },
        topics: ['Machine Learning', 'Classification', 'Churn']
    },
    {
        id: 'olist',
        kind: 'ds',
        category: 'data-science',
        title: { es: 'Análisis de ventas — E-commerce Olist', en: 'Sales Analysis — Olist E-commerce' },
        role: {
            es: 'Ejercicio individual de análisis sobre un dataset público, parte de mi formación. No es trabajo para cliente.',
            en: 'An individual analysis exercise on a public dataset, part of my studies. Not client work.'
        },
        description: {
            es: 'Analicé el dataset de Olist para encontrar las categorías realmente rentables, separando volumen de margen: vender mucho no es ganar mucho, y las categorías con más pedidos no eran las que dejaban plata. Cerré con un dashboard interactivo en Streamlit.',
            en: 'I analysed the Olist dataset to find the genuinely profitable categories, separating volume from margin: selling a lot is not earning a lot, and the categories with the most orders were not the ones leaving money. I closed it with an interactive Streamlit dashboard.'
        },
        tech: ['Python', 'Pandas', 'Matplotlib', 'NumPy'],
        complexity: {
            level: 2,
            reason: {
                es: 'Análisis exploratorio y de rentabilidad sobre +10.000 pedidos; la dificultad está en el criterio para separar margen de volumen, no en el código.',
                en: 'Exploratory and profitability analysis over 10,000+ orders; the difficulty is the judgement to separate margin from volume, not the code.'
            }
        },
        image: olistImg,
        link: 'https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%201/Main.ipynb',
        streamlit: 'https://e-commerce-app-project.streamlit.app',
        metrics: { es: ['+10,000 pedidos analizados', 'Categorías rentables identificadas', 'Dashboard interactivo en Streamlit'], en: ['+10,000 orders analyzed', 'Profitable categories identified', 'Interactive Streamlit dashboard'] },
        topics: ['Data Analysis', 'E-commerce']
    },
    {
        id: 'superstore',
        kind: 'bi',
        category: 'data-analysis',
        title: { es: 'Global Superstore', en: 'Global Superstore' },
        role: {
            es: 'Ejercicio individual de análisis sobre un dataset público, parte de mi formación. No es trabajo para cliente.',
            en: 'An individual analysis exercise on a public dataset, part of my studies. Not client work.'
        },
        description: {
            es: 'Cuadro de mando en Power BI con KPIs de ingresos, márgenes y distribución por categorías, aplicando data storytelling para una audiencia no técnica.',
            en: 'Power BI dashboard with revenue, margin, and category-distribution KPIs, applying data storytelling for a non-technical audience.'
        },
        context: {
            es: {
                problem: 'Escenario de análisis, no un cliente: una compañía con operaciones globales necesita ver de un vistazo qué regiones, categorías y segmentos generan ganancias reales y cuáles drenan recursos. Trabajé sobre el dataset público Global Superstore y planteé la pregunta como si fuera una decisión de negocio real.',
                approach: 'Dashboard con filtros por región, categoría y segmento para ubicar rápido las oportunidades y los problemas de rentabilidad.',
                insight: 'Vender mucho no es ganar mucho. Algunas regiones con la facturación más alta tienen márgenes negativos: la decisión correcta es mirar rentabilidad, no volumen.'
            },
            en: {
                problem: 'An analysis scenario, not a client: a company with global operations needs to see at a glance which regions, categories, and segments generate real profit and which are draining resources. I worked on the public Global Superstore dataset and framed the question as if it were a real business decision.',
                approach: 'Dashboard with filters by region, category, and segment to quickly locate opportunities and profitability problems.',
                insight: 'High sales do not mean high profit. Some regions with the highest revenue have negative margins: the right decision is to look at profitability, not volume.'
            }
        },
        tool: 'Power BI',
        complexity: {
            level: 2,
            reason: {
                es: 'Tres páginas interactivas y un solo criterio que sostiene todo el cuadro: mostrar rentabilidad en vez de volumen, incluso cuando el volumen cuenta una historia más linda.',
                en: 'Three interactive pages and one judgement holding the whole dashboard together: showing profitability over volume, even when volume tells the prettier story.'
            }
        },
        image: globalSuperstoreImg,
        metrics: { es: ['3 páginas interactivas', 'Análisis por región, categoría y segmento', 'Rentabilidad vs. volumen de ventas'], en: ['3 interactive pages', 'Analysis by region, category, and segment', 'Profitability vs. sales volume'] },
        pages: [globalResumen, globalGeografico, globalProductos],
        pageLabels: { es: ['Resumen', 'Análisis geográfico', 'Análisis de productos'], en: ['Overview', 'Geographic analysis', 'Product analysis'] },
        pdfPath: '/Global Superstore Proyect.pdf',
        topics: ['Sales Analytics', 'Power BI', 'Global']
    },
    {
        id: 'hr',
        kind: 'bi',
        category: 'data-analysis',
        title: { es: 'Dashboard de Recursos Humanos', en: 'Human Resources Dashboard' },
        role: {
            es: 'Ejercicio individual de análisis sobre un dataset público, parte de mi formación. No es trabajo para cliente.',
            en: 'An individual analysis exercise on a public dataset, part of my studies. Not client work.'
        },
        description: {
            es: 'Dashboard en Power BI con tres vistas jerárquicas: resumen ejecutivo para una lectura de 30 segundos, análisis de empleados y rotación. Parte de 311 empleados, $69K de salario promedio y 33% de rotación.',
            en: 'Power BI dashboard with three hierarchical views: an executive summary readable in 30 seconds, employee analysis, and turnover. Built on 311 employees, $69K average salary, and 33% turnover.'
        },
        context: {
            es: {
                problem: 'Escenario de análisis, no un cliente: una organización necesita monitorear la salud de su capital humano — quién se va, por qué y qué patrones aparecen en desempeño y rotación. Sin datos claros, las decisiones de retención son reactivas. Trabajé sobre un dataset público de RRHH.',
                approach: 'Tres vistas jerárquicas: resumen ejecutivo, detalle por manager y una vista de desempeño y rotación para responder la pregunta crítica: ¿se van los mejores o los peores?',
                insight: 'Una rotación del 33% no es un número abstracto: cada salida tiene un perfil. Identificar patrones por departamento, antigüedad y desempeño permite actuar antes de perder los perfiles clave.'
            },
            en: {
                problem: 'An analysis scenario, not a client: an organisation needs to monitor the health of its human capital — who is leaving, why, and what patterns emerge in performance and turnover. Without clear data, retention decisions are reactive. I worked on a public HR dataset.',
                approach: 'Three hierarchical views: an executive summary, per-manager detail, and a performance and turnover view to answer the critical question: are the best or the worst leaving?',
                insight: 'A 33% turnover rate is not an abstract number: every departure has a profile. Identifying patterns by department, tenure, and performance enables action before key profiles are lost.'
            }
        },
        tool: 'Power BI',
        complexity: {
            level: 3,
            reason: {
                es: 'Ordenar tres vistas jerárquicas para que la primera se lea en 30 segundos obligó a decidir qué se muestra y qué se esconde, que es la parte difícil de un dashboard.',
                en: 'Ordering three hierarchical views so the first reads in 30 seconds forced decisions about what to show and what to hide, which is the hard part of a dashboard.'
            }
        },
        image: hrDashboardImg,
        metrics: { es: ['311 empleados totales', '3 páginas interactivas', 'Tasa de rotación del 33%'], en: ['311 total employees', '3 interactive pages', '33% turnover rate'] },
        pages: [hrResumen, hrEmpleados, hrRotacion],
        pageLabels: { es: ['Resumen ejecutivo', 'Análisis de empleados', 'Rotación'], en: ['Executive summary', 'Employee analysis', 'Turnover'] },
        pdfPath: '/Recursos Humanos.pdf',
        topics: ['Human Resources', 'Power BI', 'HR Analytics']
    }
];

/**
 * Archive — practice and course work, kept for completeness but out of the main path.
 * Compact list, no cards, and the section note already declares it as coursework.
 */
export const archivedProjects = [
    {
        id: 'games',
        title: { es: 'Análisis de ventas globales — Videojuegos (1985-2016)', en: 'Global Sales Analysis — Video Games (1985-2016)' },
        detail: { es: 'Dataset de +16.000 lanzamientos · Python, Seaborn', en: 'Dataset of +16,000 releases · Python, Seaborn' },
        complexity: {
            level: 5,
            reason: {
                es: 'Ninguna variable alcanza sola para explicar el mercado: el trabajo está en decidir qué cruzar, cómo agrupar y hasta dónde se puede afirmar algo con estos datos.',
                en: 'No single variable explains the market on its own: the work is deciding what to cross, how to group, and how far a claim can honestly go with this data.'
            }
        },
        link: 'https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%202/Main.ipynb',
        demo: 'https://videogames-analysis.streamlit.app'
    },
    {
        id: 'diamonds',
        title: { es: 'Predicción de precios de diamantes', en: 'Diamond Price Prediction' },
        detail: { es: 'Dataset de práctica · PyCaret', en: 'Practice dataset · PyCaret' },
        complexity: {
            level: 4,
            reason: {
                es: 'El precio depende de varias variables a la vez y de cómo se relacionan entre ellas: meterlas al modelo y mirar el error no alcanza.',
                en: 'Price depends on several variables at once and on how they relate to each other: feeding them to the model and reading the error is not enough.'
            }
        },
        link: 'https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%203/Pycaret%20y%20Entrenamiento.ipynb',
        demo: 'https://diamond-price-app.streamlit.app'
    },
    {
        id: 'titanic',
        title: { es: 'Predicción de supervivencia Titanic', en: 'Titanic Survival Prediction' },
        detail: { es: 'Dataset de práctica · PyCaret', en: 'Practice dataset · PyCaret' },
        complexity: {
            level: 4,
            reason: {
                es: 'El dataset es chico y conocido, y eso es lo que lo vuelve exigente: cada decisión hay que justificarla contra lo que ya está escrito, en vez de copiar el camino conocido.',
                en: 'The dataset is small and well known, and that is what makes it demanding: every decision has to be justified against what is already written instead of copying the known path.'
            }
        },
        link: 'https://github.com/Dandlrt09/DataScience_Proyects/blob/main/Proyecto%204/Main.ipynb',
        demo: 'https://supervivencia-titanic.streamlit.app'
    },
    {
        id: 'hospital',
        title: { es: 'Dashboard hospitalario', en: 'Hospital Dashboard' },
        detail: { es: 'Exploración con Chart.js fuera de Power BI', en: 'Exploration with Chart.js outside Power BI' },
        complexity: {
            level: 2,
            reason: {
                es: 'Los datos son ordenados y las preguntas claras: la dificultad está en el armado del tablero, no en los datos.',
                en: 'The data is tidy and the questions are clear: the difficulty is in building the dashboard, not in the data.'
            }
        },
        link: '/hospital_dashboard.html',
        local: true
    }
];
