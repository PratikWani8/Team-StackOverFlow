"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, MapPin, Scale, Package, AlertCircle, CheckCircle } from "lucide-react"

interface WasteType {
  id: string
  name: string
  description: string
  color_code: string
}

export function WasteCollectionForm() {
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([])
  const [formData, setFormData] = useState({
    wasteTypeId: "",
    weight: "",
    volume: "",
    location: "",
    notes: "",
    photoUrl: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState<any>(null)

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    const getWasteTypes = async () => {
      const { data, error } = await supabase.from("waste_types").select("*").order("name")
      if (data) setWasteTypes(data)
    }

    getUser()
    getWasteTypes()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.from("waste_collections").insert({
        resident_id: user.id,
        waste_type_id: formData.wasteTypeId,
        weight: formData.weight ? Number.parseFloat(formData.weight) : null,
        volume: formData.volume ? Number.parseFloat(formData.volume) : null,
        location: formData.location,
        notes: formData.notes,
        photo_url: formData.photoUrl,
        status: "scheduled",
        scheduled_date: new Date().toISOString(),
      })

      if (error) throw error

      setSuccess(true)
      setFormData({
        wasteTypeId: "",
        weight: "",
        volume: "",
        location: "",
        notes: "",
        photoUrl: "",
      })

      setTimeout(() => setSuccess(false), 3000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedWasteType = wasteTypes.find((type) => type.id === formData.wasteTypeId)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-emerald-600" />
          <span>Schedule Waste Collection</span>
        </CardTitle>
        <CardDescription>Request pickup for your waste materials</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wasteType">Waste Type</Label>
            <Select
              value={formData.wasteTypeId}
              onValueChange={(value) => setFormData({ ...formData, wasteTypeId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select waste type" />
              </SelectTrigger>
              <SelectContent>
                {wasteTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color_code }}></div>
                      <span>{type.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedWasteType && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{selectedWasteType.description}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center space-x-1">
                <Scale className="h-4 w-4" />
                <span>Weight (kg)</span>
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="0.0"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="volume" className="flex items-center space-x-1">
                <Package className="h-4 w-4" />
                <span>Volume (L)</span>
              </Label>
              <Input
                id="volume"
                type="number"
                step="0.1"
                placeholder="0.0"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Pickup Location</span>
            </Label>
            <Input
              id="location"
              placeholder="Enter pickup address or location details"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any special instructions or additional information..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center space-x-1">
              <Camera className="h-4 w-4" />
              <span>Photo (Optional)</span>
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload photo of waste</p>
              <p className="text-xs text-gray-500">Helps collectors prepare for pickup</p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Collection request submitted successfully! You'll be notified when a collector is assigned.
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading || !user}>
            {isLoading ? "Scheduling..." : "Schedule Collection"}
          </Button>

          {!user && (
            <p className="text-sm text-center text-gray-600">
              Please{" "}
              <a href="/auth/login" className="text-emerald-600 hover:underline">
                sign in
              </a>{" "}
              to schedule collections
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
