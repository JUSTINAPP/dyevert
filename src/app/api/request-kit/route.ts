import { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  const { name, address, postcode, email } = (await request.json()) as {
    name: string
    address: string
    postcode: string
    email: string | null
  }

  const smtpReady = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS

  if (smtpReady) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT ?? '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    const text = [
      `Name: ${name}`,
      `Address: ${address}`,
      `Postcode: ${postcode}`,
      `Email: ${email ?? 'not provided'}`,
    ].join('\n')

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'postcode@dyevert.com',
        subject: `Kit request — ${postcode}`,
        text,
      })
    } catch (err) {
      // Log but don't surface SMTP errors to the user
      console.error('[request-kit] email send failed:', err)
    }
  } else {
    // Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS to .env.local to enable email delivery
    console.log('[request-kit] SMTP not configured. Request received:', {
      name,
      address,
      postcode,
      email,
    })
  }

  return Response.json({ success: true })
}
