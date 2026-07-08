import { GitHubRepo } from "@/types/github"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, GitFork, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer" className="block h-full transition-transform hover:-translate-y-1">
      <Card className="h-full flex flex-col bg-background/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors shadow-sm hover:shadow-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-display truncate text-primary/90">{repo.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pb-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {repo.description || "No description provided."}
          </p>
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {repo.topics.slice(0, 3).map(topic => (
                <Badge key={topic} variant="secondary" className="text-[10px] text-primary/80 bg-primary/10 border-primary/20">{topic}</Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border/40 mt-2 pb-3">
          <div className="flex items-center gap-3 mt-2">
            {repo.language && (
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                <span>{repo.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1 hover:text-amber-400 transition-colors">
              <Star className="w-3.5 h-3.5" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-primary transition-colors">
              <GitFork className="w-3.5 h-3.5" />
              <span>{repo.forks_count}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
             <Clock className="w-3 h-3" />
             <span>{formatDistanceToNow(new Date(repo.pushed_at), { addSuffix: true })}</span>
          </div>
        </CardFooter>
      </Card>
    </a>
  )
}
