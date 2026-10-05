// Gera versões otimizadas das fotos de src/assets/fotos em public/img/gen (gitignored).
// Roda automaticamente antes de `dev` e `build`; pula arquivos já atualizados.
// As fotos de src/assets/fotos/eventos/ (galeria e faixa de fotos) vão para public/img/gen/eventos/,
// e as dimensões delas ficam em src/generated/eventos.json para o width/height dos <img>.
// As de src/assets/fotos/mentores/ (bloco 8B) saem só em recorte quadrado em public/img/gen/mentores/.
import { readdir, stat, mkdir, unlink, writeFile } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const SRC = 'src/assets/fotos'
const OUT = 'public/img/gen'
const WEBP = { quality: 78 }
const JPEG = { quality: 80, mozjpeg: true }

// Larguras por imagem. Default: uma variante WebP + JPG de até 1600px.
// Os professores aparecem só no recorte 1:1 (ver SQUARE), então não geram versão retangular.
const SO_QUADRADO = { widths: [], jpgFallback: null }
const VARIANTS = {
  hero: { widths: [960, 1440, 1920], jpgFallback: 1920 },
  'prof-rafael': SO_QUADRADO,
  'prof-jose-augusto': SO_QUADRADO,
  'prof-juliana': SO_QUADRADO,
}
const DEFAULT = { widths: [1600], jpgFallback: null }

// Eventos: 400/800 para o grid e a faixa de fotos, 1600 só para o lightbox.
const EVENTOS_SRC = join(SRC, 'eventos')
const EVENTOS_OUT = join(OUT, 'eventos')
const EVENTOS = { widths: [400, 800, 1600], jpgFallback: 800 }
const EVENTOS_MANIFEST = 'src/generated/eventos.json'

// Recorte quadrado (1:1) com enquadramento no rosto.
// focus: centro do rosto em fração da largura/altura; zoom: lado do quadrado em fração da largura.
const SQUARE = {
  'prof-rafael': { focus: [0.5, 0.22], zoom: 0.85 },
  'prof-jose-augusto': { focus: [0.5, 0.2], zoom: 0.9 },
  'prof-juliana': { focus: [0.47, 0.26], zoom: 0.8 },
}
const SQUARE_WIDTHS = [320, 640, 800]
const SQUARE_JPG = 640

// Mentores: card de ~230 px no desktop (4 colunas) e ~150 px no celular (2 colunas), então 480
// cobre DPR 2–3. O original do Giovani tem 400 px e é ampliado para 480 (diferença imperceptível).
// A Juliana reaproveita o original dos professores (prof-juliana.jpg), com recorte mais fechado
// para o rosto ficar do mesmo tamanho que o dos outros mentores.
const MENTORES_SRC = join(SRC, 'mentores')
const MENTORES_OUT = join(OUT, 'mentores')
const MENTORES_EXTRA = { 'mentor-juliana': join(SRC, 'prof-juliana.jpg') }
const MENTORES_SQUARE = {
  'mentor-vicente': { focus: [0.5, 0.2], zoom: 0.95 },
  'mentor-juliana': { focus: [0.47, 0.24], zoom: 0.5 },
  'mentor-fernanda': { focus: [0.53, 0.27], zoom: 0.7 },
  'mentor-giovani': { focus: [0.46, 0.36], zoom: 1 },
}
const MENTORES_WIDTHS = [240, 480]
const MENTORES_JPG = 480
// Posição vertical do rosto dentro do quadrado (0 = topo).
const FACE_Y = 0.36

async function squareCrop(img, meta, { focus, zoom }) {
  const side = Math.round(meta.width * zoom)
  const cx = focus[0] * meta.width
  const cy = focus[1] * meta.height
  const left = Math.round(Math.min(Math.max(cx - side / 2, 0), meta.width - side))
  const top = Math.round(Math.min(Math.max(cy - side * FACE_Y, 0), meta.height - side))
  return img.clone().extract({ left, top, width: side, height: side })
}

async function isFresh(src, out) {
  try {
    const [s, o] = await Promise.all([stat(src), stat(out)])
    return o.mtimeMs >= s.mtimeMs
  } catch {
    return false
  }
}

