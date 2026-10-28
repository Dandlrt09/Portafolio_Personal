import { useReducedMotion } from 'framer-motion';

/**
 * La política de entrada de secciones y tarjetas, en un solo lugar.
 *
 * Dos reglas, y las dos importan:
 *
 * 1. La animación **se repite** cada vez que el bloque vuelve a entrar en pantalla. Antes cada
 *    sitio llevaba `once: true`, que en framer-motion significa "anima solo la primera vez": al
 *    volver a la sección ya no se reproducía nada hasta recargar la página.
 * 2. Con `prefers-reduced-motion` **no hay animación**: el bloque aparece ya visible. Esto pesa
 *    más ahora que la animación se repite, porque repetir movimiento castiga justo a quien pidió
 *    evitarlo. `index.css` ya hacía esto para las animaciones CSS del hero; esto cubre las de
 *    framer-motion, que quedaban afuera.
 *
 * Vive acá y no repetido en cada componente para que la próxima sección no vuelva a nacer con
 * `once: true` por copiar y pegar.
 */
export const revealProps = ({ reduceMotion = false, delay, duration, from = 20, margin } = {}) => {
    if (reduceMotion) {
        /* `initial: false` hace que el primer render ya sea el estado final: aparece visible, sin
           animar y sin depender de que un observer dispare. */
        return { initial: false, animate: { opacity: 1, y: 0 } };
    }

    return {
        initial: { opacity: 0, y: from },
        whileInView: { opacity: 1, y: 0 },
        viewport: margin ? { once: false, margin } : { once: false },
        /* `duration` solo si el sitio la declaraba: sin ella framer-motion usa su propio default
           para el desplazamiento, y declararla siempre cambiaría el movimiento ya aprobado. */
        transition: duration === undefined ? { delay } : { delay, duration },
    };
};

/** La versión con hook, para cuando el delay no depende del índice dentro de un bucle. */
export const useReveal = (options = {}) => revealProps({ ...options, reduceMotion: useReducedMotion() });
