// Gera versões otimizadas das fotos de src/assets/fotos em public/img/gen (gitignored).
// Roda automaticamente antes de `dev` e `build`; pula arquivos já atualizados.
import { readdir, stat, mkdir, unlink } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const SRC = 'src/assets/fotos'
const OUT = 'public/img/gen'
const WEBP = { quality: 78 }
const JPEG = { quality: 80, mozjpeg: true }

// Larguras por imagem. Default: uma variante WebP + JPG de até 1600px.
const VARIANTS = {
  hero: { widths: [960, 1440, 1920], jpgFallback: 1920 },
}
const DEFAULT = { widths: [1600], jpgFallback: null }
const GALLERY = { widths: [480, 960, 1600], jpgFallback: 960 }

// Recorte quadrado (1:1) com enquadramento no rosto.
// focus: centro do rosto em fração da largura/altura; zoom: lado do quadrado em fração da largura.
const SQUARE = {
  'prof-rafael': { focus: [0.5, 0.22], zoom: 0.85 },
  'prof-jose-augusto': { focus: [0.5, 0.2], zoom: 0.9 },
  'prof-juliana': { focus: [0.47, 0.26], zoom: 0.8 },
}
const SQUARE_WIDTHS = [320, 640, 800]
const SQUARE_JPG = 640
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

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f))

// Remove saídas cujo original não existe mais.
const sources = new Set(files.map((f) => parse(f).name))
for (const out of await readdir(OUT)) {
  const base = parse(out).name.replace(/-(sq-)?\d+$/, '')
  if (!sources.has(base)) {
    await unlink(join(OUT, out))
    console.log('removido', join(OUT, out))
  }
}

for (const file of files) {
  const { name } = parse(file)
  const src = join(SRC, file)
  const cfg = VARIANTS[name] ?? (name.startsWith('galeria-') ? GALLERY : DEFAULT)
  const img = sharp(src).rotate()

  if (SQUARE[name]) {
    const meta = await sharp(src).rotate().metadata()
    for (const w of SQUARE_WIDTHS) {
      const out = join(OUT, `${name}-sq-${w}.webp`)
      if (await isFresh(src, out)) continue
      ;(await squareCrop(img, meta, SQUARE[name])).resize({ width: w }).webp(WEBP).toFile(out)
      console.log('webp', out)
    }
    const outJpg = join(OUT, `${name}-sq-${SQUARE_JPG}.jpg`)
    if (!(await isFresh(src, outJpg))) {
      ;(await squareCrop(img, meta, SQUARE[name])).resize({ width: SQUARE_JPG }).jpeg(JPEG).toFile(outJpg)
      console.log('jpg ', outJpg)
    }
  }

  for (const w of cfg.widths) {
    const out = join(OUT, `${name}-${w}.webp`)
    if (await isFresh(src, out)) continue
    await img.clone().resize({ width: w, withoutEnlargement: true }).webp(WEBP).toFile(out)
    console.log('webp', out)
  }
  if (cfg.jpgFallback) {
    const out = join(OUT, `${name}-${cfg.jpgFallback}.jpg`)
    if (!(await isFresh(src, out))) {
      await img.clone().resize({ width: cfg.jpgFallback, withoutEnlargement: true }).jpeg(JPEG).toFile(out)
      console.log('jpg ', out)
    }
  }
}
