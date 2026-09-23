/**
 * CTA "QUERO MINHA VAGA" ao final de uma seção, levando ao formulário.
 * `solid` (dourado, igual ao do hero) nas seções de oferta e desejo;
 * `outline` (mais discreto) nas informativas, para não repetir o mesmo botão a cada dobra.
 */
export default function SectionCta({
  variant,
  className = '',
}: {
  variant: 'solid' | 'outline'
  className?: string
}) {
  const look =
    variant === 'solid'
      ? 'bg-gold px-8 py-4 text-base text-navy-deep shadow-lg shadow-gold/20 hover:brightness-110'
      : 'border-2 border-gold/70 px-7 py-3.5 text-sm text-gold hover:border-gold hover:bg-gold/10'
  return (
    <div className={`mt-8 sm:mt-10 ${className}`}>
      <a
        href="#formulario"
        className={`inline-flex w-full items-center justify-center rounded-lg font-bold tracking-wide uppercase transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:w-auto ${look}`}
      >
        QUERO MINHA VAGA
      </a>
    </div>
  )
}
