'use client'

import { useState } from 'react'
import Nav from '@/app/components/Nav'
import { supabase } from '@/app/lib/supabase'

type FormState = {
  name: string
  address: string
  postcode: string
  email: string
}

export default function RequestAKitPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    address: '',
    postcode: '',
    email: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(key: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const { error } = await supabase.from('kit_requests').insert([
      {
        name: form.name.trim(),
        address: form.address.trim(),
        postcode: form.postcode.trim(),
        email: form.email.trim() || null,
      },
    ])

    if (error) {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    } else {
      setStatus('success')
    }
  }

  const inputClass =
    'w-full border-b border-rule py-3 text-base sm:text-sm font-light text-ink bg-transparent focus:outline-none focus:border-ink transition-colors duration-150 placeholder:text-rule min-h-[44px]'

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />

      <main className="px-4 sm:px-[14mm] pt-12 sm:pt-14 pb-20 sm:pb-24">
        <h1 className="text-xs font-light tracking-widest uppercase text-secondary">
          Request a Kit
        </h1>
        <div className="border-t border-rule mt-4 mb-12" />

        {status === 'success' ? (
          <div className="max-w-md">
            <p className="text-sm font-light text-ink leading-relaxed">
              Your request has been received.
            </p>
            <p className="text-sm font-light text-secondary leading-relaxed mt-3">
              We&apos;ll be in touch shortly with postage details and instructions for collecting
              and preparing your plant material.
            </p>
          </div>
        ) : (
          <div className="max-w-md">
            <p className="text-sm font-light text-secondary leading-relaxed mb-12">
              Request a dyeing kit to participate in Postcode Colour. We will send you everything
              you need to collect plant material from your postcode, prepare a dye bath, and return
              a swatch of the colour your place produces.
            </p>

            <form onSubmit={handleSubmit} className="space-y-9">
              <Field label="Name" required>
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={inputClass}
                />
              </Field>

              <Field label="Address" required>
                <input
                  type="text"
                  value={form.address}
                  onChange={set('address')}
                  required
                  autoComplete="street-address"
                  placeholder="Street address"
                  className={inputClass}
                />
              </Field>

              <Field label="Postcode" required>
                <input
                  type="text"
                  value={form.postcode}
                  onChange={set('postcode')}
                  required
                  pattern="[0-9]{4}"
                  maxLength={4}
                  autoComplete="postal-code"
                  placeholder="0000"
                  className={inputClass}
                />
              </Field>

              <Field label="Email" hint="Optional — for correspondence">
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </Field>

              {status === 'error' && (
                <p className="text-xs font-light text-secondary">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="text-xs tracking-widest uppercase border-b border-ink pb-0.5 hover:text-secondary hover:border-secondary transition-colors duration-150 disabled:opacity-40"
              >
                {status === 'submitting' ? 'Sending…' : 'Request a kit'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-baseline gap-4 mb-2.5">
        <span className="text-xs tracking-widest uppercase font-light text-secondary">{label}</span>
        {required && <span className="text-xs font-light text-rule">Required</span>}
        {hint && <span className="text-xs font-light text-secondary">{hint}</span>}
      </div>
      {children}
    </div>
  )
}
