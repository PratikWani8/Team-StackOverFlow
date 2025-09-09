"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Filter, MapPin, Star } from "lucide-react"

const facilityTypes = [
  { id: "recycling", label: "Recycling Centers", count: 12 },
  { id: "composting", label: "Composting Plants", count: 8 },
  { id: "scrap", label: "Scrap Shops", count: 15 },
  { id: "biomethanization", label: "Biomethanization", count: 4 },
  { id: "wte", label: "Waste-to-Energy", count: 3 },
  { id: "hazardous", label: "Hazardous Waste", count: 6 },
]

const services = [
  { id: "plastic", label: "Plastic Recycling" },
  { id: "paper", label: "Paper Recycling" },
  { id: "metal", label: "Metal Recycling" },
  { id: "glass", label: "Glass Recycling" },
  { id: "organic", label: "Organic Waste" },
  { id: "electronics", label: "E-Waste" },
  { id: "medical", label: "Medical Waste" },
  { id: "chemical", label: "Chemical Waste" },
]

export function FacilityFilters() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [distance, setDistance] = useState([10])
  const [minRating, setMinRating] = useState([3])

  const handleTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, typeId])
    } else {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId))
    }
  }

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId])
    } else {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId))
    }
  }

  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedServices([])
    setDistance([10])
    setMinRating([3])
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <span>Filters</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Distance Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Distance</label>
            <Badge variant="secondary">{distance[0]} km</Badge>
          </div>
          <Slider value={distance} onValueChange={setDistance} max={50} min={1} step={1} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 km</span>
            <span>50 km</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Minimum Rating</label>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-sm">{minRating[0]}</span>
            </div>
          </div>
          <Slider value={minRating} onValueChange={setMinRating} max={5} min={1} step={0.5} className="w-full" />
        </div>

        {/* Facility Types */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Facility Types</label>
          <div className="space-y-2">
            {facilityTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                />
                <label htmlFor={type.id} className="text-sm text-foreground flex-1 cursor-pointer">
                  {type.label}
                </label>
                <Badge variant="secondary" className="text-xs">
                  {type.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Services</label>
          <div className="space-y-2">
            {services.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={service.id}
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                />
                <label htmlFor={service.id} className="text-sm text-foreground cursor-pointer">
                  {service.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Current Location */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Current Location</span>
          </div>
          <p className="text-xs text-muted-foreground">Sector 16, Noida, UP</p>
          <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
            Change Location
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
