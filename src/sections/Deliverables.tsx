import type { ReactNode } from 'react'
import Section, { SectionTitle } from '../components/Section'
import SectionCta from '../components/SectionCta'

const CARDS: { icon: ReactNode; title: string; body: ReactNode }[] = [
  {
    icon: <BuildingIcon />,
    title: 'Imersão presencial de 16 horas',
    body: (
      <>
        Dois sábados completos na nossa sede, no centro de Curitiba. Aula prática, demonstração
        de tela, simulação de pregão eletrônico e análise de casos reais. Com coffee break e
        almoço nos dois dias.
      </>
    ),
  },
  {
    icon: <MentorIcon />,
    title: 'Mentoria individual de 1 hora',
    body: (
      <>
        Depois do curso, uma hora exclusiva entre você e um professor especialista para analisar
        a sua empresa: o que você vende, quais órgãos compram isso, que documentação falta, por
        onde começar. Agendável em até 30 dias após o encerramento.
      </>
    ),
  },
  {
    icon: <PlayIcon />,
    title: 'Curso complementar online',
    body: (
      <>
        "Como o Governo realiza suas compras" — acesso liberado para entender o processo pela
        ótica de quem contrata: planejamento da compra, formação do edital, critérios de decisão
        e responsabilidades dos agentes envolvidos.
      </>
    ),
  },
]

export default function Deliverables() {
  return (
    <Section id="entregas" tone="deep">
      <SectionTitle>O que você leva</SectionTitle>

      <ul className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
        {CARDS.map(({ icon, title, body }, i) => (
          <li key={title} className="glass flex flex-col rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cyan/15 text-cyan">
                {icon}
              </span>
              <span className="text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg leading-snug font-bold text-balance sm:text-xl">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">{body}</p>
          </li>
        ))}
      </ul>
      <SectionCta variant="solid" />
    </Section>
  )
}

const svgProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

function BuildingIcon() {
  return (
    <svg {...svgProps}>
      <path d="M3 21h18" />
      <path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
      <path d="M15 9h3a1 1 0 0 1 1 1v11" />
      <path d="M8 8h2M8 12h2M8 16h2" />
    </svg>
  )
}

function MentorIcon() {
  return (
    <svg {...svgProps}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M15 5.5h5.5v5H17l-2 2v-2h0z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg {...svgProps}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="m10.5 8 4 2.5-4 2.5z" fill="currentColor" stroke="none" />
    </svg>
  )
}
