import { cookies } from 'next/headers'
import { COOKIE_NAME, isOwner, readSession } from './auth'

/**
 * The current /oneroof session, or null. Safe to call from a server component
 * or a route handler.
 */
export async function currentSession() {
  try {
    return await readSession(cookies().get(COOKIE_NAME)?.value)
  } catch {
    return null
  }
}

/**
 * Owner-only gate for the invite console.
 *
 * A non-owner gets 404, not 403. Confirming that /oneroof/admin exists tells a
 * stranger there is something worth attacking, and it tells an invited viewer
 * there is an admin surface they are not supposed to see. Neither is useful to
 * them, so the honest answer is "there is no such page."
 */
export async function requireOwner() {
  const session = await currentSession()
  return session && isOwner(session.email) ? session : null
}
