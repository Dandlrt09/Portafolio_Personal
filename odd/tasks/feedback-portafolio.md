# Feedback del portafolio: claridad en Sobre mí y peso visual en Habilidades

Pase de mejoras pedido por el dueño sobre su portafolio personal (Vite + React + Tailwind,
sitio bilingüe ES/EN). Cada punto del feedback entra como spec nueva; un cambio de requisito
se agrega verbatim al `## Log` y reescribe sólo la spec afectada.

## Specs

S1. **Sobre mí, claridad.** El primer párrafo no se entiende y tiene que quedar claro a la hora
de conocerlo. El dueño se presenta como desarrollador Fullstack. Sus palabras: "no es muy
entendible el primer parrafo, la idea es ser mas claro a la hora de conocerme. Soy desarrollador
Fullstack". Sobre el registro: "Me gustaria iniciar por soy desarrollador fullstack pero ese
parrafo parese una especie de poesia la manera en la que esta escrito".

S2. **Habilidades, peso visual.** "hay mucho texto y poca parte visual, lo que se quiere es
agregar ese lado visual con iconos o ese tipo de cosas para que no parezcan los creditos finales
de una pelicula".

## Tasks

| ID | Specs | Ruta | Estado | Commit |
| --- | --- | --- | --- | --- |
| T1 | S1 | inline (padre) | hecho, sin commit | — |
| T2 | S2 | diseño (artboards) → `Skills.jsx` (worker) | en curso: C1 elegida, handoff en implementación | — |

## Log

L1 (usuario, verbatim): "Tengo feedback de mi portafolio, hagamos mas cambios: Iniciamos por el
sobre mi, no es muy entendible el primer parrafo, la idea es ser mas claro a la hora de conocerme.
Soy desarrollador Fullstack"

L2 (usuario, verbatim): "Me gustaria iniciar por soy desarrollador fullstack pero ese parrafo
parese una especie de poesia la manera en la que esta escrito"

L3 (usuario, verbatim): "Antes de seguir quiero ver los cambios en vivo"

L4 (usuario, verbatim): "[Image#1] Sección de habilidades, hay mucho texto y poca parte visual,
lo que se quiere es agregar ese lado visual con iconos o ese tipo de cosas para que no parezcan
los creditos finales de una pelicula"

L5 (padre): T1 aplicado en `src/context/LanguageContext.jsx` (hero + Sobre mí, ES/EN) e
`index.html` (`<title>`, `og:title`, `og:image:alt`, `twitter:title`, meta `description`).
Verificado con `eslint` + `vite build` (exit 0) y `grep` sin restos del rol viejo.
**Sin commit**: el dueño está revisando en `localhost:5173`.

L6 (padre): S2 arranca por diseño, no por código. Dos hallazgos del sistema:
(a) `design/system.md` prohíbe un tercer color y reserva el gradiente a la identidad, así que
iconos de tecnología a color romperían el sistema; (b) `lucide-react` no tiene iconos de marca
(Python, React, Power BI no existen), sólo genéricos, así que un icono por skill sería ambiguo.
Decisión de encuadre: iconos **por categoría** (5), que sí tienen significado, y ya tienen
precedente en `ProjectGrid.jsx` (`BrainCircuit`, `BarChart2`). Direcciones en `design/skills-visual/`.

L7 (padre): `design/skills-visual/` queda con 5 artboards. **Elegido: `04-tarjeta-comprimida.html`
(C1 · Tarjetas comprimidas, grupos en dos columnas)**, artboard entregado a implementación.
Los otros cuatro son **alternativas**, no propuestas vigentes: `01-grupos-tarjeta.html` (A),
`02-matriz-nivel.html` (B), `03-tarjeta-skill.html` (C, la que el dueño encontró excesiva) y
`05-nube-densa.html` (C2, compresión máxima sin encabezados de grupo).
El dueño eligió C1 explícitamente: "Vamos con C1".

L8 (padre): antes de implementar se corrigió una desviación real detectada al auditar los
artboards contra `design/system.md`: se habían usado radios de 10px y 16px, fuera del juego de
tokens (8px `rounded-lg` para controles, 12px `rounded-xl` para tarjetas, `rounded-full` para
pills). Corregido en 01, 02, 04 y 05. La implementación debe usar sólo los radios del sistema.

L9 (worker gentle-ai-worker, tarea 2-w8w3): C1 implementada en `src/components/Skills.jsx`,
único archivo tocado. Grupos a `grid-cols-1 lg:grid-cols-2`; icono de categoría por grupo en tile
`rounded-lg` de 26px (`Code`, `Database`, `Sparkles`, `BarChart2`, `Layout`, verificados contra
`lucide-react@0.563.0`); cada skill pasa a tile de superficie (`rounded-lg`, `bg-surface`,
`border-white/10`) con nombre + `LevelBar` + nivel numérico. Máquina de estados, layer SVG,
caption, franja de proyectos y H2 quedaron intactos. Sin claves i18n nuevas.
Evidencia: `node_modules/.bin/eslint src/components/Skills.jsx` exit 0; `npm run build` exit 0
(2145 módulos, 45.26s).
**Sin verificar:** la geometría del layer SVG de conexiones tras el cambio de layout. Nadie lo vio
renderizado y el proyecto no tiene tests. Es el riesgo abierto de T2.
Nota: el requerimiento 3 (sacar tags de proyecto dentro de la fila) resultó no aplicable — el código
actual no los renderizaba; el marcador `◦` de habilidad sin proyecto se preservó.
