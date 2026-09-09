import type { ReactNode } from 'react'
import Section, { SectionTitle } from '../components/Section'

const INCLUDES = [
  '16 horas de imersão presencial',
  'coffee breaks e almoço nos 2 dias',
  'mentoria individual de 1 hora',
  'curso complementar online',
  'material didático',
  'certificado de extensão pela Faculdade Unypública',
]

const PAYMENT = [
  'Até 6x sem juros no cartão',
  '3x com 50% de entrada e o restante no boleto',
  '10% de desconto à vista no Pix',
]

export default function Offer() {
  return (
    <Section id="oferta" tone="deep" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/3 -z-10 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <SectionTitle>Investimento</SectionTitle>

      <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-5 lg:gap-6">
        {/* PRESENCIAL — oferta principal */}
        <article className="glass relative flex flex-col rounded-2xl border-gold/50 p-6 shadow-[0_0_60px_-20px] shadow-gold/40 sm:p-8 lg:col-span-3">
          <Tag tone="gold">PRESENCIAL — oferta principal</Tag>

          <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-base text-white/70 sm:text-lg">De</span>
            <s className="text-xl text-white/50 decoration-gold/80 decoration-2 sm:text-2xl">
              R$ 1.790
            </s>
            <span className="text-base text-white/70 sm:text-lg">por</span>
            <strong className="text-4xl leading-none font-bold text-gold sm:text-5xl">
              R$ 1.590
            </strong>
          </p>
          <p className="mt-2 text-sm text-white/70 italic">
            Lote de lançamento — vagas limitadas a 40 participantes
          </p>

          <p className="mt-6 text-sm font-semibold tracking-wide text-white/60 uppercase">Inclui</p>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-snug sm:text-base">
                <CheckIcon className="mt-0.5 shrink-0 text-cyan" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm font-semibold tracking-wide text-white/60 uppercase">
            Condições de pagamento
          </p>
          <ul className="mt-3 space-y-2">
            {PAYMENT.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-white/85 sm:text-base">
                <CardIcon className="mt-0.5 shrink-0 text-cyan" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a
            href="#formulario"
            className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-gold px-8 py-4 text-base font-bold tracking-wide text-navy-deep uppercase shadow-lg shadow-gold/20 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            GARANTIR MINHA VAGA
          </a>
        </article>

        {/* PACOTE EMPRESA */}
        <article className="glass flex flex-col rounded-2xl p-6 sm:p-8 lg:col-span-2">
          <Tag tone="cyan">PACOTE EMPRESA</Tag>

          <p className="mt-5 text-lg text-white/80">
            2 participantes por{' '}
            <strong className="block text-3xl leading-tight font-bold text-white sm:text-4xl">
              R$ 2.490
            </strong>
          </p>
          <p className="mt-2 text-sm text-white/70 italic">
            Exclusivo para inscritos vinculados ao mesmo CNPJ.
          </p>

          <p className="mt-5 rounded-lg border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm font-semibold sm:text-base">
            3º participante: <span className="text-cyan">+ R$ 990</span>
          </p>

          <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
            Traga seu sócio ou o responsável pelo comercial. Quem estrutura a área de licitações
            da empresa junto sai da imersão pronto para começar.
          </p>
        </article>

        {/* ONLINE AO VIVO */}
        <article className="glass flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-7 lg:col-span-5">
          <div className="shrink-0 sm:w-56">
            <Tag tone="muted">ONLINE AO VIVO</Tag>
            <p className="mt-3 text-2xl leading-none font-bold sm:text-3xl">R$ 990</p>
            <p className="mt-2 text-sm text-white/70 italic">Para quem é de fora de Curitiba.</p>
          </div>
          <p className="text-sm leading-relaxed text-white/75 sm:text-base">
            Transmissão ao vivo dos dois sábados, com interação pelo chat e participação nas
            simulações. Inclui mentoria individual de 1 hora, curso complementar e certificado.
            Não inclui a experiência presencial, o networking e as refeições.
          </p>
        </article>
      </div>
    </Section>
  )
}

function Tag({ tone, children }: { tone: 'gold' | 'cyan' | 'muted'; children: ReactNode }) {
  const styles = {
    gold: 'bg-gold/15 text-gold',
    cyan: 'bg-cyan/15 text-cyan',
    muted: 'bg-white/10 text-white/70',
  }[tone]
  return (
    <span
      className={`inline-block self-start rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase ${styles}`}
    >
      {children}
    </span>
  )
}

const svgProps = {
  width: 18,
  height: 18,
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

function CardIcon({ className = '' }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14h3" />
    </svg>
  )
}
