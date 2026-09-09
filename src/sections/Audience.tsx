import Section, { SectionTitle } from '../components/Section'

const FOR_YOU = [
  'sua empresa já vende produto ou serviço e está formalizada;',
  'você nunca vendeu para órgão público, ou tentou e travou no caminho;',
  'você quer reduzir a dependência do mercado privado;',
  'você quer abrir uma carteira nova de clientes sem contratar vendedor.',
]

const NOT_FOR_YOU = [
  'você procura um curso jurídico teórico sobre a Lei de Licitações;',
  'sua empresa ainda não está formalizada.',
]

export default function Audience() {
  return (
    <Section id="para-quem" tone="navy">
      <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
        <div className="lg:col-span-3">
          <SectionTitle>Este curso é para você se…</SectionTitle>
          <ul className="mt-6 space-y-3.5">
            {FOR_YOU.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-white/85 sm:text-lg">
                <CheckIcon className="mt-1 shrink-0 text-cyan" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass self-start rounded-2xl p-6 sm:p-7 lg:col-span-2 lg:mt-2">
          <h3 className="text-lg leading-snug font-bold text-white/80 sm:text-xl">
            Não é para você se…
          </h3>
          <ul className="mt-4 space-y-3">
            {NOT_FOR_YOU.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/70 sm:text-base">
                <XIcon className="mt-1 shrink-0 text-white/40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

const svgProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  )
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </svg>
  )
}
