"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, Clock, Star } from "lucide-react"

const facilities = [
  {
    id: 1,
    name: "Green Valley Recycling Center",
    type: "Recycling Center",
    address: "Sector 18, Noida, UP",
    distance: "2.3 km",
    rating: 4.5,
    phone: "+91 98765 43210",
    hours: "9:00 AM - 6:00 PM",
    services: ["Plastic", "Paper", "Metal", "Glass"],
    coordinates: { lat: 28.5355, lng: 77.391 },
  },
  {
    id: 2,
    name: "EcoWaste Composting Facility",
    type: "Composting Plant",
    address: "Industrial Area, Ghaziabad",
    distance: "5.7 km",
    rating: 4.2,
    phone: "+91 98765 43211",
    hours: "8:00 AM - 5:00 PM",
    services: ["Organic Waste", "Garden Waste"],
    coordinates: { lat: 28.6692, lng: 77.4538 },
  },
  {
    id: 3,
    name: "Delhi Scrap Collection Hub",
    type: "Scrap Shop",
    address: "Connaught Place, New Delhi",
    distance: "8.1 km",
    rating: 4.0,
    phone: "+91 98765 43212",
    hours: "10:00 AM - 8:00 PM",
    services: ["Electronics", "Appliances", "Furniture"],
    coordinates: { lat: 28.6315, lng: 77.2167 },
  },
  {
    id: 4,
    name: "Biomethanization Plant - Sector 15",
    type: "Biomethanization",
    address: "Sector 15, Noida, UP",
    distance: "3.2 km",
    rating: 4.3,
    phone: "+91 98765 43213",
    hours: "24/7 Operations",
    services: ["Organic Waste Processing", "Biogas Production"],
    coordinates: { lat: 28.5672, lng: 77.3507 },
  },
  {
    id: 5,
    name: "Waste-to-Energy Plant",
    type: "W-to-E Plant",
    address: "Greater Noida Industrial Area",
    distance: "12.5 km",
    rating: 4.1,
    phone: "+91 98765 43214",
    hours: "24/7 Operations",
    services: ["Energy Generation", "Waste Processing"],
    coordinates: { lat: 28.4595, lng: 77.5026 },
  },
  {
    id: 6,
    name: "HazWaste Safe Disposal",
    type: "Hazardous Waste",
    address: "Industrial Zone, Faridabad",
    distance: "18.3 km",
    rating: 4.4,
    phone: "+91 98765 43215",
    hours: "9:00 AM - 4:00 PM",
    services: ["Chemical Waste", "Medical Waste", "E-Waste"],
    coordinates: { lat: 28.4089, lng: 77.3178 },
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case "Recycling Center":
      return "bg-green-100 text-green-800"
    case "Composting Plant":
      return "bg-blue-100 text-blue-800"
    case "Scrap Shop":
      return "bg-purple-100 text-purple-800"
    case "Biomethanization":
      return "bg-yellow-100 text-yellow-800"
    case "W-to-E Plant":
      return "bg-red-100 text-red-800"
    case "Hazardous Waste":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function FacilityMap() {
  const [selectedFacility, setSelectedFacility] = useState<number | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Facility Map</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Interactive map showing waste management facilities near you</p>
      </CardHeader>
      <CardContent>
        {/* Map Placeholder */}
        <div className="relative h-64 bg-muted rounded-lg mb-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive Map</p>
              <p className="text-sm text-muted-foreground">Showing {facilities.length} facilities nearby</p>
            </div>
          </div>

          {/* Map Markers Simulation */}
          <div className="absolute top-4 left-4">
            <Button size="sm" variant="outline" className="bg-background">
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </div>

          <div className="absolute bottom-4 right-4">
            <Badge variant="secondary">Current Location: Sector 16, Noida</Badge>
          </div>
        </div>

        {/* Nearby Facilities Quick View */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Nearby Facilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {facilities.slice(0, 4).map((facility) => (
              <div
                key={facility.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedFacility === facility.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                }`}
                onClick={() => setSelectedFacility(facility.id === selectedFacility ? null : facility.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-foreground text-sm">{facility.name}</h5>
                    <p className="text-xs text-muted-foreground">{facility.address}</p>
                  </div>
                  <Badge className={getTypeColor(facility.type)}>{facility.type}</Badge>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span>{facility.rating}</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{facility.distance}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-auto p-0">
                    <Navigation className="h-3 w-3 mr-1" />
                    Directions
                  </Button>
                </div>

                {selectedFacility === facility.id && (
                  <div className="mt-3 pt-3 border-t space-y-2">
                    <div className="flex items-center space-x-2 text-xs">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{facility.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{facility.hours}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {facility.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
