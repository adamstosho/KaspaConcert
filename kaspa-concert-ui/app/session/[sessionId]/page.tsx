import { SessionViewerPage } from '@/components/session-viewer-page'

export default async function SessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params
  return <SessionViewerPage sessionId={sessionId} />
}
