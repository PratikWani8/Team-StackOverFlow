import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Eye } from "lucide-react"

const recentReports = [
  {
    id: "RPT001",
    type: "Illegal Dumping",
    location: "Sector 18, Noida",
    time: "2 hours ago",
    status: "investigating",
    urgency: "high",
  },
  {
    id: "RPT002",
    type: "Overflowing Bins",
    location: "CP Metro Station",
    time: "4 hours ago",
    status: "resolved",
    urgency: "medium",
  },
  {
    id: "RPT003",
    type: "Missed Collection",
    location: "Green Park Ext",
    time: "6 hours ago",
    status: "in-progress",
    urgency: "low",
  },
  {
    id: "RPT004",
    type: "Hazardous Waste",
    location: "Industrial Area",
    time: "8 hours ago",
    status: "pending",
    urgency: "critical",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "resolved":
      return "bg-green-100 text-green-800"
    case "investigating":
      return "bg-blue-100 text-blue-800"
    case "in-progress":
      return "bg-yellow-100 text-yellow-800"
    case "pending":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "critical":
      return "bg-red-200 text-red-900"
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function RecentReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
        <p className="text-sm text-muted-foreground">Latest waste management reports from your area</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentReports.map((report) => (
            <div key={report.id} className="p-3 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-foreground text-sm">{report.type}</h4>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{report.location}</span>
                  </div>
                </div>
                <Badge className={getUrgencyColor(report.urgency)}>{report.urgency}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{report.time}</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Reports
        </Button>
      </CardContent>
    </Card>
  )
}
