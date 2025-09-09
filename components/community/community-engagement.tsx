"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Users, MessageSquare, Trophy, Target } from "lucide-react"

const engagementMetrics = [
  {
    title: "Photo Reports",
    value: 234,
    target: 300,
    icon: Camera,
    color: "text-blue-600",
  },
  {
    title: "Active Participants",
    value: 1247,
    target: 1500,
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Forum Discussions",
    value: 89,
    target: 100,
    icon: MessageSquare,
    color: "text-purple-600",
  },
]

const recentActivities = [
  {
    type: "photo_report",
    user: "Amit Singh",
    action: "reported illegal dumping",
    location: "Sector 18",
    time: "2 hours ago",
    status: "resolved",
  },
  {
    type: "training",
    user: "Sunita Devi",
    action: "completed composting training",
    location: "Online",
    time: "4 hours ago",
    status: "completed",
  },
  {
    type: "community_event",
    user: "Green Champions Team",
    action: "organized cleaning drive",
    location: "Central Park",
    time: "1 day ago",
    status: "successful",
  },
  {
    type: "forum",
    user: "Ravi Gupta",
    action: "started discussion on recycling",
    location: "Community Forum",
    time: "2 days ago",
    status: "active",
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "photo_report":
      return <Camera className="h-4 w-4 text-blue-600" />
    case "training":
      return <Target className="h-4 w-4 text-green-600" />
    case "community_event":
      return <Users className="h-4 w-4 text-purple-600" />
    case "forum":
      return <MessageSquare className="h-4 w-4 text-orange-600" />
    default:
      return <Users className="h-4 w-4 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "resolved":
    case "completed":
    case "successful":
      return "bg-green-100 text-green-800"
    case "active":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function CommunityEngagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span>Community Engagement</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Engagement Metrics */}
        <div className="space-y-4">
          {engagementMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {metric.value} / {metric.target}
                </span>
              </div>
              <Progress value={(metric.value / metric.target) * 100} className="h-2" />
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Recent Activities</h4>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                      {activity.location} • {activity.time}
                    </p>
                    <Badge className={getStatusColor(activity.status)} variant="secondary">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Quick Actions</h4>
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" size="sm" className="justify-start bg-transparent">
              <Camera className="h-4 w-4 mr-2" />
              Report Waste Issue
            </Button>
            <Button variant="outline" size="sm" className="justify-start bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Join Discussion
            </Button>
            <Button variant="outline" size="sm" className="justify-start bg-transparent">
              <Trophy className="h-4 w-4 mr-2" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
