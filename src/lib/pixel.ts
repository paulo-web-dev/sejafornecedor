declare global {
  interface Window {
    /** Definida pelo stub do Meta Pixel no index.html. Idempotente. */
    __loadMetaPixel?: () => void
  }
}

/**
 * Injeta o fbevents.js só depois que o hero foi pintado, para que os ~1,5 s
 * de CPU do script da Meta (num celular médio) não atrasem o LCP.
 *
 * - Chrome/Android: espera a primeira entrada `largest-contentful-paint`, que
 *   só é emitida quando o frame foi de fato apresentado na tela.
 * - Safari/iOS (sem LCP na PerformanceObserver): dois requestAnimationFrame
 *   (frame do React pintado) + 1 s de margem.
 * - Em ambos, fallback por tempo para nunca deixar de carregar o pixel.
 *
 * Os eventos init + PageView já estão na fila do stub e disparam quando o
 * script chega.
 */
export function loadMetaPixelAfterPaint(): void {
  let done = false
  const go = () => {
    if (done) return
    done = true
    const load = () => window.__loadMetaPixel?.()
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(load, { timeout: 2000 })
    } else {
      setTimeout(load, 0)
    }
  }

  const supportsLcp =
    typeof PerformanceObserver !== 'undefined' &&
    (PerformanceObserver.supportedEntryTypes ?? []).includes('largest-contentful-paint')

  if (supportsLcp) {
    const po = new PerformanceObserver((list) => {
      if (list.getEntries().length === 0) return
      po.disconnect()
      go()
    })
    po.observe({ type: 'largest-contentful-paint', buffered: true })
    setTimeout(go, 3000)
  } else {
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(go, 1000)))
  }
}
