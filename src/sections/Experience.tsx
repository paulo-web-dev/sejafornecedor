import { useState } from 'react'
import Section, { SectionTitle } from '../components/Section'
import SectionCta from '../components/SectionCta'
import Lightbox from '../components/Lightbox'
import {
  CATEGORIAS,
  FOTOS,
  LEGENDA,
  dimensoes,
  jpg,
  srcSetPequeno,
  type Categoria,
} from '../lib/eventos'

/** Quantas fotos aparecem antes do "Ver mais fotos". */
const INICIAIS = 12

const FILTROS: { id: Categoria | 'todas'; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  ...CATEGORIAS,
]

export default function Experience() {
  const [filtro, setFiltro] = useState<Categoria | 'todas'>('todas')
  const [expandido, setExpandido] = useState(false)
  const [aberta, setAberta] = useState<number | null>(null)

  const fotos = filtro === 'todas' ? FOTOS : FOTOS.filter((f) => f.categoria === filtro)
  const visiveis = expandido ? fotos : fotos.slice(0, INICIAIS)

  return (
    <Section id="experiencia" tone="navy">
      <div className="max-w-3xl">
        <SectionTitle>Não é uma aula online gravada.</SectionTitle>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-white/80 sm:text-lg">
          <p>
            São dois sábados na nossa sede, no centro de Curitiba, com sala equipada, material
            impresso, coffee break e almoço nos dois dias. E com algo que nenhuma aula gravada
            entrega: uma sala cheia de empresários da região no mesmo momento de decisão que o
            seu.
          </p>
          <p className="font-semibold text-white">Muita coisa acontece no intervalo do café.</p>
        </div>
      </div>

      <div
        role="group"
        aria-label="Filtrar fotos"
        className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:mt-10 sm:flex-wrap sm:px-0"
      >
        {FILTROS.map(({ id, label }) => {
          const ativo = filtro === id
          return (
            <button
              key={id}
              type="button"
              aria-pressed={ativo}
              onClick={() => setFiltro(id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                ativo
                  ? 'border-cyan bg-cyan text-navy-deep'
                  : 'border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:text-white'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      <ul className="mt-5 columns-2 gap-2 sm:gap-3 lg:columns-4">
        {visiveis.map(({ slug, alt }, i) => (
          <li key={slug} className="mb-2 break-inside-avoid sm:mb-3">
            <button
              type="button"
              onClick={() => setAberta(i)}
              aria-label={`Ampliar foto: ${alt}`}
              className="group relative block w-full overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:rounded-2xl"
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={srcSetPequeno(slug)}
                  sizes="(min-width: 1024px) 280px, 50vw"
                />
                <img
                  src={jpg(slug)}
                  alt={alt}
                  {...dimensoes(slug)}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full bg-white/5 transition duration-500 group-hover:scale-[1.03]"
                />
              </picture>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/80 to-transparent px-2.5 pt-6 pb-1.5 text-left text-[10px] leading-tight text-white/75 sm:px-3 sm:pb-2 sm:text-xs">
                {LEGENDA}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {!expandido && fotos.length > INICIAIS && (
        <div className="mt-6 text-center sm:mt-8">
          <button
            type="button"
            onClick={() => setExpandido(true)}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan hover:text-cyan"
          >
            Ver mais fotos
          </button>
        </div>
      )}

      {/* centralizado para alinhar com o "Ver mais fotos" */}
      <SectionCta variant="solid" className="text-center" />

      <Lightbox fotos={fotos} index={aberta} onChange={setAberta} />
    </Section>
  )
}
