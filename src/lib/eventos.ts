// Fotos de eventos anteriores da Unyflex (originais em src/assets/fotos/eventos/).
// As versões otimizadas e as dimensões vêm de scripts/images.mjs.
import dims from '../generated/eventos.json'

export type Categoria = 'evento' | 'aula' | 'experiencia' | 'turmas'

export type FotoEvento = { slug: string; categoria: Categoria; alt: string }

export const CATEGORIAS: { id: Categoria; label: string }[] = [
  { id: 'evento', label: 'Evento' },
  { id: 'aula', label: 'Em aula' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'turmas', label: 'Turmas' },
]

/** Legenda de todas as fotos. São de eventos anteriores, nunca deste programa. */
export const LEGENDA = 'Eventos Unyflex em Curitiba'

// A ordem é a da galeria em "Todas": as 12 primeiras aparecem antes do "Ver mais fotos".
export const FOTOS: FotoEvento[] = [
  {
    slug: 'evento-cheio',
    categoria: 'evento',
    alt: 'Plateia lotada assistindo a uma apresentação no telão',
  },
  { slug: 'IMG_6740', categoria: 'aula', alt: 'Professor de terno explicando um conteúdo à turma' },
  {
    slug: 'coffee-break',
    categoria: 'experiencia',
    alt: 'Mesa de coffee break com salgados e folhagens',
  },
  {
    slug: 'grupo-participantes-02',
    categoria: 'turmas',
    alt: 'Foto em grupo de participantes em frente ao telão',
  },
  {
    slug: 'palestrante-no-palco',
    categoria: 'aula',
    alt: 'Palestrante falando ao microfone no palco',
  },
  { slug: 'networking', categoria: 'experiencia', alt: 'Participantes conversando no intervalo' },
  {
    slug: 'auditorio-01',
    categoria: 'evento',
    alt: 'Participantes em poltronas de auditório acompanhando um palestrante',
  },
  { slug: 'IMG_6804', categoria: 'aula', alt: 'Participantes com crachá atentas à aula' },
  {
    slug: 'garcom-servindo-almoco',
    categoria: 'experiencia',
    alt: 'Garçom servindo petiscos aos participantes',
  },
  {
    slug: 'IMG_6831',
    categoria: 'turmas',
    alt: 'Salão com participantes em mesas redondas e telão ao fundo',
  },
  {
    slug: 'palestrante-e-plateia',
    categoria: 'aula',
    alt: 'Palestrante gesticulando diante de um salão cheio de mesas redondas',
  },
  {
    slug: 'grupo-oficial-plenario-01',
    categoria: 'turmas',
    alt: 'Foto oficial da turma reunida em um plenário',
  },
  {
    slug: 'IMG_5635',
    categoria: 'evento',
    alt: 'Palestrante de terno claro falando ao microfone no palco',
  },
  {
    slug: 'participantes-mesa-03',
    categoria: 'aula',
    alt: 'Participantes discutindo em volta de uma mesa com notebook',
  },
  {
    slug: 'IMG_5948',
    categoria: 'experiencia',
    alt: 'Participantes com crachá sentados às mesas redondas do salão',
  },
  {
    slug: 'IMG_6862',
    categoria: 'turmas',
    alt: 'Palestrante caminhando entre as mesas do salão cheio',
  },
  {
    slug: 'IMG_5669',
    categoria: 'aula',
    alt: 'Palestrante apontando para a plateia enquanto fala ao microfone',
  },
  {
    slug: 'IMG_6002',
    categoria: 'experiencia',
    alt: 'Salão cheio de participantes em mesas redondas diante do telão',
  },
  { slug: 'aluno-em-aula', categoria: 'aula', alt: 'Participante com crachá acompanhando a aula' },
  {
    slug: 'IMG_5994',
    categoria: 'aula',
    alt: 'Palestrante diante de um salão cheio de participantes',
  },
  {
    slug: 'IMG_6064',
    categoria: 'experiencia',
    alt: 'Participante com crachá sentado à mesa durante o evento',
  },
  {
    slug: 'participantes-atentos-01',
    categoria: 'aula',
    alt: 'Duas participantes acompanhando a aula em uma mesa com notebook',
  },
  {
    slug: 'plateia-05',
    categoria: 'aula',
    alt: 'Turma em sala de aula assistindo a uma apresentação no telão',
  },
  {
    slug: 'alunos-em-aula',
    categoria: 'aula',
    alt: 'Participantes sentados à mesa acompanhando a aula',
  },
  { slug: 'IMG_5700', categoria: 'aula', alt: 'Participantes atentos sentados às mesas do salão' },
  {
    slug: 'IMG_6823',
    categoria: 'aula',
    alt: 'Participantes sentados às mesas acompanhando a aula',
  },
]

/** Faixa de fotos abaixo da barra de autoridade: Evento + Turmas (só há 7) e uma panorâmica de sala cheia. */
export const FAIXA: string[] = [
  'evento-cheio',
  'grupo-participantes-02',
  'auditorio-01',
  'IMG_6831',
  'IMG_5635',
  'grupo-oficial-plenario-01',
  'IMG_5994',
  'IMG_6862',
]

const BASE = '/img/gen/eventos'

/** Largura e altura para o <img>, na proporção do original (evita layout shift). */
export function dimensoes(slug: string, width = 800): { width: number; height: number } {
  const [w, h] = (dims as Record<string, number[]>)[slug]
  return { width, height: Math.round((width * h) / w) }
}

/** srcset WebP das versões pequenas (grid e faixa). */
export const srcSetPequeno = (slug: string) =>
  `${BASE}/${slug}-400.webp 400w, ${BASE}/${slug}-800.webp 800w`

/** srcset WebP para o lightbox. */
export const srcSetGrande = (slug: string) =>
  `${BASE}/${slug}-800.webp 800w, ${BASE}/${slug}-1600.webp 1600w`

/** Fallback JPG para navegadores sem WebP. */
export const jpg = (slug: string) => `${BASE}/${slug}-800.jpg`

export const fotoPorSlug = (slug: string) => FOTOS.find((f) => f.slug === slug)!
