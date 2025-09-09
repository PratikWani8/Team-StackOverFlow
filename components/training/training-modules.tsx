"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Play, CheckCircle, Clock, Recycle, Leaf, Home, Truck, Users, Award } from "lucide-react"

const trainingModules = [
  {
    id: 1,
    title: "Waste Types & Classification",
    description: "Learn about different types of waste and their environmental impact",
    icon: Recycle,
    duration: "15 min",
    lessons: 4,
    completed: true,
    progress: 100,
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Source Segregation Techniques",
    description: "Master the art of separating waste at the source for better management",
    icon: Leaf,
    duration: "20 min",
    lessons: 5,
    completed: true,
    progress: 100,
    difficulty: "Beginner",
  },
  {
    id: 3,
    title: "Home Composting Methods",
    description: "Create nutrient-rich compost from organic waste in your home",
    icon: Home,
    duration: "25 min",
    lessons: 6,
    completed: true,
    progress: 100,
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "Plastic Reuse & Recycling",
    description: "Innovative ways to reuse plastic materials and reduce environmental impact",
    icon: Recycle,
    duration: "18 min",
    lessons: 4,
    completed: false,
    progress: 60,
    difficulty: "Intermediate",
  },
  {
    id: 5,
    title: "Waste Collection Systems",
    description: "Understanding municipal waste collection and your role as a citizen",
    icon: Truck,
    duration: "12 min",
    lessons: 3,
    completed: false,
    progress: 0,
    difficulty: "Beginner",
  },
  {
    id: 6,
    title: "Community Leadership",
    description: "Become a Green Champion and lead waste management in your area",
    icon: Users,
    duration: "30 min",
    lessons: 7,
    completed: false,
    progress: 0,
    difficulty: "Advanced",
  },
]

export function TrainingModules() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-foreground">Training Modules</h2>
        <Badge variant="secondary" className="text-sm">
          Mandatory for All Citizens
        </Badge>
      </div>

      <div className="grid gap-6">
        {trainingModules.map((module) => (
          <Card key={module.id} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <module.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {module.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                  <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{module.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{module.lessons} lessons</span>
                    </span>
                  </div>
                  <span>{module.progress}% complete</span>
                </div>

                <Progress value={module.progress} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {module.completed ? (
                      <Button variant="outline" size="sm">
                        <Award className="h-4 w-4 mr-2" />
                        View Certificate
                      </Button>
                    ) : (
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        {module.progress > 0 ? "Continue" : "Start Module"}
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Training Kit Section */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5 text-primary" />
            <span>Essential Training Kits</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-background rounded-lg">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Recycle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">3-Bin Segregation Kit</h4>
                <p className="text-sm text-muted-foreground">Dry, Wet & Hazardous waste bins</p>
                <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                  Order Now
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-background rounded-lg">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Home Composting Kit</h4>
                <p className="text-sm text-muted-foreground">Complete setup for organic waste</p>
                <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
