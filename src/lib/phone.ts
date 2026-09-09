/** Mantém só dígitos, limitado a DDD + 9 dígitos. */
export function phoneDigits(value: string): string {
  return value.replace(/\D/g, '').slice(0, 11)
}

/** Máscara progressiva: (41) 99999-9999 ou (41) 3333-3333. */
export function formatPhone(value: string): string {
  const d = phoneDigits(value)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

/** Válido com 10 (fixo) ou 11 (celular) dígitos e DDD plausível. */
export function isValidPhone(value: string): boolean {
  const d = phoneDigits(value)
  if (d.length !== 10 && d.length !== 11) return false
  const ddd = Number(d.slice(0, 2))
  if (ddd < 11 || ddd > 99) return false
  if (d.length === 11 && d[2] !== '9') return false
  return true
}
