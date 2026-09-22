import { useEffect, useState } from 'react'

/**
 * Chama `cb` uma vez, depois que o hero foi pintado. Serve para adiar o que não
 * pode competir com o LCP (script da Meta, fotos logo abaixo da dobra).
 *
 * - Chrome/Android: espera a primeira entrada `largest-contentful-paint`, que
 *   só é emitida quando o frame foi de fato apresentado na tela.
 * - Safari/iOS (sem LCP na PerformanceObserver): dois requestAnimationFrame
 *   (frame do React pintado) + 1 s de margem.
 * - Em ambos, fallback por tempo para nunca deixar de disparar.
 *
 * Retorna uma função que cancela a espera.
 */
export function afterFirstPaint(cb: () => void): () => void {
  let done = false
  const timers: number[] = []
  let po: PerformanceObserver | undefined

  const go = () => {
    if (done) return
    done = true
    po?.disconnect()
    cb()
  }

  const supportsLcp =
    typeof PerformanceObserver !== 'undefined' &&
    (PerformanceObserver.supportedEntryTypes ?? []).includes('largest-contentful-paint')

  if (supportsLcp) {
    po = new PerformanceObserver((list) => {
      if (list.getEntries().length > 0) go()
    })
    po.observe({ type: 'largest-contentful-paint', buffered: true })
    timers.push(window.setTimeout(go, 3000))
  } else {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => timers.push(window.setTimeout(go, 1000))),
    )
  }

  return () => {
    done = true
    po?.disconnect()
    timers.forEach(clearTimeout)
  }
}

/** true a partir do momento em que o hero foi pintado (ver afterFirstPaint). */
export function useAfterFirstPaint(): boolean {
  const [ready, setReady] = useState(false)
  useEffect(() => afterFirstPaint(() => setReady(true)), [])
  return ready
}
