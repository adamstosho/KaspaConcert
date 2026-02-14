/**
 * Kaspa Utilities - Helper functions for Kaspa blockchain operations
 */

/**
 * Validate Kaspa address format
 * Supports all Kaspa networks: mainnet, testnet, devnet, simnet
 */
export function isValidKaspaAddress(address: string): boolean {
  if (!address) return false

  const t = address.trim()

  // Kaspa addresses start with "kaspa:" or "kaspatest:" etc.
  const prefixRegex = /^kaspa(test|dev|sim)?:/
  if (!prefixRegex.test(t)) return false

  // Length check (Testnet addresses can be longer)
  if (t.length < 50 || t.length > 90) return false

  // Check for valid characters (base58 - roughly)
  // allowing the prefix part + valid payload
  const fullRegex = /^kaspa(test|dev|sim)?:[a-z0-9]+$/
  return fullRegex.test(t)
}

export function shortenAddress(address: string, chars: number = 6): string {
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`
}

export function formatKasAmount(amount: number, decimals: number = 4): string {
  return `${amount.toFixed(decimals)} KAS`
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getYouTubeEmbedUrl(url: string): string {
  const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi
  const match = youtubeRegex.exec(url)
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`
  }
  return url
}

export function getTwitchEmbedUrl(url: string): string {
  const twitchRegex = /(?:twitch\.tv\/|twitch\.tv\/videos\/)([a-zA-Z0-9_]+)/
  const match = twitchRegex.exec(url)
  if (match && match[1]) {
    return `https://twitch.tv/embed?channel=${match[1]}`
  }
  return url
}

export function formatTimeElapsed(startDate: Date): string {
  const elapsed = Date.now() - startDate.getTime()
  const seconds = Math.floor(elapsed / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  } else {
    return `${seconds}s`
  }
}

export function calculateSessionStats(tips: Array<{ amount: number; timestamp: Date }>) {
  const totalAmount = tips.reduce((sum, tip) => sum + tip.amount, 0)
  const tipCount = tips.length
  const avgTip = tipCount > 0 ? totalAmount / tipCount : 0

  return {
    totalAmount,
    tipCount,
    avgTip,
  }
}

export function getTopTippers(tips: Array<{ from: string; amount: number }>, limit: number = 5) {
  const tippersMap = new Map<string, number>()

  tips.forEach((tip) => {
    const current = tippersMap.get(tip.from) || 0
    tippersMap.set(tip.from, current + tip.amount)
  })

  return Array.from(tippersMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, amount]) => ({ name, amount }))
}

export function generateShareUrl(sessionId: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/session/${sessionId}`
  }
  return `https://kaspaconcert.app/session/${sessionId}`
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  }

  // Fallback for older browsers
  return new Promise((resolve, reject) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)

    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      resolve()
    } catch (err) {
      document.body.removeChild(textArea)
      reject(err)
    }
  })
}
