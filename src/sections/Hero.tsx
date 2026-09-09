import type { ReactNode } from 'react'

const BADGES: { icon: ReactNode; label: string }[] = [
  { icon: <ClockIcon />, label: '16 horas presenciais' },
  { icon: <ChatIcon />, label: 'Mentoria individual de 1 hora' },
  { icon: <AwardIcon />, label: 'Certificado de extensão universitária' },
  { icon: <SeatsIcon />, label: '40 vagas' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-svh items-end overflow-hidden sm:items-center"
    >
      {/* Foto real da sala da Unyflex, escurecida */}
      <picture className="absolute inset-0 -z-20">
        <source
          type="image/webp"
          srcSet="/img/gen/hero-960.webp 960w, /img/gen/hero-1440.webp 1440w, /img/gen/hero-1920.webp 1920w"
          sizes="100vw"
        />
        <img
          src="/img/gen/hero-1920.jpg"
          alt="Plateia e palco de uma imersão da Unyflex"
          width={1920}
          height={1280}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-navy-deep/45 via-navy-deep/70 to-navy-deep"
      />

      <div className="mx-auto w-full max-w-6xl px-5 pt-24 pb-12 sm:px-8 sm:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-cyan uppercase sm:text-sm">
            IMERSÃO PRESENCIAL · 07 E 14 DE NOVEMBRO · CURITIBA
          </p>

          <h1 className="mt-4 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">
            Já capacitamos mais de 40 mil servidores públicos a comprar.{' '}
            <span className="text-gold">Agora vamos ensinar sua empresa a vender.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Dois sábados de imersão prática para transformar prefeituras, câmaras e órgãos
            públicos em clientes do seu negócio. Com quem escreve as regras do outro lado da
            mesa.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {BADGES.map(({ icon, label }) => (
              <li
                key={label}
                className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-white/90 sm:text-sm"
              >
                <span className="text-cyan">{icon}</span>
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-start gap-4">
            <a
              href="#formulario"
              className="inline-flex w-full items-center justify-center rounded-lg bg-gold px-8 py-4 text-base font-bold tracking-wide text-navy-deep uppercase shadow-lg shadow-gold/20 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:w-auto"
            >
              QUERO MINHA VAGA
            </a>
            <a
              href="#programacao"
              className="text-sm text-white/70 underline-offset-4 transition hover:text-cyan hover:underline"
            >
              Ver programação completa ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Ícones simples, inline (sem lib) */
const svgProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

function ClockIcon() {
  return (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg {...svgProps}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.2A8 8 0 1 1 21 12Z" />
    </svg>
  )
}

function AwardIcon() {
  return (
    <svg {...svgProps}>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" />
    </svg>
  )
}

function SeatsIcon() {
  return (
    <svg {...svgProps}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
      <path d="M18 14a5.5 5.5 0 0 1 3.5 6" />
    </svg>
  )
}
