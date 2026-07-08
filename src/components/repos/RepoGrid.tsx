import { useGithubRepos } from "@/api/queries"
import { RepoCard } from "./RepoCard"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function RepoGrid() {
  const { data: repos, isLoading } = useGithubRepos()
  const [filter, setFilter] = useState("all") // all, sources, forks
  const [visibleCount, setVisibleCount] = useState(6)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    )
  }

  if (!repos) return null

  const filteredRepos = repos.filter(repo => {
    if (filter === "sources") return !repo.fork
    if (filter === "forks") return repo.fork
    return true
  }).sort((a, b) => b.stargazers_count - a.stargazers_count) // Default sort by stars

  const displayedRepos = filteredRepos.slice(0, visibleCount)

  return (
    <div className="flex flex-col gap-6 mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-display font-bold">Repositories</h2>
        <div className="flex gap-2 bg-background/50 p-1 rounded-md border border-border/50">
          <Button 
            variant={filter === "all" ? "default" : "ghost"} 
            size="sm" 
            className="h-8"
            onClick={() => { setFilter("all"); setVisibleCount(6); }}
          >
            All
          </Button>
          <Button 
            variant={filter === "sources" ? "default" : "ghost"} 
            size="sm" 
            className="h-8"
            onClick={() => { setFilter("sources"); setVisibleCount(6); }}
          >
            Sources
          </Button>
          <Button 
            variant={filter === "forks" ? "default" : "ghost"} 
            size="sm" 
            className="h-8"
            onClick={() => { setFilter("forks"); setVisibleCount(6); }}
          >
            Forks
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {displayedRepos.map((repo, i) => (
            <motion.div
              key={repo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="h-full"
            >
              <RepoCard repo={repo} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < filteredRepos.length && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" className="border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-primary" onClick={() => setVisibleCount(v => v + 6)}>
            Show More Repositories
          </Button>
        </div>
      )}
    </div>
  )
}
