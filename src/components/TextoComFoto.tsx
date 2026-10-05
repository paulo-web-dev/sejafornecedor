import type { ReactNode } from 'react'
import { useAfterFirstPaint } from '../lib/afterPaint'
import { useMediaQuery } from '../lib/useMediaQuery'
import { LEGENDA, dimensoes, jpg, srcSetGrande, temFoto } from '../lib/eventos'

/**
 * Texto à esquerda e foto de evento à direita, a partir de lg. Abaixo disso só o texto,
 * como se o componente não existisse: a foto nem entra no DOM (não é display:none),
 * então o celular não baixa nada.
 *
 * No desktop a foto ainda espera a primeira pintura, como a faixa de fotos: a seção pode
 * cair dentro da margem do loading="lazy" e competir com o LCP. A caixa já ocupa a coluna
 * inteira antes disso, então a troca não gera layout shift.
 *
 * Se o original não existir em src/assets/fotos/eventos/, fica só o texto.
 */
export default function TextoComFoto({
  slug,
  alt,
  children,
}: {
  slug: string
  alt: string
  children: ReactNode
}) {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const pronto = useAfterFirstPaint()

  if (!temFoto(slug)) return <>{children}</>

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
      <div>{children}</div>
      {desktop && (
        <figure className="relative min-h-80 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {pronto && (
            <picture>
              <source
                type="image/webp"
                srcSet={srcSetGrande(slug)}
                sizes="(min-width: 1216px) 460px, 38vw"
              />
              <img
                src={jpg(slug)}
                alt={alt}
                {...dimensoes(slug)}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
            </picture>
          )}
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/80 to-transparent px-4 pt-16 pb-3 text-xs leading-tight text-white/75">
            {LEGENDA}
          </figcaption>
        </figure>
      )}
    </div>
  )
}
