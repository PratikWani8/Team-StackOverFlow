import { Navigation } from "@/components/navigation"
import { FacilityMap } from "@/components/facilities/facility-map"
import { FacilityList } from "@/components/facilities/facility-list"
import { ShoppingSection } from "@/components/facilities/shopping-section"
import { FacilityFilters } from "@/components/facilities/facility-filters"

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Facility Locator & Shopping</h1>
          <p className="text-muted-foreground text-lg">
            Find waste management facilities near you and shop for essential waste management utilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FacilityFilters />
          </div>
          <div className="lg:col-span-3 space-y-8">
            <FacilityMap />
            <ShoppingSection />
            <FacilityList />
          </div>
        </div>
      </main>
    </div>
  )
}