const isPhoto = (f) => /\.(jpe?g|png)$/i.test(f)

// Remove saídas cujo original não existe mais.
async function prune(outDir, files) {
  const sources = new Set(files.map((f) => parse(f).name))
  for (const out of await readdir(outDir, { withFileTypes: true })) {
    if (!out.isFile()) continue
    const base = parse(out.name).name.replace(/-(sq-)?\d+$/, '')
    if (!sources.has(base)) {
      await unlink(join(outDir, out.name))
      console.log('removido', join(outDir, out.name))
    }
  }
}

async function variants(src, outDir, name, cfg) {
  const img = sharp(src).rotate()
  for (const w of cfg.widths) {
    const out = join(outDir, `${name}-${w}.webp`)
    if (await isFresh(src, out)) continue
    await img.clone().resize({ width: w, withoutEnlargement: true }).webp(WEBP).toFile(out)
    console.log('webp', out)
  }
  if (cfg.jpgFallback) {
    const out = join(outDir, `${name}-${cfg.jpgFallback}.jpg`)
    if (!(await isFresh(src, out))) {
      await img.clone().resize({ width: cfg.jpgFallback, withoutEnlargement: true }).jpeg(JPEG).toFile(out)
      console.log('jpg ', out)
    }
  }
}

async function squareSet(src, outDir, name, crop, widths, jpgWidth) {
  const img = sharp(src).rotate()
  const meta = await sharp(src).rotate().metadata()
  for (const w of widths) {
    const out = join(outDir, `${name}-sq-${w}.webp`)
    if (await isFresh(src, out)) continue
    await (await squareCrop(img, meta, crop)).resize({ width: w }).webp(WEBP).toFile(out)
    console.log('webp', out)
  }
  const outJpg = join(outDir, `${name}-sq-${jpgWidth}.jpg`)
  if (!(await isFresh(src, outJpg))) {
    await (await squareCrop(img, meta, crop)).resize({ width: jpgWidth }).jpeg(JPEG).toFile(outJpg)
    console.log('jpg ', outJpg)
  }
}

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter(isPhoto)
await prune(OUT, files)

for (const file of files) {
  const { name } = parse(file)
  const src = join(SRC, file)
  const cfg = VARIANTS[name] ?? DEFAULT
  if (SQUARE[name]) await squareSet(src, OUT, name, SQUARE[name], SQUARE_WIDTHS, SQUARE_JPG)
  await variants(src, OUT, name, cfg)
}

// Eventos
await mkdir(EVENTOS_OUT, { recursive: true })
const eventos = (await readdir(EVENTOS_SRC).catch(() => [])).filter(isPhoto).sort()
await prune(EVENTOS_OUT, eventos)
const manifest = {}
for (const file of eventos) {
  const { name } = parse(file)
  const src = join(EVENTOS_SRC, file)
  await variants(src, EVENTOS_OUT, name, EVENTOS)
  // Dimensões já com a rotação EXIF aplicada.
  const { width, height, orientation } = await sharp(src).metadata()
  manifest[name] = orientation >= 5 ? [height, width] : [width, height]
}
await mkdir(parse(EVENTOS_MANIFEST).dir, { recursive: true })
await writeFile(EVENTOS_MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

// Mentores
await mkdir(MENTORES_OUT, { recursive: true })
const mentores = Object.fromEntries(
  (await readdir(MENTORES_SRC).catch(() => []))
    .filter(isPhoto)
    .map((f) => [parse(f).name, join(MENTORES_SRC, f)]),
)
Object.assign(mentores, MENTORES_EXTRA)
await prune(MENTORES_OUT, Object.keys(mentores))
for (const [name, src] of Object.entries(mentores)) {
  const crop = MENTORES_SQUARE[name]
  if (!crop) {
    console.warn(`aviso: ${src} sem recorte em MENTORES_SQUARE, ignorado`)
    continue
  }
  await squareSet(src, MENTORES_OUT, name, crop, MENTORES_WIDTHS, MENTORES_JPG)
}
