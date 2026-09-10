# LP — Seja Fornecedor para o Poder Público

Landing page de conversão para tráfego pago (Meta Ads). Público: micro e pequenos empresários,
maioria em celular, tráfego frio. Objetivo único da página: gerar lead no formulário.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- Sem router (página única, âncoras internas)
- Sem backend próprio: o formulário faz POST para o endpoint definido em `VITE_LEAD_ENDPOINT`
- Build estático (`dist/`) servido por Apache no VPS

## Regras não negociáveis

1. **Performance é requisito, não detalhe.** Tráfego pago em celular. Meta: LCP abaixo de 2,5s em 4G.
   - Todas as fotos convertidas para WebP, com fallback JPG.
   - Hero com imagem em `<link rel="preload">`; todas as demais com `loading="lazy"`.
   - Fontes com `display: swap`. Nada de importar família inteira. Poppins fica self-hosted em
     `public/fonts/` (subset latin, pesos 400/500/600/700) com nome estável para o `preload` no
     `index.html`, e com a face `Poppins Fallback` de métricas ajustadas para o swap não gerar CLS.
   - Zero biblioteca de animação pesada. Se precisar de transição, CSS puro.
2. **Mobile-first.** Escreva o layout do menor breakpoint para cima.
3. **Um único objetivo por dobra.** Todo CTA leva ao formulário.
4. **Nada de contador falso de vagas.** Se houver contador, o número vem de config manual.

## Identidade visual

Herdada do site institucional da Unyflex:

- Fundos: `#0a1828`, `#060f1c`
- Acentos: `#22b8f0`, `#0099ff`
- Destaque: `#f5b700`
- Fonte: Poppins
- Cards com glassmorphism (blur + borda sutil)

## Estrutura da página

Os blocos, na ordem, estão no arquivo `copy.md` na raiz do projeto. Use o texto exatamente como está —
não reescreva, não "melhore", não encurte. Se algum texto não couber no layout, avise em vez de cortar.

Blocos: hero → barra de autoridade → problema → quebra de objeção → diferencial → três entregas →
programação (6 módulos em 2 dias) → professores → experiência (galeria) → oferta/preço → para quem é →
FAQ → CTA final com formulário.

## Formulário

Campos: nome, whatsapp (com máscara), email, empresa, segmento, cidade.
Validação client-side antes do envio. Botão em estado de loading durante o POST.

Payload:

```json
{
  "form_id": "lp-seja-fornecedor",
  "produto": "seja-fornecedor", "vinculo": "fornecedor",
  "URL": "https://exemplo.com/?utm_source=...",
  "nome": "", "whatsapp": "", "email": "",
  "empresa": "", "segmento": "", "cidade": "",
  "utm_source": "", "utm_medium": "", "utm_campaign": "",
  "utm_id": "", "utm_term": "", "utm_content": ""
}
```

As 6 UTMs são lidas de `window.location.search` **no momento do submit**. Sem cookie, sem localStorage.
Após sucesso, redirecionar para `/obrigado.html` preservando a query string. Nunca colocar nome,
e-mail ou telefone na URL.

## Tracking

- Meta Pixel `1168799437651546` no `<head>` do `index.html`: init + PageView.
  O stub, o `init` e o `PageView` ficam no head, mas o `fbevents.js` só é injetado por
  `window.__loadMetaPixel()`, chamado em `src/lib/pixel.ts` depois do LCP (os ~230 KB e ~1,5 s de
  CPU do script derrubavam o LCP no celular). Não voltar a carregar o script direto no head.
- O evento `Lead` dispara **apenas** no carregamento de `/obrigado.html`. Nunca no clique nem no submit.
- `/obrigado.html` é uma página estática separada, com o pixel base + o evento Lead.
- Qualquer redirect interno preserva `utm_*` e `fbclid`.

## Imagens

Originais em `src/assets/fotos/` (rastreados no git, **não** vão para o `dist/`):

- `hero.jpg` — plateia e palco com backdrop Unyflex
- `galeria-01..06.jpg` — eventos anteriores (sala cheia, palestrantes, participantes, coffee break)
- `prof-rafael.jpg`, `prof-jose-augusto.jpg`, `prof-juliana.jpg`

O script `scripts/images.mjs` roda antes de `dev` e `build` (e via `npm run images`) e gera as versões
otimizadas em `public/img/gen/` (ignorada no git): WebP em várias larguras com fallback JPG, e para os
professores o recorte 1:1 com enquadramento no rosto. A página referencia **somente** `/img/gen/`.
O script pula o que já está atualizado e apaga saídas cujo original foi removido.

Para trocar uma foto, substitua o arquivo em `src/assets/fotos/` com o mesmo nome. Para adicionar
uma nova, coloque-a lá e, se precisar de larguras ou recorte específicos, ajuste `VARIANTS`/`SQUARE`
no script. Fotos que a página não usa ficam em `assets-originais/` (ignorada).

## Entrega

- `npm run build` gerando `dist/` funcional
- README curto com as variáveis de ambiente necessárias
- Sem dependência que exija Node no servidor: o Apache serve arquivos estáticos
