import { useEffect, useState } from 'react'

/**
 * CTA fixo no rodapé, só em telas pequenas.
 * Aparece depois que o hero sai da tela e some quando o formulário está visível.
 */
export default function StickyCta() {
  const [pastHero, setPastHero] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    const form = document.getElementById('formulario')
    if (!hero || !form) return

    const heroObs = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), {
      threshold: 0,
    })
    const formObs = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), {
      threshold: 0.15,
    })
    heroObs.observe(hero)
    formObs.observe(form)
    return () => {
      heroObs.disconnect()
      formObs.disconnect()
    }
  }, [])

  const visible = pastHero && !formVisible

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-deep/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-out md:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
    >
      <a
        href="#formulario"
        tabIndex={visible ? 0 : -1}
        className="flex w-full items-center justify-center rounded-lg bg-gold px-6 py-3.5 text-sm font-bold tracking-wide text-navy-deep uppercase shadow-lg shadow-gold/20 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        QUERO MINHA VAGA
      </a>
    </div>
  )
}
