// Cloudflare Pages Function: POST /api/contact
// Sends the contact form to your inbox using Resend (https://resend.com).
//
// Set these in Cloudflare Pages → Settings → Variables and Secrets:
//   RESEND_API_KEY  (secret)  your Resend API key
//   CONTACT_TO      (text)    the email that receives messages, e.g. you@gmail.com
//   CONTACT_FROM    (text)    optional, e.g. "VEXDYN <hello@yourdomain.com>"
//                             (needs a domain verified in Resend; if empty we use Resend's test sender)

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function onRequestPost({ request, env }) {
  // Only accept requests from our own site
  const origin = request.headers.get('origin')
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ ok: false, error: 'Not allowed.' }, 403)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400)
  }

  // Honeypot: real people leave this empty, bots fill it
  if (body.website) return json({ ok: true })

  const name = String(body.name || '').trim().slice(0, 80)
  const email = String(body.email || '').trim().slice(0, 120)
  const message = String(body.message || '').trim().slice(0, 4000)

  if (!EMAIL.test(email)) return json({ ok: false, error: 'Please enter a valid email.' }, 400)
  if (message.length < 5) return json({ ok: false, error: 'Please write a short message.' }, 400)

  if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
    return json({ ok: false, error: 'Contact form is not set up yet.' }, 500)
  }

  const from = env.CONTACT_FROM || 'VEXDYN Website <onboarding@resend.dev>'
  const who = name || email

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `New message from ${who}`,
      text: `From: ${who} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${esc(who)} &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  })

  if (!res.ok) return json({ ok: false, error: 'Could not send right now. Please try again.' }, 502)
  return json({ ok: true })
}

// Any other method
export const onRequest = () => json({ ok: false, error: 'Method not allowed.' }, 405)
