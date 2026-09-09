import Section, { SectionTitle } from '../components/Section'

type Item = { q: string; a: string; pending?: boolean }

const ITEMS: Item[] = [
  {
    q: 'Preciso ter experiência com licitação?',
    a: 'Não. O curso foi construído justamente para quem nunca participou.',
  },
  {
    q: 'Minha empresa é muito pequena. Vale a pena?',
    a: 'Micro e pequenas empresas têm tratamento diferenciado nas contratações públicas. É o perfil principal do treinamento.',
  },
  {
    q: 'O Governo compra o que eu vendo?',
    a: 'Provavelmente sim — a Administração compra praticamente tudo. Na mentoria individual você analisa exatamente isso com um professor, olhando o seu produto e o seu mercado.',
  },
  {
    q: 'Como funciona a mentoria?',
    a: 'Uma hora individual com um professor especialista, agendada por você em até 30 dias após o encerramento do curso.',
  },
  {
    q: 'O certificado é reconhecido?',
    a: 'Sim. Certificado de extensão universitária emitido pela Faculdade Unypública, instituição credenciada pelo MEC.',
  },
  {
    q: 'Tem estacionamento?',
    a: '[a confirmar com a operação — pergunta frequente em evento presencial no centro]',
    pending: true,
  },
  {
    q: 'Posso pagar pelo CNPJ da empresa?',
    a: 'Sim, com nota fiscal emitida para a empresa.',
  },
]

export default function Faq() {
  return (
    <Section id="faq" tone="deep">
      <SectionTitle>Perguntas frequentes</SectionTitle>

      <div className="glass mt-8 max-w-3xl divide-y divide-white/10 rounded-2xl px-5 sm:mt-10 sm:px-7">
        {ITEMS.map(({ q, a, pending }, i) => (
          <details key={q} name="faq" open={i === 0} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center gap-4 py-4 text-base leading-snug font-semibold marker:hidden sm:text-lg [&::-webkit-details-marker]:hidden">
              <span className="flex-1">{q}</span>
              <ChevronIcon className="shrink-0 text-cyan transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p
              className={`pb-5 text-sm leading-relaxed sm:text-base ${
                pending ? 'text-gold/90 italic' : 'text-white/75'
              }`}
            >
              {a}
            </p>
          </details>
        ))}
      </div>
    </Section>
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
