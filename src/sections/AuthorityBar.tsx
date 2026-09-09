const ITEMS = [
  { value: '+40 mil', label: 'servidores públicos capacitados' },
  { value: 'Faculdade Unypública', label: 'instituição credenciada pelo MEC' },
  { value: 'Professores', label: 'procuradores atuantes em licitações e contratos' },
]

export default function AuthorityBar() {
  return (
    <section
      aria-label="Credenciais"
      className="border-y border-white/10 bg-navy-deep"
    >
      <ul className="mx-auto grid max-w-6xl divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
        {ITEMS.map(({ value, label }) => (
          <li
            key={value}
            className="flex flex-col items-center justify-start gap-1 py-5 text-center sm:px-6 sm:py-7"
          >
            <span className="text-xl leading-tight font-bold text-gold sm:text-2xl">
              {value}
            </span>
            <span className="text-sm leading-snug text-white/70 text-balance">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
