# LP — Seja Fornecedor para o Poder Público

Landing page estática (Vite + React + TypeScript + Tailwind CSS 4).

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

| Variável             | Descrição                                                    |
| -------------------- | ------------------------------------------------------------ |
| `VITE_LEAD_ENDPOINT` | URL que recebe o POST (JSON) do formulário de lead.          |

O endpoint recebe `POST` com `Content-Type: application/json` e o payload abaixo. Se estiver em
outra origem, precisa responder ao preflight `OPTIONS` com os cabeçalhos CORS (`Access-Control-Allow-Origin`,
`Access-Control-Allow-Methods: POST`, `Access-Control-Allow-Headers: content-type`). Qualquer status 2xx
é tratado como sucesso; o navegador então redireciona para `/obrigado.html` preservando a query string.

```json
{
  "form_id": "lp-seja-fornecedor",
  "produto": "seja-fornecedor", "vinculo": "fornecedor",
  "URL": "https://exemplo.com/?utm_source=...",
  "nome": "", "whatsapp": "41999998888", "email": "",
  "empresa": "", "segmento": "", "cidade": "",
  "utm_source": "", "utm_medium": "", "utm_campaign": "",
  "utm_id": "", "utm_term": "", "utm_content": ""
}
```

O campo `whatsapp` vai só com dígitos (DDD + número). `produto` e `vinculo` são fixos; `URL` é a
URL completa da página no momento do envio.

## Scripts

```sh
npm install
npm run dev      # servidor local
npm run build    # gera dist/
npm run preview  # serve dist/ localmente
npm run images   # regenera public/img/gen/ a partir de src/assets/fotos/
```

O `dist/` é estático e pode ser servido diretamente pelo Apache.

## Performance

- Poppins é self-hosted em `public/fonts/` (woff2, subset latin, licença OFL ao lado). Os pesos
  400 e 700 são pré-carregados no `index.html`; a face `Poppins Fallback` ajusta as métricas da
  Arial para o swap não causar layout shift.
- O `fbevents.js` do Meta Pixel só é injetado depois do LCP (`src/lib/pixel.ts`). `init` e
  `PageView` ficam na fila do stub no `<head>` e disparam quando o script chega.
- A faixa de fotos logo abaixo da barra de autoridade só monta os `<img>` depois do LCP
  (`src/lib/afterPaint.ts`): está dentro da margem do `loading="lazy"` e disputaria banda com o hero.
  O lightbox da galeria só baixa a versão de 1600 px quando é aberto.
- Referência (Lighthouse mobile, `vite preview`, mediana de 3 rodadas): LCP 1,8 s, CLS 0.
