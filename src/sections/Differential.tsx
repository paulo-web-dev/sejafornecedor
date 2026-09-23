import Section, { SectionTitle } from '../components/Section'
import SectionCta from '../components/SectionCta'

export default function Differential() {
  return (
    <Section id="diferencial" tone="navy" className="relative isolate overflow-hidden">
      {/* brilho sutil de fundo para destacar o bloco mais importante da página */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 h-[32rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-3xl"
      />

      <div className="max-w-3xl">
        <SectionTitle className="lg:text-5xl">
          Aprenda a vender para o Governo com quem{' '}
          <span className="text-cyan">ensina o Governo a comprar</span>.
        </SectionTitle>

        <div className="mt-6 space-y-5 text-base leading-relaxed text-white/80 sm:text-lg">
          <p>
            A Unyflex e a Faculdade Unypública passaram anos capacitando agentes de contratação,
            pregoeiros, fiscais de contrato e procuradores municipais. Mais de 40 mil servidores
            públicos passaram pelas nossas salas para aprender a comprar dentro da lei.
          </p>
          <p>Agora esse mesmo conhecimento vira do avesso e é entregue a você, empresário.</p>
          <p>
            Você não vai aprender apenas o que fazer para participar de uma licitação. Vai
            entender como a necessidade nasce dentro do órgão, como o edital é montado, quais
            critérios pesam na decisão, o que faz uma proposta ser desclassificada e o que a
            Administração espera de um fornecedor.
          </p>
        </div>

        <p className="mt-8 border-l-4 border-gold pl-5 text-xl leading-snug font-bold text-balance sm:text-2xl">
          Quem conhece o processo por dentro participa em vantagem.
        </p>
      </div>
      <SectionCta variant="solid" />
    </Section>
  )
}
