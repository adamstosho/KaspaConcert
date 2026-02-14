import { CreatorDashboardPage } from '@/components/creator-dashboard-page'

export default async function CreatorDashboard({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params
  return <CreatorDashboardPage sessionId={sessionId} />
}
