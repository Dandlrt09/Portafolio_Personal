# Design system — ds-portfolio

Captured from project sources only. Every value below names its source file.

Sources read: `tailwind.config.js`, `src/index.css`, `index.html`,
`src/components/layout/Header.jsx`, `src/components/Hero.jsx`.

## Colors

| Token | Value | Usage | Source |
| --- | --- | --- | --- |
| `background` | `#0f172a` | Page base, scrollbar track, `theme-color` meta | `tailwind.config.js` |
| `surface` | `#1e293b` | Cards and panels | `tailwind.config.js` |
| `primary` | `#8b5cf6` | Main accent: primary CTA, gradient start, hover text | `tailwind.config.js` |
| `secondary` | `#06b6d4` | Secondary accent: badge border/text, gradient end | `tailwind.config.js` |
| `accent` | `#f43f5e` | Rose accent (declared; not used in Hero/Header) | `tailwind.config.js` |
| `text` | `#f8fafc` | Body and heading text | `tailwind.config.js` |
| `text-muted` | `#94a3b8` | Secondary text, nav links at rest | `tailwind.config.js` |
| `amber-400` | `#fbbf24` | **Complexity stars only** — the one colour outside the core palette. Filled star; the empty one is `text-white/10` | `src/components/ProjectBlocks.jsx` |
| `#334155` / `#475569` | — | Scrollbar thumb rest / hover | `src/index.css` |

Derived alpha conventions already in use: `border-white/10`, `bg-white/5`,
`bg-background/80`, `border-secondary/20`, `bg-secondary/5`, `bg-primary/20`.

## Typography

- Family: `Inter`, then `sans-serif` — declared in `tailwind.config.js` (`theme.extend.fontFamily.sans`)
  and **self-hosted**: `@font-face` in `src/index.css` over `src/assets/fonts/inter-latin-var.woff2`
  (variable, latin subset, `font-display: swap`), referenced with a **relative** path because
  `vite.config.js` sets `base: './'` for the GitHub Pages subpath.
- Scale in use (`src/components/Hero.jsx`, `Header.jsx`): `text-7xl` / `text-5xl` hero
  title, `text-lg` / `text-base` body, `text-sm` nav, `text-xs` badge and language toggle.
- Weights in use: `font-bold` headings, `font-medium` CTAs, `font-semibold` toggle.
- Tracking: `tracking-tight` (hero title), `tracking-wider` (badge).

## Spacing

- Page gutters: `px-6`; content caps: `max-w-4xl` (Hero), `max-w-7xl` (Header, grid).
- Header height: `h-16`; hero minimum height: `min-h-[90vh]`.
- Common gaps: `gap-4`, `gap-8`, `mb-4`, `mb-6`, `mb-8`.
- Button padding: `px-8 py-3`. Badge padding: `px-3 py-1`.

## Radius

- `rounded-lg` — buttons and CTAs (`Hero.jsx`).
- `rounded-xl` — cards and panels (`ProjectCard.jsx`, `BiProjectCard.jsx`, the archive toggle).
- `rounded-full` — badge, social icons, language toggle.
- `rounded-4px` — scrollbar thumb (`src/index.css`).

## Shadows

None declared. Depth is produced with blurred color blobs
(`bg-primary/20 blur-[120px]`, `bg-secondary/10 blur-[100px]`) and translucent borders.

## Component rules

- **Título de sección (H2)**: `text-3xl md:text-4xl font-bold`, con el título entero dentro de
  `<span className="border-b-4 border-primary pb-2">`. Un único tratamiento para las cuatro
  secciones — Sobre mí, Habilidades, Proyectos, Contacto — nunca degradado en el texto y nunca
  una barra suelta debajo del título. Source: `About.jsx`, `Skills.jsx`, `ProjectGrid.jsx`,
  `Contact.jsx`.
- **Header** (`Header.jsx`): fixed, `z-50`, `bg-background/80 backdrop-blur-md`,
  `border-b border-white/10`, inner row `h-16`. Wordmark is gradient text
  `from-primary to-secondary bg-clip-text text-transparent`, text `Daniel DLRT`.
  Nav links `text-sm font-medium text-text-muted`, hover `text-primary`.
- **Primary CTA**: `bg-primary`, text `white`, `rounded-lg`, hover `bg-primary/90`.
- **Secondary CTA**: `bg-white/5`, `border border-white/10`, text `white`, hover `bg-white/10`.
- **Badge**: `text-xs font-medium tracking-wider text-secondary`,
  `border border-secondary/20`, `bg-secondary/5`, `rounded-full`.
- **Social icon**: circular, `border border-white/5`, `text-text-muted`, hover
  `text-primary` with `bg-white/5`.
