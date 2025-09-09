"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Truck, Weight, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface Collection {
  id: string
  scheduled_date: string
  actual_collection_date?: string
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
  waste_type: string
  estimated_weight?: number
  actual_weight?: number
  collection_address: string
  collector_name?: string
  notes?: string
}

export function CollectionHistory() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "completed" | "scheduled" | "cancelled">("all")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchCollections()
  }, [filter])

  const fetchCollections = async () => {
    try {
      let query = supabase
        .from("waste_collections")
        .select(`
          *,
          waste_types(name, color),
          user_profiles(full_name)
        `)
        .order("scheduled_date", { ascending: false })

      if (filter !== "all") {
        query = query.eq("status", filter)
      }

      const { data, error } = await query

      if (error) throw error
      setCollections(data || [])
    } catch (error) {
      console.error("Error fetching collections:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Collection History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
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
          <Truck className="h-5 w-5" />
          Collection History
        </CardTitle>
        <CardDescription>Track your waste collection requests and their status</CardDescription>
        <div className="flex gap-2 mt-4">
          {(["all", "completed", "scheduled", "cancelled"] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {collections.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No collections found for the selected filter.</p>
            </div>
          ) : (
            collections.map((collection) => (
              <div key={collection.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(collection.status)}
                    <Badge className={getStatusColor(collection.status)}>{collection.status.replace("_", " ")}</Badge>
                  </div>
                  <div className="text-sm text-gray-500">#{collection.id.slice(0, 8)}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Scheduled:</span>
                      {new Date(collection.scheduled_date).toLocaleDateString()}
                    </div>

                    {collection.actual_collection_date && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Collected:</span>
                        {new Date(collection.actual_collection_date).toLocaleDateString()}
                      </div>
                    )}

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

                    {(collection.estimated_weight || collection.actual_weight) && (
                      <div className="flex items-center gap-2 text-sm">
                        <Weight className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Weight:</span>
                        {collection.actual_weight
                          ? `${collection.actual_weight} kg (actual)`
                          : `${collection.estimated_weight} kg (estimated)`}
                      </div>
                    )}

                    {collection.collector_name && (
                      <div className="flex items-center gap-2 text-sm">
                        <Truck className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Collector:</span>
                        {collection.collector_name}
                      </div>
                    )}
                  </div>
                </div>

                {collection.notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">{collection.notes}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
