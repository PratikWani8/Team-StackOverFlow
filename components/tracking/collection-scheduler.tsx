"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Truck, User } from "lucide-react"

interface Collection {
  id: string
  waste_type_id: string
  weight: number
  location: string
  scheduled_date: string
  status: string
  waste_types: {
    name: string
    color_code: string
  }
  collection_routes?: {
    name: string
    collector_id: string
    profiles: {
      full_name: string
    }
  }
}

export function CollectionScheduler() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        await getCollections(user.id)
      }
      setIsLoading(false)
    }

    getUser()
  }, [supabase])

  const getCollections = async (userId: string) => {
    const { data, error } = await supabase
      .from("waste_collections")
      .select(`
        *,
        waste_types (name, color_code),
        collection_routes (
          name,
          collector_id,
          profiles (full_name)
        )
      `)
      .eq("resident_id", userId)
      .in("status", ["scheduled", "in_progress"])
      .order("scheduled_date", { ascending: true })

    if (data) setCollections(data)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "collected":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <span>Scheduled Collections</span>
        </CardTitle>
        <CardDescription>Your upcoming waste pickups</CardDescription>
      </CardHeader>
      <CardContent>
        {collections.length === 0 ? (
          <div className="text-center py-8">
            <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No scheduled collections</p>
            <p className="text-sm text-gray-500">Schedule your first pickup using the form</p>
          </div>
        ) : (
          <div className="space-y-4">
            {collections.map((collection) => (
              <div key={collection.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: collection.waste_types.color_code }}
                    ></div>
                    <div>
                      <h4 className="font-medium">{collection.waste_types.name}</h4>
                      <p className="text-sm text-gray-600">{collection.weight} kg</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(collection.status)}>{collection.status.replace("_", " ")}</Badge>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(collection.scheduled_date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{collection.location}</span>
                  </div>
                  {collection.collection_routes && (
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Collector: {collection.collection_routes.profiles.full_name}</span>
                    </div>
                  )}
                </div>

                {collection.status === "scheduled" && (
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
