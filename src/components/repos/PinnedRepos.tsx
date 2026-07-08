import { useGithubPinnedRepos } from "@/api/queries"
import { PinnedRepoCard } from "./PinnedRepoCard"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { Pin } from "lucide-react"

export function PinnedRepos() {
  const { data: pinnedRepos, isLoading, error } = useGithubPinnedRepos()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 mt-12">
        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
          <Pin className="h-5 w-5" /> Pinned Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !pinnedRepos || pinnedRepos.length === 0) return null

  return (
    <div className="flex flex-col gap-6 mt-12">
      <h2 className="text-2xl font-display font-bold flex items-center gap-2 text-primary">
        <Pin className="h-5 w-5" /> Pinned Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pinnedRepos.map((repo: any, i: number) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="h-full"
          >
            <PinnedRepoCard repo={repo} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
