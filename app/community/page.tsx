import { Navigation } from "@/components/navigation"
import { CommunityOverview } from "@/components/community/community-overview"
import { GreenChampions } from "@/components/community/green-champions"
import { CommunityEngagement } from "@/components/community/community-engagement"
import { MonitoringActivities } from "@/components/community/monitoring-activities"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Community Monitoring Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Empowering Green Champions and citizens to monitor and improve waste management in their communities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CommunityOverview />
            <MonitoringActivities />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <GreenChampions />
            <CommunityEngagement />
          </div>
        </div>
      </main>
    </div>
  )
}
