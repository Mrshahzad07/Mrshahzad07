import { useGithubRepos, useGithubEvents, useGithubContributions } from "@/api/queries"
import { deriveAchievements } from "@/lib/derive-achievements"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { GitMerge, Code2, Flame, Star } from "lucide-react"

const iconMap: Record<string, any> = {
  "git-merge": GitMerge,
  "code": Code2,
  "flame": Flame,
  "star": Star
}

export function AchievementsStrip() {
  const { data: repos } = useGithubRepos()
  const { data: events } = useGithubEvents()
  const { data: contributions } = useGithubContributions()

  if (!repos || !events) return null;

  const achievements = deriveAchievements(repos, events, contributions);

  if (achievements.length === 0) return null;

  return (
    <div className="py-8 mt-4 border-t border-border/40">
      <h2 className="text-2xl font-display font-bold mb-6">Achievements</h2>
      <div className="flex flex-wrap gap-4">
        {achievements.map((ach, i) => {
          const Icon = iconMap[ach.icon] || Star;
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            >
              <Card className="bg-background/40 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors shadow-sm">
                <CardContent className="p-4 flex items-center gap-4 pr-8">
                  <div className={`p-2.5 rounded-full ${ach.bg} ${ach.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{ach.title}</h4>
                    <p className="text-xs text-muted-foreground">{ach.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
