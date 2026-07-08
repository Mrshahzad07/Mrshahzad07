import { useGithubContributions } from "@/api/queries"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Flame, Trophy } from "lucide-react"

export function StreakCounter() {
  const { data: calendar, isLoading, error } = useGithubContributions()

  if (isLoading || error || !calendar) {
    return (
      <div className="flex gap-4 w-full">
        <Skeleton className="h-24 flex-1" />
        <Skeleton className="h-24 flex-1" />
      </div>
    )
  }

  const allDays = calendar.weeks.flatMap((w: any) => w.contributionDays)
  
  let longestStreak = 0;
  let currentStreakCounter = 0;
  
  for (let i = 0; i < allDays.length; i++) {
    if (allDays[i].contributionCount > 0) {
      currentStreakCounter++;
      if (currentStreakCounter > longestStreak) {
        longestStreak = currentStreakCounter;
      }
    } else {
      currentStreakCounter = 0;
    }
  }

  let currentStreak = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].contributionCount > 0) {
      currentStreak++;
    } else if (i !== allDays.length - 1) { 
      // If today is 0, we check if yesterday was > 0. If yesterday is also 0, streak is broken.
      // If we are looking at past days (not today) and count is 0, break.
      break;
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <Card className="flex-1 bg-background/40 backdrop-blur-sm border-amber-500/20 hover:border-amber-500/50 transition-colors">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-full text-amber-500">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold font-display">{currentStreak}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 bg-background/40 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Longest Streak</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold font-display">{longestStreak}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
