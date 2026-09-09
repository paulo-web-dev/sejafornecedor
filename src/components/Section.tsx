import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  /** Fundo da seção. `navy` é o padrão; `deep` é o tom mais escuro. */
  tone?: 'navy' | 'deep'
  children: ReactNode
}

/** Bloco de página com largura, padding e fundo padronizados. */
export default function Section({ tone = 'navy', className = '', children, ...rest }: SectionProps) {
  const bg = tone === 'deep' ? 'bg-navy-deep' : 'bg-navy'
  return (
    <section className={`${bg} px-5 py-14 sm:px-8 sm:py-20 ${className}`} {...rest}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`text-2xl leading-tight font-bold text-balance sm:text-3xl lg:text-4xl ${className}`}
    >
      {children}
    </h2>
  )
}
