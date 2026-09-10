import type { Utms } from './utm'

export const FORM_ID = 'lp-seja-fornecedor'
export const PRODUTO = 'seja-fornecedor'
export const VINCULO = 'fornecedor'

export type LeadFields = {
  nome: string
  whatsapp: string
  email: string
  empresa: string
  segmento: string
  cidade: string
}

export type LeadPayload = {
  form_id: typeof FORM_ID
  produto: typeof PRODUTO
  vinculo: typeof VINCULO
  /** URL completa da página no momento do submit. */
  URL: string
} & LeadFields &
  Utms

const TIMEOUT_MS = 15_000

/** Envia o lead. Lança erro em falha de rede, timeout ou status não-2xx. */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT
  if (!endpoint) {
    throw new Error('VITE_LEAD_ENDPOINT não configurado')
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`Endpoint respondeu ${res.status}`)
  } finally {
    clearTimeout(timer)
  }
}
