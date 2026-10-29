'use client'

import { useState } from 'react'

const when = (ms) =>
  ms
    ? new Date(ms).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : '·'

const browser = (ua) => {
  if (!ua) return 'unknown'
  const os = /iPhone|iPad/.test(ua) ? 'iOS' : /Android/.test(ua) ? 'Android' : /Mac/.test(ua) ? 'macOS' : /Windows/.test(ua) ? 'Windows' : ''
  const app = /Edg\//.test(ua) ? 'Edge' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : /Firefox\//.test(ua) ? 'Firefox' : 'browser'
  return [app, os].filter(Boolean).join(' · ')
}

export default function AdminConsole({ owner, invites: seedInvites, sessions: seedSessions }) {
  const [invites, setInvites] = useState(seedInvites)
  const [sessions, setSessions] = useState(seedSessions)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)

  async function call(url, method, body) {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    let data = {}
    try {
      data = await res.json()
    } catch {
      /* a 404 from the owner guard has no body */
    }
    if (!res.ok || !data.ok) throw new Error(data.error || 'That did not work.')
    return data
  }

  async function invite(e) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setMsg(null)
    try {
      const data = await call('/api/oneroof/admin/invite', 'POST', {
        email: email.trim(),
        name: name.trim() || null,
        send: true,
      })
      setInvites(data.invites)
      setEmail('')
      setName('')
      setMsg({
        ok: true,
        text: data.sent
          ? `Invitation sent to ${data.email}.`
          : `${data.email} added, but the email did not send. Check RESEND_API_KEY.`,
      })
    } catch (err) {
      setMsg({ ok: false, text: err.message })
    } finally {
      setBusy(false)
    }
  }

  async function remove(target) {
    if (!window.confirm(`Remove ${target}? This also signs them out everywhere.`)) return
    setBusy(true)
    setMsg(null)
    try {
      const data = await call('/api/oneroof/admin/invite', 'DELETE', { email: target })
      setInvites(data.invites)
      setSessions((s) => s.filter((row) => row.email !== target))
      setMsg({
        ok: true,
        text: `${target} removed${data.revoked ? `, ${data.revoked} session${data.revoked === 1 ? '' : 's'} ended` : ''}.`,
      })
    } catch (err) {
      setMsg({ ok: false, text: err.message })
    } finally {
      setBusy(false)
    }
  }

  async function revoke(sid, whoFor) {
    if (!window.confirm(`Sign ${whoFor} out of this browser? They stay on the invite list.`)) return
    setBusy(true)
    setMsg(null)
    try {
      const data = await call('/api/oneroof/admin/revoke', 'POST', { sid })
      setSessions(data.sessions)
      setMsg({ ok: true, text: `Signed ${whoFor} out of that browser.` })
    } catch (err) {
      setMsg({ ok: false, text: err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="oradmin">
      <div className="orwrap">
        <header className="orhead">
          <div>
            <div className="orkick">Operation OneRoof · Access</div>
            <h1>Who gets in.</h1>
            <div className="sub">
              An address on this list can request a sign-in link. Nobody else can, and nobody else
              is told why.
            </div>
          </div>
          <div className="orwho">
            signed in as
            <br />
            <b>{owner}</b>
          </div>
        </header>

        <section className="orsec">
          <h2>
            Invite someone <span className="n">sends the link right away</span>
          </h2>
          <form className="orform" onSubmit={invite}>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={busy}
              required
            />
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={busy}
              style={{ maxWidth: 190 }}
            />
            <button type="submit" disabled={busy}>
              {busy ? 'Working' : 'Invite'}
            </button>
          </form>
          <div className="orhint">
            They get one email with a link that signs them in and keeps them signed in for 90 days
            on that browser. The link itself is good for 15 minutes and works once.
          </div>
          {msg && <div className={`ormsg ${msg.ok ? 'ok' : 'bad'}`}>{msg.text}</div>}
        </section>

        <section className="orsec">
          <h2>
            On the list <span className="n">{invites.length}</span>
          </h2>
          {invites.length === 0 ? (
            <div className="orempty">Nobody yet.</div>
          ) : (
            <table className="ortable">
              <thead>
                <tr>
                  <th>Address</th>
                  <th className="hide-sm">Added</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {invites.map((row) => (
                  <tr key={row.email}>
                    <td>
                      <span className="em">{row.email}</span>
                      {row.owner && <span className="ortag">You</span>}
                      {row.name && (
                        <div className="meta" style={{ marginTop: 5 }}>
                          {row.name}
                        </div>
                      )}
                    </td>
                    <td className="meta hide-sm">{when(row.addedAt)}</td>
                    <td className="act">
                      {!row.owner && (
                        <button className="orbtn" onClick={() => remove(row.email)} disabled={busy}>
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="orsec">
          <h2>
            Signed in right now <span className="n">{sessions.length}</span>
          </h2>
          {sessions.length === 0 ? (
            <div className="orempty">No live sessions.</div>
          ) : (
            <table className="ortable">
              <thead>
                <tr>
                  <th>Address</th>
                  <th className="hide-sm">Last seen</th>
                  <th>Browser</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.sid}>
                    <td>
                      <span className="em">{s.email}</span>
                      <div className="meta" style={{ marginTop: 5 }}>
                        in since {when(s.createdAt)}
                      </div>
                    </td>
                    <td className="meta hide-sm">{when(s.lastSeen)}</td>
                    <td className="ua">{browser(s.ua)}</td>
                    <td className="act">
                      <button
                        className="orbtn"
                        onClick={() => revoke(s.sid, s.email)}
                        disabled={busy}
                      >
                        Sign out
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <div className="orfoot">
          <span>Sessions last 90 days and renew on use.</span>
          <a href="/oneroof">Open the walk-through &rarr;</a>
        </div>
      </div>
    </div>
  )
}
