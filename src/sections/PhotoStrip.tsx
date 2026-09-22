import { useAfterFirstPaint } from '../lib/afterPaint'
import { FAIXA, dimensoes, fotoPorSlug, jpg, srcSetPequeno } from '../lib/eventos'

const CAIXA = 'h-32 rounded-lg bg-white/5 sm:h-44 sm:rounded-xl'

/**
 * Faixa horizontal de fotos em rolagem contínua, logo após a barra de autoridade.
 * CSS puro: a trilha tem a lista duas vezes e anda -50%. Pausa no hover.
 * Com prefers-reduced-motion a animação some, a cópia some e a faixa vira rolagem manual.
 *
 * A faixa fica logo abaixo da dobra, dentro da margem do loading="lazy" do Chrome: sem
 * adiar, as 8 fotos baixariam junto com o hero e disputariam banda com o LCP. Por isso
 * os <img> só entram depois da primeira pintura; até lá, caixas do mesmo tamanho (sem CLS).
 */
export default function PhotoStrip() {
  const pronto = useAfterFirstPaint()

  return (
    <section
      aria-label="Fotos de eventos Unyflex"
      className="group overflow-hidden bg-navy-deep py-3 motion-reduce:overflow-x-auto sm:py-4"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copia) => (
          <ul
            key={copia}
            className={`flex ${copia ? 'motion-reduce:hidden' : ''}`}
            aria-hidden={copia ? true : undefined}
          >
            {FAIXA.map((slug) => (
              <li key={slug} className="pr-2 sm:pr-3">
                {pronto ? (
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={srcSetPequeno(slug)}
                      sizes="(min-width: 640px) 270px, 200px"
                    />
                    <img
                      src={jpg(slug)}
                      alt={copia ? '' : fotoPorSlug(slug).alt}
                      {...dimensoes(slug)}
                      loading="lazy"
                      decoding="async"
                      className={`w-auto object-cover ${CAIXA}`}
                    />
                  </picture>
                ) : (
                  <span
                    className={`block ${CAIXA}`}
                    style={{ aspectRatio: `${dimensoes(slug).width} / ${dimensoes(slug).height}` }}
                  />
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
