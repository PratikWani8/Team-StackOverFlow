import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Recycle, Users, BookOpen, BarChart3, MapPin, Shield } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Mandatory Training",
    description: "Comprehensive waste management education for every citizen",
  },
  {
    icon: Users,
    title: "Community Monitoring",
    description: "Green Champions network for decentralized oversight",
  },
  {
    icon: BarChart3,
    title: "Real-time Tracking",
    description: "Monitor waste collection and processing in real-time",
  },
  {
    icon: MapPin,
    title: "Facility Locator",
    description: "Find recycling centers and waste management facilities",
  },
  {
    icon: Shield,
    title: "Compliance System",
    description: "Incentives and penalties for proper waste segregation",
  },
  {
    icon: Recycle,
    title: "Digital Integration",
    description: "Complete app-based ecosystem for waste management",
  },
]

const stats = [
  { value: "1.7L", label: "Tonnes Daily Waste", sublabel: "Generated in India" },
  { value: "54%", label: "Scientifically Treated", sublabel: "Current Processing Rate" },
  { value: "46%", label: "Unaccounted Waste", sublabel: "Needs Better Management" },
]

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            Government Initiative for Sustainable India
          </Badge>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Transform India's <span className="text-primary">Waste Management</span> Crisis
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty max-w-2xl mx-auto">
            A comprehensive digital platform connecting citizens, waste workers, and administrators to create a cleaner,
            more sustainable India through mandatory training, community monitoring, and real-time tracking.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="text-base">
              Start Training Now
            </Button>
            <Button variant="outline" size="lg" className="text-base bg-transparent">
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary font-heading">{stat.value}</div>
                <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.sublabel}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground font-heading mb-12">
            Comprehensive Solution Features
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
