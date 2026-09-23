import Section, { SectionTitle } from '../components/Section'
import SectionCta from '../components/SectionCta'

export default function Objection() {
  return (
    <Section id="objecao" tone="deep">
      <div className="glass max-w-3xl rounded-2xl p-6 sm:p-10">
        <SectionTitle>
          <span className="text-cyan">"</span>Licitação é só para empresa grande.
          <span className="text-cyan">"</span>
        </SectionTitle>

        <div className="mt-6 space-y-5 text-base leading-relaxed text-white/80 sm:text-lg">
          <p>
            É o contrário. A legislação brasileira criou tratamento diferenciado justamente para
            micro e pequenas empresas nas contratações públicas: prioridade em itens de menor
            valor, prazo estendido para regularizar documentação, preferência em situação de
            empate. O pequeno tem vantagens que o grande não tem.
          </p>
          <p>
            O que falta não é porte. É saber onde procurar, como se cadastrar e como não ser
            eliminado por detalhe de documentação.
          </p>
          <p className="font-semibold text-white">
            É exatamente isso que você aprende em dois sábados.
          </p>
        </div>
      </div>
      <SectionCta variant="outline" />
    </Section>
  )
}
