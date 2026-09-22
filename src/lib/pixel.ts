import { afterFirstPaint } from './afterPaint'

declare global {
  interface Window {
    /** Definida pelo stub do Meta Pixel no index.html. Idempotente. */
    __loadMetaPixel?: () => void
  }
}

/**
 * Injeta o fbevents.js só depois que o hero foi pintado (ver afterFirstPaint),
 * para que os ~1,5 s de CPU do script da Meta (num celular médio) não atrasem o LCP.
 *
 * Os eventos init + PageView já estão na fila do stub e disparam quando o
 * script chega.
 */
export function loadMetaPixelAfterPaint(): () => void {
  return afterFirstPaint(() => {
    const load = () => window.__loadMetaPixel?.()
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(load, { timeout: 2000 })
    } else {
      setTimeout(load, 0)
    }
  })
}
