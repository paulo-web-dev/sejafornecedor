import { useState, type ChangeEvent, type FormEvent } from 'react'
import Section, { SectionTitle } from '../components/Section'
import Field from '../components/Field'
import { formatPhone, isValidPhone, phoneDigits } from '../lib/phone'
import { readUtms } from '../lib/utm'
import { FORM_ID, submitLead, type LeadFields } from '../lib/lead'

type Errors = Partial<Record<keyof LeadFields, string>>
type Status = 'idle' | 'sending' | 'error'

const EMPTY: LeadFields = {
  nome: '',
  whatsapp: '',
  email: '',
  empresa: '',
  segmento: '',
  cidade: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: LeadFields): Errors {
  const e: Errors = {}
  if (f.nome.trim().length < 3) e.nome = 'Informe seu nome.'
  if (!isValidPhone(f.whatsapp)) e.whatsapp = 'Informe um WhatsApp válido com DDD.'
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Informe um e-mail válido.'
  if (!f.empresa.trim()) e.empresa = 'Informe o nome da empresa.'
  if (!f.segmento.trim()) e.segmento = 'Informe o segmento de atuação.'
  if (!f.cidade.trim()) e.cidade = 'Informe a cidade.'
  return e
}

export default function FinalCta() {
  const [fields, setFields] = useState<LeadFields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const key = name as keyof LeadFields
    setFields((f) => ({ ...f, [key]: key === 'whatsapp' ? formatPhone(value) : value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return

    const found = validate(fields)
    setErrors(found)
    const firstError = Object.keys(found)[0]
    if (firstError) {
      document.getElementById(`campo-${firstError}`)?.focus()
      return
    }

    setStatus('sending')
    try {
      // UTMs lidas da URL no momento do submit, conforme CLAUDE.md.
      await submitLead({
        form_id: FORM_ID,
        nome: fields.nome.trim(),
        whatsapp: phoneDigits(fields.whatsapp),
        email: fields.email.trim(),
        empresa: fields.empresa.trim(),
        segmento: fields.segmento.trim(),
        cidade: fields.cidade.trim(),
        ...readUtms(),
      })
      // Redirect preservando utm_* e fbclid. Nenhum dado pessoal vai na URL.
      window.location.assign(`/obrigado.html${window.location.search}`)
    } catch (err) {
      console.error('[lead] falha no envio', err)
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <Section id="formulario" tone="navy" className="relative isolate overflow-hidden scroll-mt-4">
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 -z-10 h-[30rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full bg-cyan/10 blur-3xl"
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <SectionTitle className="lg:text-5xl">
            São 40 vagas. Depois de 14 de novembro, a próxima turma só no ano que vem.
          </SectionTitle>
          <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
            Dois sábados agora podem abrir um canal de vendas que a sua empresa vai usar pelos
            próximos dez anos.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="glass rounded-2xl p-6 sm:p-8"
          aria-busy={sending}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="campo-nome"
              name="nome"
              label="Nome"
              autoComplete="name"
              value={fields.nome}
              onChange={onChange}
              error={errors.nome}
              className="sm:col-span-2"
            />
            <Field
              id="campo-whatsapp"
              name="whatsapp"
              label="WhatsApp"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="(41) 99999-9999"
              value={fields.whatsapp}
              onChange={onChange}
              error={errors.whatsapp}
            />
            <Field
              id="campo-email"
              name="email"
              label="E-mail"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={fields.email}
              onChange={onChange}
              error={errors.email}
            />
            <Field
              id="campo-empresa"
              name="empresa"
              label="Empresa"
              autoComplete="organization"
              value={fields.empresa}
              onChange={onChange}
              error={errors.empresa}
              className="sm:col-span-2"
            />
            <Field
              id="campo-segmento"
              name="segmento"
              label="Segmento de atuação"
              value={fields.segmento}
              onChange={onChange}
              error={errors.segmento}
            />
            <Field
              id="campo-cidade"
              name="cidade"
              label="Cidade"
              autoComplete="address-level2"
              value={fields.cidade}
              onChange={onChange}
              error={errors.cidade}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-gold px-8 py-4 text-base font-bold tracking-wide text-navy-deep uppercase shadow-lg shadow-gold/20 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-wait disabled:opacity-80 disabled:hover:brightness-100"
          >
            {sending && <Spinner />}
            {sending ? 'Enviando…' : 'QUERO MINHA VAGA'}
          </button>

          {status === 'error' && (
            <p role="alert" className="mt-4 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              Não foi possível enviar agora. Tente novamente em instantes.
            </p>
          )}

          <p className="mt-4 text-center text-sm leading-relaxed text-white/60">
            Um consultor entra em contato pelo WhatsApp para tirar suas dúvidas e concluir a
            inscrição.
          </p>
        </form>
      </div>
    </Section>
  )
}

function Spinner() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
      className="animate-spin"
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  )
}
