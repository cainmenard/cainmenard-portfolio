import { Resend } from 'resend'
import { ownerEmail, siteUrl } from './auth'

/**
 * Outbound mail for /oneroof.
 *
 * With no RESEND_API_KEY set, links print to the dev server console instead of
 * being sent. That is what makes the whole flow testable locally before the
 * sending domain is verified.
 */

const apiKey = process.env.RESEND_API_KEY
const resend = apiKey ? new Resend(apiKey) : null

function from() {
  return process.env.ONEROOF_MAIL_FROM || 'Cain Menard <onboarding@resend.dev>'
}

async function send({ to, subject, html, text }) {
  if (!resend) {
    console.log(
      [
        '',
        '  ┌─ /oneroof mail (not sent, RESEND_API_KEY unset) ─────────────',
        `  │ to:      ${to}`,
        `  │ subject: ${subject}`,
        `  │ ${text.split('\n').filter(Boolean).join('\n  │ ')}`,
        '  └──────────────────────────────────────────────────────────────',
        '',
      ].join('\n')
    )
    return { ok: true, simulated: true }
  }

  try {
    const { error } = await resend.emails.send({ from: from(), to, subject, html, text })
    if (error) {
      console.error('[oneroof] resend error', error)
      return { ok: false, error }
    }
    return { ok: true }
  } catch (err) {
    console.error('[oneroof] resend threw', err)
    return { ok: false, error: err }
  }
}

/* ------------------------------------------------------------------ */
/* Templates                                                           */
/* ------------------------------------------------------------------ */

const shell = (body) => `<!doctype html><html><body style="margin:0;padding:0;background:#081321;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#081321;padding:48px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#0C1D31;border:1px solid rgba(143,179,214,.22);border-radius:3px;">
<tr><td style="padding:40px 40px 36px;font-family:'Public Sans',Segoe UI,Arial,sans-serif;color:#AEBFD2;font-size:15px;line-height:1.6;">
${body}
<div style="margin-top:38px;padding-top:20px;border-top:1px solid rgba(143,179,214,.14);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;letter-spacing:1px;color:#41597A;">
PREPARED BY <span style="color:#6E86A2;">CAIN MENARD</span> &middot; CAINMENARD.COM
</div>
</td></tr></table></td></tr></table></body></html>`

const button = (url, label) =>
  `<div style="margin:30px 0;"><a href="${url}" style="display:inline-block;background:#EEF4FB;color:#0C2136;text-decoration:none;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;padding:15px 30px;border-radius:2px;">${label}</a></div>`

const heading = (text) =>
  `<div style="font-family:Georgia,'Times New Roman',serif;font-size:27px;line-height:1.15;color:#ffffff;margin-bottom:18px;">${text}</div>`

const fallbackLine = (url) =>
  `<div style="margin-top:26px;font-size:12px;color:#5E7896;line-height:1.5;">If the button does not work, paste this into your browser:<br><span style="color:#8FB3D6;word-break:break-all;">${url}</span></div>`

/* ------------------------------------------------------------------ */

/** Sign-in link for someone already on the list. */
export function sendMagicLink({ to, url, isNew }) {
  const subject = isNew
    ? 'Your invitation to Operation OneRoof'
    : 'Your sign-in link for Operation OneRoof'

  const body = isNew
    ? `${heading('Two years.<br><em style="color:#8FB3D6;">One arc.</em>')}
<p style="margin:0;">Cain put together an interactive walk-through of the work behind RCA's ERP program, in the order it happened, and where it goes next. It runs about a minute, and you can click into any of it.</p>
<p style="margin:16px 0 0;">This link signs you in. You will stay signed in on this browser, so there is nothing to remember and nothing to type again.</p>
${button(url, 'Open the walk-through')}
<p style="margin:0;font-size:13px;color:#6E86A2;">The link is good for 15 minutes and works once. Ask for a new one any time at ${siteUrl()}/oneroof.</p>
${fallbackLine(url)}`
    : `${heading('Your sign-in link')}
<p style="margin:0;">Click to open the Operation OneRoof walk-through. You will stay signed in on this browser afterward.</p>
${button(url, 'Sign in')}
<p style="margin:0;font-size:13px;color:#6E86A2;">Good for 15 minutes, works once. If you did not ask for this, you can ignore it. Nobody gets in without clicking.</p>
${fallbackLine(url)}`

  const text = isNew
    ? `You have been invited to Operation OneRoof, an interactive walk-through of RCA's ERP program.\n\nSign in: ${url}\n\nThe link is good for 15 minutes and works once. You will stay signed in on this browser afterward.`
    : `Your sign-in link for Operation OneRoof:\n\n${url}\n\nGood for 15 minutes, works once. If you did not ask for this, ignore it.`

  return send({ to, subject, html: shell(body), text })
}

/** Someone not on the list tried to get in. Quiet note to Cain, nothing to them. */
export function sendOwnerAlert({ email, ip, at }) {
  const owner = ownerEmail()
  if (!owner) return Promise.resolve({ ok: false, error: 'no owner email configured' })

  const admin = `${siteUrl()}/oneroof/admin`
  const when = new Date(at || Date.now()).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const body = `${heading('Someone asked for access')}
<p style="margin:0;">An address that is not on the list tried to sign in to /oneroof. They got the same "check your email" screen everyone gets and no email was sent to them.</p>
<div style="margin:24px 0;padding:18px 20px;background:#081321;border-left:2px solid #8FB3D6;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;color:#DCEBF9;">
${email}<div style="margin-top:8px;font-size:11px;color:#5E7896;">${when} ET &middot; ${ip || 'ip unknown'}</div>
</div>
<p style="margin:0;">If you meant to invite them, add the address and the invitation goes out on the spot.</p>
${button(admin, 'Open the invite list')}`

  const text = `Not-invited sign-in attempt on /oneroof.\n\n${email}\n${when} ET, ${ip || 'ip unknown'}\n\nNothing was sent to them. Add them at ${admin} if you meant to.`

  return send({ to: owner, subject: `OneRoof access attempt: ${email}`, html: shell(body), text })
}
