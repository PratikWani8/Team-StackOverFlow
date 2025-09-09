"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, Clock, CheckCircle, Star } from "lucide-react"

const userProgress = {
  completedModules: 3,
  totalModules: 6,
  currentStreak: 7,
  certificatesEarned: 1,
  totalPoints: 450,
}

const achievements = [
  { name: "First Steps", description: "Complete your first module", earned: true },
  { name: "Segregation Master", description: "Perfect score on waste sorting", earned: true },
  { name: "Eco Warrior", description: "Complete all basic modules", earned: false },
  { name: "Community Leader", description: "Share knowledge with others", earned: false },
]

export function TrainingDashboard() {
  const progressPercentage = (userProgress.completedModules / userProgress.totalModules) * 100

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span>Your Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Modules Completed</span>
              <span>
                {userProgress.completedModules}/{userProgress.totalModules}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary font-heading">{userProgress.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary font-heading">{userProgress.totalPoints}</div>
              <div className="text-xs text-muted-foreground">Points Earned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-primary" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {achievement.earned ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{achievement.name}</div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full bg-transparent" variant="outline">
            Download Certificate
          </Button>
          <Button className="w-full bg-transparent" variant="outline">
            Shop Training Kits
          </Button>
          <Button className="w-full bg-transparent" variant="outline">
            Join Community Forum
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
