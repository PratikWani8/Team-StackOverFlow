import { Navigation } from "@/components/navigation"
import { TrainingDashboard } from "@/components/training/training-dashboard"
import { TrainingModules } from "@/components/training/training-modules"

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Citizen Training Program</h1>
          <p className="text-muted-foreground text-lg">
            Master waste management through our comprehensive training modules
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TrainingModules />
          </div>
          <div className="lg:col-span-1">
            <TrainingDashboard />
          </div>
        </div>
      </main>
    </div>
  )
}
