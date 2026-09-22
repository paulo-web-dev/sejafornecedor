import { useEffect, useRef } from 'react'
import { LEGENDA, dimensoes, jpg, srcSetGrande, type FotoEvento } from '../lib/eventos'

type LightboxProps = {
  fotos: FotoEvento[]
  /** Índice da foto aberta; null = fechado. */
  index: number | null
  onChange: (index: number | null) => void
}

const SWIPE_MIN = 50

/**
 * Visualizador em tela cheia com <dialog> nativo (Esc fecha, foco fica preso no modal).
 * A imagem grande só entra no DOM com o modal aberto, então só é baixada quando alguém clica.
 */
export default function Lightbox({ fotos, index, onChange }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const touchX = useRef<number | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const open = index !== null
  const foto = open ? fotos[index] : null

  const fechar = () => onChange(null)

  const go = (delta: number) => {
    if (index === null) return
    onChange((index + delta + fotos.length) % fotos.length)
  }

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    } else {
      if (dialog.open) dialog.close()
      document.documentElement.style.overflow = ''
    }
  }, [open])

  // Os fechamentos da própria UI passam por fechar(); isto cobre qualquer outro close() do <dialog>.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const onClose = () => onChangeRef.current(null)
    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [])

  return (
    <dialog
      ref={ref}
      aria-label={index === null ? undefined : `Foto ${index + 1} de ${fotos.length}`}
      onClick={(e) => {
        // Clique fora da foto e dos controles: o alvo é o próprio <dialog> ou o palco vazio.
        if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.fundo !== undefined) {
          fechar()
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          // Sem o default o <dialog> fecharia sozinho; aqui o estado manda.
          e.preventDefault()
          fechar()
        } else if (e.key === 'ArrowRight') go(1)
        else if (e.key === 'ArrowLeft') go(-1)
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) >= SWIPE_MIN) go(dx < 0 ? 1 : -1)
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-navy-deep/95"
    >
      {foto && index !== null && (
        <>
          <div
            data-fundo
            className="flex h-full flex-col items-center justify-center px-3 py-14 sm:px-16"
          >
            <figure data-fundo className="flex max-h-full flex-col items-center">
              <picture>
                <source
                  type="image/webp"
                  srcSet={srcSetGrande(foto.slug)}
                  sizes="(min-width: 1024px) 90vw, 100vw"
                />
                <img
                  key={foto.slug}
                  src={jpg(foto.slug)}
                  alt={foto.alt}
                  {...dimensoes(foto.slug, 1600)}
                  decoding="async"
                  className="max-h-[calc(100dvh-8rem)] w-auto max-w-full rounded-lg bg-white/5 object-contain"
                />
              </picture>
              <figcaption className="mt-3 text-xs text-white/60 sm:text-sm">
                {LEGENDA} · {index + 1}/{fotos.length}
              </figcaption>
            </figure>
          </div>

          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar"
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white/10 text-2xl leading-none hover:bg-white/20"
          >
            ×
          </button>
          {fotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Foto anterior"
                className="absolute top-1/2 left-2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl hover:bg-white/20 sm:size-12"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próxima foto"
                className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl hover:bg-white/20 sm:size-12"
              >
                ›
              </button>
            </>
          )}
        </>
      )}
    </dialog>
  )
}
