import { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  const { name, address, postcode, email } = (await request.json()) as {
    name: string
    address: string
    postcode: string
    email: string | null
  }

  const smtpUser = process.env.SMTP_USER
  // Gmail App Passwords are displayed with spaces but must be used without them
  const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, '')

  if (!smtpUser || !smtpPass) {
    console.warn('[request-kit] SMTP_USER or SMTP_PASS not set — request not emailed:', {
      name,
      postcode,
    })
    return Response.json({ success: true, warning: 'SMTP not configured' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: smtpUser, pass: smtpPass },
  })

  // Verify connection before attempting send
  try {
    await transporter.verify()
    console.log('[request-kit] SMTP connection verified')
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[request-kit] SMTP verify failed:', message)
    return Response.json({ success: false, error: `SMTP connection failed: ${message}` }, { status: 500 })
  }

  const text = [
    `Name: ${name}`,
    `Address: ${address}`,
    `Postcode: ${postcode}`,
    `Email: ${email ?? 'not provided'}`,
  ].join('\n')

  try {
    const info = await transporter.sendMail({
      from: `"Postcode Colour" <${smtpUser}>`,
      to: smtpUser, // send to the Gmail account directly; forward from there if needed
      replyTo: email ?? smtpUser,
      subject: `Kit request — ${postcode}`,
      text,
    })
    console.log('[request-kit] sent, messageId:', info.messageId)
    return Response.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[request-kit] sendMail failed:', message)
    return Response.json({ success: false, error: message }, { status: 500 })
  }
}
