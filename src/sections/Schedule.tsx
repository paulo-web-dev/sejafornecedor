import { useState } from 'react'
import Section, { SectionTitle } from '../components/Section'
import SectionCta from '../components/SectionCta'
import { useMediaQuery } from '../lib/useMediaQuery'

type Module = { number: number; title: string; body: string }
type Day = { label: string; theme: string; modules: Module[] }

const DAYS: Day[] = [
  {
    label: 'SÁBADO 01 — 07 de novembro',
    theme: 'Entrando no mercado governamental',
    modules: [
      {
        number: 1,
        title: 'Como o Governo compra',
        body: 'Funcionamento das compras públicas e a lógica da Lei nº 14.133/2021. Quem compra dentro dos órgãos, principais modalidades, oportunidades reservadas a micro e pequenas empresas e como identificar os mercados compatíveis com a sua atividade.',
      },
      {
        number: 2,
        title: 'Encontrando oportunidades',
        body: 'Onde procurar editais, como ler e interpretar os requisitos, identificação de riscos e avaliação de viabilidade antes de decidir participar.',
      },
      {
        number: 3,
        title: 'Credenciamento e sistemas oficiais',
        body: 'Oficina prática no Compras.gov.br: credenciamento, cadastro da empresa e documentação. Passo a passo com demonstração de tela.',
      },
    ],
  },
  {
    label: 'SÁBADO 02 — 14 de novembro',
    theme: 'Como participar e vencer',
    modules: [
      {
        number: 4,
        title: 'Construção da proposta',
        body: 'Composição da proposta, documentação exigida, formação de preço, competitividade e os erros que eliminam fornecedores antes mesmo da disputa.',
      },
      {
        number: 5,
        title: 'Pregão e dispensa eletrônica',
        body: 'Funcionamento da disputa, envio de propostas, fase de lances e estratégia de comportamento no certame. Com simulação prática de um pregão eletrônico ao vivo.',
      },
      {
        number: 6,
        title: 'Habilitação e contrato',
        body: 'Certidões, regularidade fiscal, habilitação, assinatura, execução contratual, obrigações do fornecedor e relacionamento com o órgão contratante.',
      },
    ],
  },
]

export default function Schedule() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <Section id="programacao" tone="navy" className="scroll-mt-4">
      <SectionTitle>Programa completo — 6 módulos</SectionTitle>

      <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-2 lg:gap-6">
        {DAYS.map((day) => (
          <DayCard key={day.label} day={day} expanded={isDesktop} />
        ))}
      </div>
      <SectionCta variant="outline" />
    </Section>
  )
}

function DayCard({ day, expanded }: { day: Day; expanded: boolean }) {
  // Índice do módulo aberto no accordion (mobile). Primeiro aberto por padrão.
  const [open, setOpen] = useState(0)

  return (
    <article className="glass rounded-2xl p-5 sm:p-7">
      <header className="border-b border-white/10 pb-4 sm:pb-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-cyan uppercase sm:text-sm">
          {day.label}
        </p>
        <h3 className="mt-1.5 text-lg leading-snug font-bold sm:text-xl">{day.theme}</h3>
      </header>

      <ul className="divide-y divide-white/10">
        {day.modules.map((m, i) => {
          const isOpen = expanded || open === i
          const panelId = `modulo-${m.number}`
          return (
            <li key={m.number} className="py-4 sm:py-5">
              {expanded ? (
                <ModuleHeading m={m} />
              ) : (
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <ModuleHeading m={m} />
                  <ChevronIcon
                    className={`ml-auto shrink-0 text-cyan transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              )}

              {/* Transição CSS pura via grid-template-rows */}
              <div
                id={panelId}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="pt-3 pl-11 text-sm leading-relaxed text-white/75 sm:text-base">
                    {m.body}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

function ModuleHeading({ m }: { m: Module }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-cyan/15 text-sm font-bold text-cyan">
        {m.number}
      </span>
      <span className="text-base leading-snug font-semibold sm:text-lg">
        <span className="text-white/60">Módulo {m.number} — </span>
        {m.title}
      </span>
    </span>
  )
}

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
