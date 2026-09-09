export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_id',
  'utm_term',
  'utm_content',
] as const

export type UtmKey = (typeof UTM_KEYS)[number]
export type Utms = Record<UtmKey, string>

/** Lê as 6 UTMs da URL atual. Sem cookie, sem localStorage. */
export function readUtms(search: string = window.location.search): Utms {
  const params = new URLSearchParams(search)
  return Object.fromEntries(UTM_KEYS.map((k) => [k, params.get(k) ?? ''])) as Utms
}
