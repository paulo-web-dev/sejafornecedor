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
  "nome": "", "whatsapp": "41999998888", "email": "",
  "empresa": "", "segmento": "", "cidade": "",
  "utm_source": "", "utm_medium": "", "utm_campaign": "",
  "utm_id": "", "utm_term": "", "utm_content": ""
}
```

O campo `whatsapp` vai só com dígitos (DDD + número).

## Scripts

```sh
npm install
npm run dev      # servidor local
npm run build    # gera dist/
npm run preview  # serve dist/ localmente
```

O `dist/` é estático e pode ser servido diretamente pelo Apache.
