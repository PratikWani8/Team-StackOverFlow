"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building, Phone, Clock, Star, Navigation, Search, MapPin } from "lucide-react"

const allFacilities = [
  {
    id: 1,
    name: "Green Valley Recycling Center",
    type: "Recycling Center",
    address: "Sector 18, Noida, UP 201301",
    distance: "2.3 km",
    rating: 4.5,
    phone: "+91 98765 43210",
    email: "info@greenvalley.com",
    hours: "9:00 AM - 6:00 PM",
    services: ["Plastic Recycling", "Paper Recycling", "Metal Recycling", "Glass Recycling"],
    description: "Leading recycling facility with state-of-the-art equipment for processing various waste materials.",
    verified: true,
  },
  {
    id: 2,
    name: "EcoWaste Composting Facility",
    type: "Composting Plant",
    address: "Industrial Area, Ghaziabad, UP 201009",
    distance: "5.7 km",
    rating: 4.2,
    phone: "+91 98765 43211",
    email: "contact@ecowaste.com",
    hours: "8:00 AM - 5:00 PM",
    services: ["Organic Waste Processing", "Garden Waste", "Food Waste Composting"],
    description: "Specialized in converting organic waste into high-quality compost for agricultural use.",
    verified: true,
  },
  {
    id: 3,
    name: "Delhi Scrap Collection Hub",
    type: "Scrap Shop",
    address: "Connaught Place, New Delhi 110001",
    distance: "8.1 km",
    rating: 4.0,
    phone: "+91 98765 43212",
    email: "delhi.scrap@gmail.com",
    hours: "10:00 AM - 8:00 PM",
    services: ["Electronics Scrap", "Appliances", "Furniture", "Metal Scrap"],
    description: "Comprehensive scrap collection and processing center with competitive pricing.",
    verified: false,
  },
  {
    id: 4,
    name: "Biomethanization Plant - Sector 15",
    type: "Biomethanization",
    address: "Sector 15, Noida, UP 201301",
    distance: "3.2 km",
    rating: 4.3,
    phone: "+91 98765 43213",
    email: "operations@biomethane.gov.in",
    hours: "24/7 Operations",
    services: ["Organic Waste Processing", "Biogas Production", "Slurry Generation"],
    description: "Government-operated facility converting organic waste into clean energy and fertilizer.",
    verified: true,
  },
  {
    id: 5,
    name: "Waste-to-Energy Plant",
    type: "W-to-E Plant",
    address: "Greater Noida Industrial Area, UP 201310",
    distance: "12.5 km",
    rating: 4.1,
    phone: "+91 98765 43214",
    email: "info@wte-plant.com",
    hours: "24/7 Operations",
    services: ["Energy Generation", "Waste Processing", "Ash Management"],
    description: "Modern waste-to-energy facility generating clean electricity from municipal solid waste.",
    verified: true,
  },
  {
    id: 6,
    name: "HazWaste Safe Disposal",
    type: "Hazardous Waste",
    address: "Industrial Zone, Faridabad, HR 121003",
    distance: "18.3 km",
    rating: 4.4,
    phone: "+91 98765 43215",
    email: "safety@hazwaste.com",
    hours: "9:00 AM - 4:00 PM",
    services: ["Chemical Waste", "Medical Waste", "E-Waste", "Battery Disposal"],
    description: "Certified facility for safe disposal of hazardous and toxic waste materials.",
    verified: true,
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

export function FacilityList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedFacility, setExpandedFacility] = useState<number | null>(null)

  const filteredFacilities = allFacilities.filter(
    (facility) =>
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building className="h-5 w-5 text-primary" />
          <span>All Facilities</span>
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search facilities, services, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredFacilities.map((facility) => (
            <div key={facility.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{facility.name}</h4>
                    {facility.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    <span>{facility.address}</span>
                    <span>•</span>
                    <span>{facility.distance}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{facility.rating}</span>
                  </div>
                  <Badge className={getTypeColor(facility.type)}>{facility.type}</Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{facility.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {facility.services.slice(0, 4).map((service, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
                {facility.services.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{facility.services.length - 4} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{facility.hours}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>{facility.phone}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setExpandedFacility(expandedFacility === facility.id ? null : facility.id)}
                    className="bg-transparent"
                  >
                    {expandedFacility === facility.id ? "Less Info" : "More Info"}
                  </Button>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Navigation className="h-3 w-3 mr-1" />
                    Directions
                  </Button>
                  <Button size="sm">Contact</Button>
                </div>
              </div>

              {expandedFacility === facility.id && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <div>
                    <h5 className="font-medium text-foreground mb-2">All Services</h5>
                    <div className="flex flex-wrap gap-1">
                      {facility.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-1">Contact Information</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Phone: {facility.phone}</div>
                      <div>Email: {facility.email}</div>
                      <div>Hours: {facility.hours}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFacilities.length === 0 && (
          <div className="text-center py-8">
            <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No facilities found matching your search.</p>
            <Button variant="outline" className="mt-2 bg-transparent" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
