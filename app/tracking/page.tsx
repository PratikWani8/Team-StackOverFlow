import { Navigation } from "@/components/navigation"
import { WasteCollectionForm } from "@/components/tracking/waste-collection-form"
import { CollectionScheduler } from "@/components/tracking/collection-scheduler"
import { VehicleTracker } from "@/components/tracking/vehicle-tracker"
import { CollectionHistory } from "@/components/tracking/collection-history"
import { TrackingStats } from "@/components/tracking/tracking-stats"
import { CollectionMap } from "@/components/tracking/collection-map"

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Waste Tracking System</h1>
          <p className="text-muted-foreground text-lg">
            Schedule pickups, track collections, and monitor waste processing in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WasteCollectionForm />
              <CollectionScheduler />
            </div>
            <CollectionMap />
            <VehicleTracker />
          </div>
          <div className="xl:col-span-1 space-y-8">
            <TrackingStats />
            <CollectionHistory />
          </div>
        </div>
      </main>
    </div>
  )
}
