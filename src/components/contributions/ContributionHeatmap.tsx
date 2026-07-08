import { useGithubContributions } from "@/api/queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

export function ContributionHeatmap() {
  const { data: calendar, isLoading, error } = useGithubContributions()

  if (isLoading) {
    return (
      <Card className="bg-background/40 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle>Contribution Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error || !calendar) {
    return (
      <Card className="bg-background/40 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle>Contribution Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 text-muted-foreground border border-dashed border-border rounded-md">
            Provide a GitHub Token in .env to view contribution data.
          </div>
        </CardContent>
      </Card>
    )
  }

  // Get max contributions to normalize color scale
  let maxCount = 1;
  calendar.weeks.forEach((week: any) => {
    week.contributionDays.forEach((day: any) => {
      if (day.contributionCount > maxCount) maxCount = day.contributionCount;
    })
  })

  const getOpacity = (count: number) => {
    if (count === 0) return 0.1;
    return Math.max(0.3, Math.min(1, count / (maxCount * 0.7))); // *0.7 to saturate earlier
  }

  return (
    <Card className="bg-background/40 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-display">Contributions</CardTitle>
        <div className="text-sm text-muted-foreground">
          <span className="font-bold text-primary">{calendar.totalContributions}</span> contributions in the last year
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto pb-4 pt-4 custom-scrollbar">
          <div className="flex gap-1 min-w-max">
            {calendar.weeks.map((week: any, i: number) => (
              <div key={i} className="flex flex-col gap-1">
                {week.contributionDays.map((day: any, j: number) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (i * 0.01) + (j * 0.01) }}
                    key={day.date}
                    className="w-3 h-3 rounded-sm bg-violet-500"
                    style={{ opacity: getOpacity(day.contributionCount) }}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
