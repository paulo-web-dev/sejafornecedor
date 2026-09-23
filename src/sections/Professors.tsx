import Section, { SectionTitle } from '../components/Section'
import SectionCta from '../components/SectionCta'

type Professor = {
  slug: string
  name: string
  role: string
  bio: string
  /** Posição do rosto dentro do quadrado, para object-position. */
  focus: string
}

const PROFESSORS: Professor[] = [
  {
    slug: 'prof-rafael',
    name: 'Rafael Costa',
    role: 'Procurador-Chefe da Procuradoria Consultiva de Obras e Serviços de Engenharia — PGE/PR',
    bio: 'Há mais de oito anos na Procuradoria-Geral do Estado do Paraná. Doutorando e Mestre em Direito pela UFPR, especialista em Direito Administrativo pela PUC Minas e bacharel pela UFMG. Presidiu os Grupos Especiais de Trabalho que elaboraram o regulamento paranaense da Lei nº 14.133/2021 para obras, serviços de engenharia, convênios e termos de cooperação. É membro fixo da comissão de padronização de minutas de editais da PGE/PR. Autor de "Convênios Administrativos: a boa-fé entre os entes públicos" e coautor de "Contrato Público Built to Suit", ambos pela Editora Fórum.',
    focus: '50% 35%',
  },
  {
    slug: 'prof-jose-augusto',
    name: 'José Augusto',
    role: 'Procurador da Câmara Municipal de Curitiba',
    bio: 'Atua na área de licitações e contratos administrativos. Pós-graduado em Direito Público, Direito do Trabalho e Direito Previdenciário pela Universidade Anhanguera-Uniderp, com graduação em Direito pela Universidade de Cuiabá.',
    focus: '50% 35%',
  },
  {
    slug: 'prof-juliana',
    name: 'Juliana Fiorese',
    role: 'Especialista em licitações e contratos administrativos',
    bio: 'Graduada em Direito pela Pontifícia Universidade Católica do Paraná, com experiência na área de Direito Administrativo.',
    focus: '50% 35%',
  },
]

export default function Professors() {
  return (
    <Section id="professores" tone="deep">
      <SectionTitle>Quem vai ensinar</SectionTitle>

      <ul className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-3 md:gap-6">
        {PROFESSORS.map((p) => (
          <li key={p.slug} className="glass flex flex-col rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-4 md:block">
              <picture className="block size-20 shrink-0 sm:size-24 md:w-full md:size-auto">
                <source
                  type="image/webp"
                  srcSet={`/img/gen/${p.slug}-sq-320.webp 320w, /img/gen/${p.slug}-sq-640.webp 640w, /img/gen/${p.slug}-sq-800.webp 800w`}
                  sizes="(min-width: 768px) 30vw, 96px"
                />
                <img
                  src={`/img/gen/${p.slug}-sq-640.jpg`}
                  alt={`Foto de ${p.name}`}
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square h-full w-full rounded-xl object-cover"
                  style={{ objectPosition: p.focus }}
                />
              </picture>
              <div className="md:mt-5">
                <h3 className="text-lg leading-snug font-bold sm:text-xl">{p.name}</h3>
                <p className="mt-1 text-sm leading-snug text-cyan italic">{p.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">{p.bio}</p>
          </li>
        ))}
      </ul>
      <SectionCta variant="outline" />
    </Section>
  )
}
