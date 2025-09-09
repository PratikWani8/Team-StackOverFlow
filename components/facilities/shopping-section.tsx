"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Truck, Shield } from "lucide-react"

const products = [
  {
    id: 1,
    name: "3-Bin Segregation Kit",
    description: "Complete set of color-coded bins for dry, wet, and hazardous waste",
    price: 1299,
    originalPrice: 1599,
    rating: 4.5,
    reviews: 234,
    image: "/waste-segregation-bins.jpg",
    features: ["Color-coded", "Durable plastic", "Easy to clean", "Government approved"],
    inStock: true,
    delivery: "Free delivery in 2-3 days",
  },
  {
    id: 2,
    name: "Home Composting Kit",
    description: "Everything you need to start composting organic waste at home",
    price: 899,
    originalPrice: 1199,
    rating: 4.3,
    reviews: 156,
    image: "/home-composting-kit.jpg",
    features: ["Complete setup", "Instruction manual", "Starter materials", "Odor-free design"],
    inStock: true,
    delivery: "Free delivery in 3-5 days",
  },
  {
    id: 3,
    name: "Waste Weighing Scale",
    description: "Digital scale to track and monitor your daily waste generation",
    price: 599,
    originalPrice: 799,
    rating: 4.1,
    reviews: 89,
    image: "/digital-weighing-scale.jpg",
    features: ["Digital display", "Battery operated", "Compact design", "Easy to use"],
    inStock: false,
    delivery: "Back in stock soon",
  },
  {
    id: 4,
    name: "Eco-Friendly Garbage Bags",
    description: "Biodegradable garbage bags for responsible waste disposal",
    price: 299,
    originalPrice: 399,
    rating: 4.4,
    reviews: 312,
    image: "/biodegradable-garbage-bags.jpg",
    features: ["Biodegradable", "Strong & durable", "Various sizes", "Eco-certified"],
    inStock: true,
    delivery: "Free delivery in 1-2 days",
  },
]

export function ShoppingSection() {
  const [cart, setCart] = useState<number[]>([])

  const addToCart = (productId: number) => {
    setCart([...cart, productId])
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((id) => id !== productId))
  }

  const isInCart = (productId: number) => cart.includes(productId)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <span>Waste Management Utilities</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{cart.length} items in cart</Badge>
            <Button size="sm" variant="outline" className="bg-transparent">
              View Cart
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Essential tools and kits for effective waste management</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-medium text-foreground">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-foreground">₹{product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Truck className="h-3 w-3" />
                  <span>{product.delivery}</span>
                </div>

                <div className="flex space-x-2">
                  {product.inStock ? (
                    <>
                      {isInCart(product.id) ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(product.id)}
                          className="flex-1 bg-transparent"
                        >
                          Remove from Cart
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => addToCart(product.id)} className="flex-1">
                          Add to Cart
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Buy Now
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" disabled className="flex-1">
                      Out of Stock
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">Government Certified Products</span>
          </div>
          <p className="text-sm text-muted-foreground">
            All products are certified by the Ministry of Environment and comply with waste management regulations.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
