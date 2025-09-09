"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Star, MapPin, Phone, Mail } from "lucide-react"

const greenChampions = [
  {
    id: 1,
    name: "Priya Sharma",
    area: "Sector 15, Noida",
    level: "Senior Champion",
    rating: 4.8,
    activeSince: "2023",
    reportsHandled: 156,
    avatar: "/professional-woman.png",
    contact: {
      phone: "+91 98765 43210",
      email: "priya.sharma@email.com",
    },
    specialties: ["Training", "Monitoring"],
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    area: "Green Park Extension",
    level: "Champion",
    rating: 4.6,
    activeSince: "2023",
    reportsHandled: 89,
    avatar: "/professional-man.png",
    contact: {
      phone: "+91 98765 43211",
      email: "rajesh.kumar@email.com",
    },
    specialties: ["Community Events", "Compliance"],
  },
  {
    id: 3,
    name: "Anita Verma",
    area: "Connaught Place",
    level: "New Champion",
    rating: 4.4,
    activeSince: "2024",
    reportsHandled: 34,
    avatar: "/professional-woman-2.png",
    contact: {
      phone: "+91 98765 43212",
      email: "anita.verma@email.com",
    },
    specialties: ["Education", "Outreach"],
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "Senior Champion":
      return "bg-purple-100 text-purple-800"
    case "Champion":
      return "bg-blue-100 text-blue-800"
    case "New Champion":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function GreenChampions() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Green Champions</span>
          </CardTitle>
          <Button variant="outline" size="sm" className="bg-transparent">
            Become Champion
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Community leaders monitoring waste management in their areas</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {greenChampions.map((champion) => (
            <div key={champion.id} className="p-4 border rounded-lg">
              <div className="flex items-start space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={champion.avatar || "/placeholder.svg"} alt={champion.name} />
                  <AvatarFallback>
                    {champion.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{champion.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground">{champion.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 mb-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{champion.area}</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={getLevelColor(champion.level)}>{champion.level}</Badge>
                    <span className="text-xs text-muted-foreground">Active since {champion.activeSince}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {champion.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground mb-3">{champion.reportsHandled} reports handled</div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Phone className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Mail className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Become a Green Champion</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Lead waste management initiatives in your community and make a real difference.
          </p>
          <Button size="sm" className="w-full">
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
