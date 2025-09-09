"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Truck, MapPin, Clock, Route, Search } from "lucide-react"

const vehicles = [
  {
    id: "WM001",
    type: "Collection Truck",
    area: "Sector 15, Noida",
    status: "active",
    lastUpdate: "2 min ago",
    nextStop: "Block A, Sector 16",
    eta: "15 min",
    capacity: "75%",
  },
  {
    id: "WM002",
    type: "Recycling Van",
    area: "Connaught Place",
    status: "active",
    lastUpdate: "5 min ago",
    nextStop: "Janpath Market",
    eta: "8 min",
    capacity: "45%",
  },
  {
    id: "WM003",
    type: "Hazardous Waste",
    area: "Industrial Area",
    status: "maintenance",
    lastUpdate: "1 hour ago",
    nextStop: "Service Center",
    eta: "N/A",
    capacity: "0%",
  },
  {
    id: "WM004",
    type: "Compost Truck",
    area: "Green Park",
    status: "active",
    lastUpdate: "1 min ago",
    nextStop: "Compost Facility",
    eta: "25 min",
    capacity: "90%",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "maintenance":
      return "bg-red-100 text-red-800"
    case "idle":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function VehicleTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Truck className="h-5 w-5 text-primary" />
          <span>Vehicle Tracking</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Real-time tracking of waste collection vehicles in your area</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by vehicle ID, area, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedVehicle === vehicle.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                }`}
                onClick={() => setSelectedVehicle(vehicle.id === selectedVehicle ? null : vehicle.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{vehicle.id}</h4>
                      <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Area:</span>
                    <span className="font-medium">{vehicle.area}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Updated:</span>
                    <span className="font-medium">{vehicle.lastUpdate}</span>
                  </div>
                </div>

                {selectedVehicle === vehicle.id && (
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Next Stop:</span>
                      <span className="font-medium">{vehicle.nextStop}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">ETA:</span>
                      <span className="font-medium">{vehicle.eta}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium">{vehicle.capacity}</span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Route className="h-4 w-4 mr-2" />
                        View Route
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <MapPin className="h-4 w-4 mr-2" />
                        Track Live
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-8">
              <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No vehicles found matching your search.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
