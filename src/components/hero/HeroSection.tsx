import { useGithubUser, useGithubRepos } from "@/api/queries"
import { StatChip } from "./StatChip"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, BookMarked, Star, Code2 } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const { data: user, isLoading: isUserLoading } = useGithubUser()
  const { data: repos, isLoading: isReposLoading } = useGithubRepos()

  const totalStars = repos?.reduce((acc, repo) => acc + repo.stargazers_count, 0) || 0

  if (isUserLoading || isReposLoading) {
    return (
      <div className="py-12 md:py-20 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-16 w-full max-w-lg" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="py-12 md:py-20 flex flex-col gap-10">
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={user.avatar_url}
            alt={user.name}
            className="h-32 w-32 rounded-full border-4 border-primary/20 shadow-lg shadow-primary/20 object-cover"
          />
        </motion.div>
        
        <div className="flex flex-col max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-2"
          >
            {user.name}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2 text-primary font-medium mb-4 text-lg"
          >
            <Code2 className="h-5 w-5" />
            <span>AI/ML Engineer & Full Stack Developer</span>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            {user.bio}
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatChip
          icon={<BookMarked className="h-5 w-5" />}
          label="Public Repos"
          value={user.public_repos}
          delay={0.4}
        />
        <StatChip
          icon={<Users className="h-5 w-5" />}
          label="Followers"
          value={user.followers}
          delay={0.5}
        />
        <StatChip
          icon={<Users className="h-5 w-5" />}
          label="Following"
          value={user.following}
          delay={0.6}
        />
        <StatChip
          icon={<Star className="h-5 w-5 text-amber-400" />}
          label="Total Stars"
          value={totalStars}
          delay={0.7}
        />
      </div>
    </div>
  )
}
