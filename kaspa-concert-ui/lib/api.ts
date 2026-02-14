/**
 * KaspaConcert API client – REST calls to backend.
 * Base URL from NEXT_PUBLIC_API_URL (default http://localhost:4000).
 */

export function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
}

export interface CreateSessionBody {
  title: string
  streamUrl: string
  creatorAddress: string
}

export interface Session {
  id: string
  title: string
  streamUrl: string
  creatorAddress: string
  status: 'live' | 'ended'
  createdAt: string
  endedAt?: string | null
  totalTips?: number
  tipsCount?: number
}

export interface CreateSessionResponse extends Session {
  shareableUrl?: string
}

export async function createSession(body: CreateSessionBody): Promise<CreateSessionResponse> {
  const res = await fetch(`${getApiUrl()}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || res.statusText || 'Failed to create session')
  }
  return res.json()
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const res = await fetch(`${getApiUrl()}/sessions/${sessionId}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch session')
  return res.json()
}

export async function listSessions(options?: { status?: 'live' | 'ended'; limit?: number }): Promise<Session[]> {
  const params = new URLSearchParams()
  if (options?.status) params.set('status', options.status)
  if (options?.limit) params.set('limit', String(options.limit))
  const qs = params.toString()
  const res = await fetch(`${getApiUrl()}/sessions${qs ? `?${qs}` : ''}`)
  if (!res.ok) throw new Error('Failed to list sessions')
  const data = await res.json()
  return data.sessions ?? []
}

export async function endSession(sessionId: string): Promise<Session> {
  const res = await fetch(`${getApiUrl()}/sessions/${sessionId}/end`, { method: 'PATCH' })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to end session')
  }
  return res.json()
}
