'use client'

import { useRef, useState } from 'react'
import Nav from '@/app/components/Nav'
import { supabase } from '@/app/lib/supabase'

// Set NEXT_PUBLIC_ADMIN_PASSWORD in .env.local — this is a lightweight gate, not hardened auth
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'dyevert2026'

const SEASONS = ['Summer', 'Autumn', 'Winter', 'Spring']

type FormState = {
  color: string
  postcode: string
  plant: string
  part: string
  location: string
  quantity: string
  season: string
  name: string
  observations: string
}

const EMPTY: FormState = {
  color: '#c4a265',
  postcode: '',
  plant: '',
  part: '',
  location: '',
  quantity: '',
  season: '',
  name: '',
  observations: '',
}

const inputClass =
  'w-full border-b border-rule py-2.5 text-sm font-light text-ink bg-transparent focus:outline-none focus:border-ink transition-colors duration-150 placeholder:text-rule'

const btnClass =
  'text-xs tracking-widest uppercase border-b border-ink pb-0.5 hover:text-secondary hover:border-secondary transition-colors duration-150'

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-2.5">
        <span className="text-xs tracking-widest uppercase font-light text-secondary">{label}</span>
        {required && <span className="text-xs font-light text-rule">Required</span>}
      </div>
      {children}
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const [form, setForm] = useState<FormState>(EMPTY)
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function field(key: keyof FormState) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    let imageUrl: string | null = null

    if (file) {
      const ext = file.name.split('.').pop() ?? 'jpg'
      const path = `${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('swatches')
        .upload(path, file, { contentType: file.type })

      if (uploadError) {
        setStatus('error')
        setErrorMsg(`Image upload failed: ${uploadError.message}`)
        return
      }

      const { data: urlData } = supabase.storage.from('swatches').getPublicUrl(path)
      imageUrl = urlData.publicUrl
    }

    const { error } = await supabase.from('swatches').insert([
      {
        color: form.color,
        postcode: form.postcode.trim(),
        plant: form.plant.trim(),
        part: form.part.trim(),
        location: form.location.trim() || null,
        quantity: form.quantity.trim() || null,
        season: form.season,
        name: form.name.trim() || null,
        observations: form.observations.trim() || null,
        image_url: imageUrl,
      },
    ])

    if (error) {
      setStatus('error')
      setErrorMsg(`Upload failed: ${error.message}`)
    } else {
      setStatus('success')
      setForm(EMPTY)
      setFile(null)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-white font-sans text-ink">
        <Nav />
        <main className="px-4 sm:px-[14mm] pt-14 pb-24 max-w-sm">
          <h1 className="text-xs font-light tracking-widest uppercase text-secondary">Admin</h1>
          <div className="border-t border-rule mt-4 mb-10" />
          <form onSubmit={handlePasswordSubmit} className="space-y-8">
            <Field label="Password">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                autoFocus
                autoComplete="current-password"
              />
            </Field>
            {passwordError && (
              <p className="text-xs font-light text-secondary">Incorrect password.</p>
            )}
            <button type="submit" className={btnClass}>
              Enter
            </button>
          </form>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />
      <main className="px-4 sm:px-[14mm] pt-14 pb-24 max-w-xl">
        <h1 className="text-xs font-light tracking-widest uppercase text-secondary">
          Upload Swatch
        </h1>
        <div className="border-t border-rule mt-4 mb-12" />

        {status === 'success' ? (
          <div>
            <p className="text-sm font-light text-ink">Swatch uploaded.</p>
            <button onClick={() => setStatus('idle')} className={`${btnClass} mt-8 block`}>
              Upload another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-9">
            <Field label="Photograph">
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full text-sm font-light text-secondary file:mr-4 file:text-xs file:font-light file:uppercase file:tracking-widest file:border file:border-rule file:bg-white file:text-ink file:px-3 file:py-1.5 file:cursor-pointer"
              />
            </Field>

            <Field label="Colour">
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={form.color}
                  onChange={field('color')}
                  className="w-9 h-9 rounded-full border border-rule cursor-pointer bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={form.color}
                  onChange={field('color')}
                  placeholder="#c4a265"
                  pattern="^#[0-9a-fA-F]{6}$"
                  className={`${inputClass} flex-1`}
                />
              </div>
            </Field>

            <Field label="Postcode" required>
              <input
                type="text"
                value={form.postcode}
                onChange={field('postcode')}
                required
                pattern="[0-9]{4}"
                maxLength={4}
                placeholder="0000"
                className={inputClass}
              />
            </Field>

            <Field label="Plant material" required>
              <input
                type="text"
                value={form.plant}
                onChange={field('plant')}
                required
                placeholder="e.g. Onion skins"
                className={inputClass}
              />
            </Field>

            <Field label="Plant part" required>
              <input
                type="text"
                value={form.part}
                onChange={field('part')}
                required
                placeholder="e.g. Outer skins"
                className={inputClass}
              />
            </Field>

            <Field label="Collection location">
              <input
                type="text"
                value={form.location}
                onChange={field('location')}
                placeholder="e.g. Home garden, Street tree, Bushland"
                className={inputClass}
              />
            </Field>

            <Field label="Quantity">
              <input
                type="text"
                value={form.quantity}
                onChange={field('quantity')}
                placeholder="e.g. 200g dried"
                className={inputClass}
              />
            </Field>

            <Field label="Season" required>
              <select
                value={form.season}
                onChange={field('season')}
                required
                className={`${inputClass} cursor-pointer`}
              >
                <option value="">Select season</option>
                {SEASONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Participant name">
              <input
                type="text"
                value={form.name}
                onChange={field('name')}
                placeholder="First name or initials"
                className={inputClass}
              />
            </Field>

            <Field label="Observations">
              <textarea
                value={form.observations}
                onChange={field('observations')}
                rows={4}
                placeholder="Participant's notes about the dyeing process and result."
                className={`${inputClass} resize-none`}
              />
            </Field>

            {status === 'error' && (
              <p className="text-xs font-light text-secondary">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`${btnClass} disabled:opacity-40`}
            >
              {status === 'submitting' ? 'Uploading…' : 'Upload swatch'}
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