- **Campo de formulario** (`ContactForm.jsx`): label `text-xs font-medium text-text-muted`
  arriba del campo; control `w-full rounded-lg border bg-background/60 px-4 py-3 text-sm`,
  `placeholder:text-text-muted/50`, foco `focus:ring-2 focus:ring-primary/40`. Borde normal
  `border-white/10`; **con error** `border-accent/60` y el mensaje en `text-xs text-accent`.
  El estado del envío usa `secondary` para el éxito y `accent` para el error: es el único
  lugar del sitio donde `accent` cumple su rol declarado (alerta/error) en vez de decorar.
- **Motion** (`framer-motion`): entrance `opacity 0→1`, `y 20→0`, `duration 0.8`;
  interactive elements use `whileHover={{ scale: 1.05 }}` / `whileTap={{ scale: 0.95 }}`.

## Tipografía

Una sola familia en todo el sitio. Nunca una segunda familia, ni siquiera para
código o cifras.

**Familia:** `Inter` — declarada en `tailwind.config.js` (`theme.extend.fontFamily.sans`) y
**self-hosteada**: `@font-face` en `src/index.css` sobre
`src/assets/fonts/inter-latin-var.woff2` (variable, subset latin, `font-display: swap`), con
ruta **relativa** porque `vite.config.js` usa `base: './'` para el subpath de GitHub Pages.

### Escala canónica

| Rol | Clase Tailwind | Tamaño / línea | Peso | Tracking | Color |
| --- | --- | --- | --- | --- | --- |
| Display (nombre del hero) | `text-5xl md:text-7xl` | 48→72 / 1.05 | 700 | `-0.03em` | identidad (ver Tono) |
| H2 de sección | `text-3xl md:text-4xl` | 30→36 / 1.15 | 700 | `-0.02em` | `text` |
| H3 de tarjeta | `text-lg` | 18 / 1.4 | 600 | normal | `text` |
| Bajada (lead) | `text-lg` | 18 / 1.7 | 400 | normal | `text-muted` |
| Cuerpo | `text-base` | 16 / 1.7 | 400 | normal | `text-muted` |
| Nav y chips | `text-sm` | 14 / 1.5 | 500 | normal | `text-muted` |
| Micro (badge, caption) | `text-xs` | 12 / 1.4 | 500 | `0.05em` | `secondary` |

Reglas: tracking negativo **solo** en Display y H2. Los pesos son cuatro (700, 600,
500, 400) y no se inventan intermedios.

## Tono y color

### El gradiente de marca

- Existe **uno solo**: `linear-gradient(90deg, #8b5cf6, #06b6d4)`. Mismo ángulo,
misma dirección, siempre.
- **El gradiente es propiedad exclusiva de la identidad.** Va en exactamente dos elementos: el
wordmark del header y el nombre del hero. Nunca un tercer elemento: si aparece otro, ya no
es identidad, es decoración.
- **Nunca sobre una parte de una frase.** El elemento entero o nada. Partir un nombre
entre plano y degradado lo convierte en dos objetos visuales distintos.

### Jerarquía de color

| Token | Rol |
| --- | --- |
| `text` `#f8fafc` | Títulos y contenido principal |
| `text-muted` `#94a3b8` | Cuerpo, subtítulos, labels secundarios |
| `primary` `#8b5cf6` | Acción e identidad: CTA, palabra clave |
| `secondary` `#06b6d4` | Información y estado: badge, link, indicador |
| `accent` `#f43f5e` | Solo alerta o error. Uso actual: el error del formulario de contacto |

Nunca dos acentos compitiendo en el mismo bloque. El violeta indica acción, el cian
indica información: no se intercambian.

### Los tres esquemas

| | Regla | Tradeoff |
| --- | --- | --- |
| **A · Marca primero** (recomendado) | Un gradiente por vista, solo en identidad (wordmark + nombre del hero). Títulos en `text` plano, palabras clave en `primary` sólido, estados en `secondary`. | Jerarquía impecable; menos color en pantalla |
| **B · Todo degradado** | El mismo gradiente en identidad, badge, CTA y todos los H2. | Más vivo y uniforme; el gradiente deja de ser señal de marca y compite con el contenido |
| **C · Plano total** | Cero gradientes. Wordmark en `primary` sólido, nombre en `text`, palabra clave en `primary`. | Máxima sobriedad y contraste AA trivial; pierde el guiño de identidad |

## Self-check

Every artboard under `design/` must use only these colors and the Inter/system
sans stack, and must respect `prefers-reduced-motion`. No artboard may load an
external URL, font, image, or script.

Además, por cada artboard: **contar los elementos con gradiente** (debe ser ≤ 2, y solo
si son el wordmark y el nombre del hero) y confirmar que ningún texto mezcla plano y
degradado dentro de la misma frase.
