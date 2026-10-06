import type { ReactNode } from 'react'
import Section, { SectionTitle } from '../components/Section'
import SectionCta from '../components/SectionCta'

const TOPICS: { icon: ReactNode; text: string }[] = [
  { icon: <LandmarkIcon />, text: 'O que sua empresa vende e quais órgãos compram isso' },
  { icon: <SearchIcon />, text: 'Em quais portais e modalidades procurar primeiro' },
  { icon: <FileCheckIcon />, text: 'O que falta na sua documentação para ser habilitado' },
  { icon: <FlagIcon />, text: 'Por qual oportunidade faz sentido começar' },
]

type Mentor = { slug: string; name: string; specialty: string; bio: string }

// Fotos em public/img/gen/mentores/ (recorte quadrado gerado por scripts/images.mjs).
// A Juliana usa o mesmo original do bloco 8, com recorte próprio; aqui vale a credencial de mentora.
const MENTORS: Mentor[] = [
  {
    slug: 'mentor-vicente',
    name: 'Vicente Natalino Silva',
    specialty: 'Licitações, contratos e compliance',
    bio: 'Advogado especialista em licitações e contratos administrativos, com mais de 20 anos de experiência em órgãos públicos e empresas privadas. Docente da Unyflex e da pós-graduação da Faculdade Unypública, é autor de treinamentos completos sobre a Lei nº 14.133/2021.',
  },
  {
    slug: 'mentor-fernanda',
    name: 'Fernanda Sibeli Sotelo Teixeira Cersósimo',
    specialty: 'Regulamentos e processos de contratação',
    bio: 'Advogada, mestranda em Administração Pública pela UFGD e especialista em licitações e contratos administrativos. Autora de regulamentos aplicados à Nova Lei de Licitações e credenciada no Sebrae/MS para instrutoria e consultoria na área de compras.',
  },
  {
    slug: 'mentor-juliana',
    name: 'Juliana Fiorese',
    specialty: 'Habilitação e documentação',
    // ⁠ (word joiner) impede a quebra de linha em "PUC-PR".
    bio: 'Graduada em Direito pela PUC⁠-⁠PR, com experiência em Direito Administrativo e especialização em licitações e contratos administrativos. Professora da Unyflex.',
  },
  {
    slug: 'mentor-giovani',
    name: 'Giovani Piovan',
    specialty: 'Pregão eletrônico e Compras.gov.br',
    bio: 'Agente de Contratação e Pregoeiro da Prefeitura Municipal de Formosa do Oeste (PR). Graduado e especialista em Gestão Pública pela Faculdade Unypública, com MBA em Licitações e Contratos à luz da Lei nº 14.133/2021 pela Pólis Civitas. Prática diária de pregão eletrônico pela plataforma Compras.gov.br.',
  },
]

const IMG = '/img/gen/mentores'

export default function Mentoring() {
  return (
    <Section id="mentoria" tone="mid" className="border-y border-white/[0.07]">
      <div className="lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-cyan uppercase sm:text-sm">
            INCLUSO NA SUA INSCRIÇÃO
          </p>
          <SectionTitle className="mt-3">
            1 hora de mentoria individual com quem ensina os municípios a montar a licitação.
          </SectionTitle>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-white/80 sm:text-lg">
            <p>
              A Unyflex forma os agentes de contratação, pregoeiros e procuradores que conduzem as
              compras públicas pelo Brasil. Quem ensina a montar o edital sabe exatamente o que ele
              vai cobrar de quem quer vender.
            </p>
            <p>
              Depois da imersão, você escolhe um dos nossos mentores e marca uma hora só sua. Nessa
              hora o assunto não é a lei. É a sua empresa.
            </p>
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <p className="text-sm font-semibold tracking-wide text-white/60 uppercase">
            O que vocês olham juntos:
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
            {TOPICS.map(({ icon, text }) => (
              <li key={text} className="glass rounded-xl p-4">
                <span className="grid size-9 place-items-center rounded-lg bg-cyan/15 text-cyan">
                  {icon}
                </span>
                <p className="mt-3 text-sm leading-snug font-medium text-white/90">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mt-12 text-xl leading-snug font-bold sm:mt-16 sm:text-2xl">
        Escolha com quem você quer conversar
      </h3>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {MENTORS.map((m) => (
          <li
            key={m.slug}
            className="glass overflow-hidden rounded-2xl p-5 sm:flex sm:flex-col sm:p-0"
          >
            {/* No celular, foto pequena ao lado do nome (como nos professores); de sm para cima, no topo. */}
            <div className="flex items-center gap-4 sm:block">
              <picture className="block size-24 shrink-0 sm:size-auto">
                <source
                  type="image/webp"
                  srcSet={`${IMG}/${m.slug}-sq-240.webp 240w, ${IMG}/${m.slug}-sq-480.webp 480w`}
                  sizes="(min-width: 1216px) 270px, (min-width: 1024px) 22vw, (min-width: 640px) 45vw, 96px"
                />
                <img
                  src={`${IMG}/${m.slug}-sq-480.jpg`}
                  alt={`Foto de ${m.name}`}
                  width={480}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square size-full rounded-xl bg-white/5 object-cover sm:rounded-none"
                />
              </picture>
              <div className="sm:px-5 sm:pt-5">
                <h4 className="text-lg leading-snug font-bold text-balance">{m.name}</h4>
                <p className="mt-1 text-sm leading-snug font-semibold text-gold">{m.specialty}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:mt-3 sm:px-5 sm:pb-5">
              {m.bio}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm leading-relaxed text-white/60">
        Mentoria individual, 1 hora, agendada por você em até 30 dias depois do curso.
      </p>

      <p className="mt-10 border-l-4 border-gold pl-5 text-xl leading-snug font-bold text-balance text-gold sm:text-2xl">
        Você não sai com uma apostila. Sai com um plano para a sua empresa.
      </p>

      <SectionCta variant="solid" />
    </Section>
  )
}

const svgProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

function LandmarkIcon() {
  return (
    <svg {...svgProps}>
      <path d="M3 21h18M4 10h16M12 3l8 5H4z" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg {...svgProps}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  )
}

function FileCheckIcon() {
  return (
    <svg {...svgProps}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="m9 14.5 2 2 4-4" />
    </svg>
  )
}

function FlagIcon() {
  return (
    <svg {...svgProps}>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </svg>
  )
}
