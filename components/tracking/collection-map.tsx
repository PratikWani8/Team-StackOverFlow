"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Truck, Navigation, Clock, Phone, MessageSquare } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface ActiveCollection {
  id: string
  collector_name: string
  vehicle_number: string
  current_location: {
    lat: number
    lng: number
  }
  estimated_arrival: string
  status: "en_route" | "nearby" | "arrived"
  contact_number?: string
  collection_address: string
  waste_type: string
}

export function CollectionMap() {
  const [activeCollections, setActiveCollections] = useState<ActiveCollection[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchActiveCollections()
    // Set up real-time updates
    const interval = setInterval(fetchActiveCollections, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchActiveCollections = async () => {
    try {
      const { data, error } = await supabase
        .from("waste_collections")
        .select(`
          *,
          waste_types(name, color_code),
          collector:profiles!collector_id(full_name, phone)
        `)
        .in("status", ["in_progress", "en_route"])
        .order("scheduled_date", { ascending: true })

      if (error) throw error

      // Mock location data for demo purposes
      const collectionsWithLocation = (data || []).map((collection) => ({
        id: collection.id,
        collector_name: collection.collector?.full_name || "Unknown Collector",
        vehicle_number: `WM-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        current_location: {
          lat: 40.7128 + (Math.random() - 0.5) * 0.1,
          lng: -74.006 + (Math.random() - 0.5) * 0.1,
        },
        estimated_arrival: new Date(Date.now() + Math.random() * 3600000).toISOString(),
        status: ["en_route", "nearby", "arrived"][Math.floor(Math.random() * 3)] as "en_route" | "nearby" | "arrived",
        contact_number: collection.collector?.phone,
        collection_address: collection.location || "Address not specified",
        waste_type: collection.waste_types?.name || "General Waste",
      }))

      setActiveCollections(collectionsWithLocation)
    } catch (error) {
      console.error("Error fetching active collections:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "arrived":
        return "bg-green-100 text-green-800 border-green-200"
      case "nearby":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "arrived":
        return <MapPin className="h-4 w-4 text-green-500" />
      case "nearby":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Truck className="h-4 w-4 text-blue-500" />
    }
  }

  const getEstimatedArrival = (arrivalTime: string) => {
    const now = new Date()
    const arrival = new Date(arrivalTime)
    const diffMinutes = Math.floor((arrival.getTime() - now.getTime()) / (1000 * 60))

    if (diffMinutes < 0) return "Arrived"
    if (diffMinutes < 60) return `${diffMinutes} min`
    return `${Math.floor(diffMinutes / 60)}h ${diffMinutes % 60}m`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Collection Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Live Collection Tracking
        </CardTitle>
        <CardDescription>Track active waste collection vehicles in real-time</CardDescription>
      </CardHeader>
      <CardContent>
        {activeCollections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No active collections at the moment.</p>
            <p className="text-sm mt-2">Collections will appear here when they're in progress.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Map Placeholder */}
            <div className="relative h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 font-medium">Interactive Map</p>
                <p className="text-sm text-gray-400">Real-time vehicle locations would appear here</p>
              </div>

              {/* Mock map markers */}
              {activeCollections.slice(0, 3).map((collection, index) => (
                <div
                  key={collection.id}
                  className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-110 ${
                    collection.status === "arrived"
                      ? "bg-green-500"
                      : collection.status === "nearby"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + index * 15}%`,
                  }}
                  onClick={() => setSelectedCollection(collection.id)}
                />
              ))}
            </div>

            {/* Active Collections List */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
                Active Collections ({activeCollections.length})
              </h4>

              {activeCollections.map((collection) => (
                <div
                  key={collection.id}
                  className={`border rounded-lg p-4 transition-all cursor-pointer ${
                    selectedCollection === collection.id ? "border-emerald-500 bg-emerald-50" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedCollection(selectedCollection === collection.id ? null : collection.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(collection.status)}
                      <Badge className={getStatusColor(collection.status)}>{collection.status.replace("_", " ")}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ETA: {getEstimatedArrival(collection.estimated_arrival)}
                      </div>
                      <div className="text-xs text-gray-500">{collection.vehicle_number}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Truck className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Collector:</span>
                        {collection.collector_name}
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Address:</span>
                        {collection.collection_address}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                        <span className="font-medium">Type:</span>
                        {collection.waste_type}
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Scheduled:</span>
                        {new Date(collection.estimated_arrival).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>

                  {selectedCollection === collection.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        {collection.contact_number && (
                          <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                            <Phone className="h-4 w-4" />
                            Call Collector
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                          <MessageSquare className="h-4 w-4" />
                          Send Message
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                          <Navigation className="h-4 w-4" />
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
