import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Truck, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const stats = [
  {
    title: "Active Vehicles",
    value: "24",
    change: "+2",
    trend: "up",
    icon: Truck,
    color: "text-green-600",
  },
  {
    title: "Reports Today",
    value: "18",
    change: "-5",
    trend: "down",
    icon: AlertTriangle,
    color: "text-blue-600",
  },
  {
    title: "Resolved Issues",
    value: "156",
    change: "+12",
    trend: "up",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Pending Actions",
    value: "7",
    change: "0",
    trend: "neutral",
    icon: Clock,
    color: "text-yellow-600",
  },
]

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-3 w-3 text-green-600" />
    case "down":
      return <TrendingDown className="h-3 w-3 text-red-600" />
    default:
      return <Minus className="h-3 w-3 text-gray-600" />
  }
}

const getTrendColor = (trend: string) => {
  switch (trend) {
    case "up":
      return "text-green-600"
    case "down":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export function TrackingStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracking Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(stat.trend)}
                  <span className={`text-xs ${getTrendColor(stat.trend)}`}>{stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium text-foreground mb-3">Collection Schedule</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Next Collection:</span>
              <Badge variant="secondary">Tomorrow 8:00 AM</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Recycling Day:</span>
              <Badge variant="secondary">Friday</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Hazardous Waste:</span>
              <Badge variant="secondary">1st Saturday</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
