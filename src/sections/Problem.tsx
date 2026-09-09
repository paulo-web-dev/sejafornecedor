import Section, { SectionTitle } from '../components/Section'

export default function Problem() {
  return (
    <Section id="problema" tone="navy">
      <div className="max-w-3xl">
        <SectionTitle>
          Existe um cliente enorme que sua empresa provavelmente ainda não atende.
        </SectionTitle>

        <div className="mt-6 space-y-5 text-base leading-relaxed text-white/80 sm:text-lg">
          <p>
            Toda prefeitura, câmara, autarquia e órgão público do país compra. Compra material
            de escritório, uniforme, alimentação, manutenção, software, obra, serviço de limpeza,
            consultoria, equipamento, gráfica, transporte. Compra o ano inteiro, por obrigação
            legal, com contrato assinado e pagamento previsto em orçamento.
          </p>
          <p className="text-lg font-semibold text-white sm:text-xl">
            E compra de quem sabe participar.
          </p>
          <p>
            A maioria dos pequenos empresários nunca vendeu para o Poder Público por três
            motivos: acha que licitação é coisa de empresa grande, não sabe onde procurar os
            editais, ou tentou uma vez, errou um documento e desistiu.
          </p>
          <p>
            Nenhum dos três é um problema de tamanho de empresa. Todos são problemas de{' '}
            <span className="font-semibold text-cyan">método</span>.
          </p>
        </div>
      </div>
    </Section>
  )
}
