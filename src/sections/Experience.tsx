import Section, { SectionTitle } from '../components/Section'

type Photo = { slug: string; alt: string; featured?: boolean }

const PHOTOS: Photo[] = [
  { slug: 'galeria-01', alt: 'Palestrante em frente à sala cheia de participantes', featured: true },
  { slug: 'galeria-02', alt: 'Participante com crachá acompanhando a aula no notebook' },
  { slug: 'galeria-03', alt: 'Dois participantes conversando durante o evento' },
  { slug: 'galeria-04', alt: 'Mesa do coffee break com salgados e doces' },
  { slug: 'galeria-05', alt: 'Professora falando ao microfone no palco' },
  { slug: 'galeria-06', alt: 'Professor apresentando no palco com microfone' },
]

export default function Experience() {
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

      <ul className="mt-8 grid grid-cols-2 gap-2 sm:mt-10 sm:gap-3 md:grid-cols-3">
        {PHOTOS.map(({ slug, alt, featured }, i) => {
          const isLast = i === PHOTOS.length - 1
          const span = featured
            ? 'col-span-2 md:row-span-2'
            : isLast
              ? 'col-span-2 md:col-span-1'
              : ''
          const sizes = featured
            ? '(min-width: 1280px) 768px, (min-width: 768px) 66vw, 100vw'
            : isLast
              ? '(min-width: 1280px) 384px, (min-width: 768px) 33vw, 100vw'
              : '(min-width: 1280px) 384px, (min-width: 768px) 33vw, 50vw'
          return (
            <li key={slug} className={`overflow-hidden rounded-xl sm:rounded-2xl ${span}`}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/img/gen/${slug}-480.webp 480w, /img/gen/${slug}-960.webp 960w, /img/gen/${slug}-1600.webp 1600w`}
                  sizes={sizes}
                />
                <img
                  src={`/img/gen/${slug}-960.jpg`}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                />
              </picture>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
