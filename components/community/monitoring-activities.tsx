"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  Users,
  Recycle,
  Truck,
  Factory,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
} from "lucide-react"

const monitoringStages = [
  {
    id: "training",
    title: "Training Monitoring",
    icon: Users,
    description: "Track citizen training completion and effectiveness",
    metrics: {
      completed: 1247,
      target: 1500,
      compliance: 83,
    },
    activities: [
      { area: "Sector 15", status: "completed", progress: 95, issues: 2 },
      { area: "Green Park", status: "in-progress", progress: 67, issues: 5 },
      { area: "CP Area", status: "pending", progress: 23, issues: 8 },
    ],
  },
  {
    id: "generation",
    title: "Waste Generation",
    icon: Recycle,
    description: "Monitor source segregation and waste generation patterns",
    metrics: {
      segregated: 78,
      target: 85,
      compliance: 78,
    },
    activities: [
      { area: "Residential", status: "good", progress: 82, issues: 3 },
      { area: "Commercial", status: "needs-attention", progress: 65, issues: 12 },
      { area: "Industrial", status: "critical", progress: 45, issues: 18 },
    ],
  },
  {
    id: "collection",
    title: "Waste Collection",
    icon: Truck,
    description: "Track collection efficiency and schedule adherence",
    metrics: {
      collected: 92,
      target: 95,
      compliance: 92,
    },
    activities: [
      { area: "Zone A", status: "excellent", progress: 98, issues: 1 },
      { area: "Zone B", status: "good", progress: 89, issues: 4 },
      { area: "Zone C", status: "needs-attention", progress: 76, issues: 7 },
    ],
  },
  {
    id: "treatment",
    title: "Waste Treatment",
    icon: Factory,
    description: "Monitor processing facilities and treatment efficiency",
    metrics: {
      processed: 54,
      target: 70,
      compliance: 54,
    },
    activities: [
      { area: "Biomethanization", status: "operational", progress: 67, issues: 2 },
      { area: "Recycling Center", status: "maintenance", progress: 34, issues: 6 },
      { area: "Composting Unit", status: "operational", progress: 78, issues: 1 },
    ],
  },
  {
    id: "disposal",
    title: "Waste Disposal",
    icon: Trash2,
    description: "Monitor final disposal and landfill management",
    metrics: {
      disposed: 24,
      target: 20,
      compliance: 76,
    },
    activities: [
      { area: "Landfill Site 1", status: "over-capacity", progress: 110, issues: 8 },
      { area: "Landfill Site 2", status: "normal", progress: 67, issues: 2 },
      { area: "Hazardous Disposal", status: "compliant", progress: 45, issues: 0 },
    ],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
    case "excellent":
    case "operational":
    case "compliant":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "good":
    case "normal":
      return <CheckCircle className="h-4 w-4 text-blue-600" />
    case "in-progress":
    case "needs-attention":
    case "maintenance":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "pending":
    case "critical":
    case "over-capacity":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
    case "excellent":
    case "operational":
    case "compliant":
      return "bg-green-100 text-green-800"
    case "good":
    case "normal":
      return "bg-blue-100 text-blue-800"
    case "in-progress":
    case "needs-attention":
    case "maintenance":
      return "bg-yellow-100 text-yellow-800"
    case "pending":
    case "critical":
    case "over-capacity":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function MonitoringActivities() {
  const [activeTab, setActiveTab] = useState("training")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-primary" />
          <span>Monitoring Activities</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Comprehensive monitoring across all waste management stages</p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            {monitoringStages.map((stage) => (
              <TabsTrigger key={stage.id} value={stage.id} className="text-xs">
                <stage.icon className="h-3 w-3 mr-1" />
                {stage.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {monitoringStages.map((stage) => (
            <TabsContent key={stage.id} value={stage.id} className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">{stage.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{stage.description}</p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary font-heading">
                      {stage.metrics.completed ||
                        stage.metrics.segregated ||
                        stage.metrics.collected ||
                        stage.metrics.processed ||
                        stage.metrics.disposed}
                      %
                    </div>
                    <div className="text-xs text-muted-foreground">Current</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-muted-foreground font-heading">{stage.metrics.target}%</div>
                    <div className="text-xs text-muted-foreground">Target</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent font-heading">{stage.metrics.compliance}%</div>
                    <div className="text-xs text-muted-foreground">Compliance</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium text-foreground">Area Performance</h5>
                {stage.activities.map((activity, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(activity.status)}
                        <span className="font-medium text-foreground">{activity.area}</span>
                      </div>
                      <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{activity.progress}%</span>
                      </div>
                      <Progress value={activity.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{activity.issues} issues reported</span>
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
