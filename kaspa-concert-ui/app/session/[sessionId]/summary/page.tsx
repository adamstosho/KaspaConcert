import { SessionSummaryPageClient } from '@/components/session-summary-page'

export default async function SessionSummaryPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params
  return <SessionSummaryPageClient sessionId={sessionId} />
}
