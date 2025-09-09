"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Target, TrendingUp, Award, Calendar, MapPin } from "lucide-react"

const communityStats = [
  {
    title: "Active Green Champions",
    value: "45",
    target: "50",
    progress: 90,
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Areas Monitored",
    value: "12",
    target: "15",
    progress: 80,
    icon: MapPin,
    color: "text-blue-600",
  },
  {
    title: "Citizens Trained",
    value: "1,247",
    target: "1,500",
    progress: 83,
    icon: Target,
    color: "text-purple-600",
  },
  {
    title: "Compliance Rate",
    value: "78%",
    target: "85%",
    progress: 78,
    icon: TrendingUp,
    color: "text-emerald-600",
  },
]

const upcomingEvents = [
  {
    title: "Community Cleaning Drive",
    date: "Tomorrow",
    time: "8:00 AM",
    location: "Sector 15 Park",
    participants: 25,
    type: "cleaning",
  },
  {
    title: "Waste Segregation Workshop",
    date: "Dec 15",
    time: "10:00 AM",
    location: "Community Center",
    participants: 40,
    type: "training",
  },
  {
    title: "Green Champion Meeting",
    date: "Dec 18",
    time: "6:00 PM",
    location: "Municipal Office",
    participants: 15,
    type: "meeting",
  },
]

const getEventColor = (type: string) => {
  switch (type) {
    case "cleaning":
      return "bg-green-100 text-green-800"
    case "training":
      return "bg-blue-100 text-blue-800"
    case "meeting":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function CommunityOverview() {
  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Community Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityStats.map((stat, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-sm font-medium text-foreground">{stat.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stat.value} / {stat.target}
                  </span>
                </div>
                <Progress value={stat.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current: {stat.value}</span>
                  <span>Target: {stat.target}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Community Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Upcoming Community Events</span>
            </CardTitle>
            <Button variant="outline" size="sm" className="bg-transparent">
              Schedule Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary">{event.date}</div>
                    <div className="text-xs text-muted-foreground">{event.time}</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{event.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getEventColor(event.type)}>{event.type}</Badge>
                  <div className="text-xs text-muted-foreground mt-1">{event.participants} participants</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
