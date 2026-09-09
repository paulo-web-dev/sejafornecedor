import type { ComponentPropsWithoutRef } from 'react'

type FieldProps = ComponentPropsWithoutRef<'input'> & {
  id: string
  label: string
  error?: string
}

/** Campo de formulário com label visível e mensagem de erro acessível. */
export default function Field({ id, label, error, className = '', ...rest }: FieldProps) {
  const errorId = `${id}-erro`
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-white/85">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-1.5 block w-full rounded-lg border bg-white/5 px-3.5 py-3 text-base text-white placeholder:text-white/35 transition outline-none focus:ring-2 focus:ring-cyan/60 ${
          error ? 'border-red-400/70' : 'border-white/15 focus:border-cyan/60'
        }`}
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}
