// Cloudflare Pages Function: POST /api/contact
// Forwards validated messages to a Google Apps Script web app, which
// delivers them to Gmail via GmailApp (no Resend).
//
// Set these in Cloudflare Pages → Settings → Variables and Secrets:
//   CONTACT_SCRIPT_URL  (secret)  Apps Script web app URL (.../exec)
//   CONTACT_SECRET      (secret)  shared token verified by the script
//
// Never put the Gmail address, script URL, or token in frontend code.

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

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

  const scriptUrl = env.CONTACT_SCRIPT_URL
  const secret = env.CONTACT_SECRET
  if (!scriptUrl || !secret) {
    return json({ ok: false, error: 'Contact form is not set up yet.' }, 500)
  }

  let res
  try {
    res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        token: secret,
        name: name || 'Visitor',
        email,
        message,
      }),
    })
  } catch {
    return json({ ok: false, error: 'Could not send right now. Please try again.' }, 502)
  }

  let payload = {}
  try {
    payload = await res.json()
  } catch {
    payload = {}
  }

  if (!res.ok || !payload.ok) {
    return json(
      { ok: false, error: payload.error || 'Could not send right now. Please try again.' },
      502
    )
  }

  return json({ ok: true })
}

// Any other method
export const onRequest = () => json({ ok: false, error: 'Method not allowed.' }, 405)
