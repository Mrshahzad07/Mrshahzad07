import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Star, GitFork, Pin } from "lucide-react"

export function PinnedRepoCard({ repo }: { repo: any }) {
  return (
    <a href={repo.url} target="_blank" rel="noreferrer" className="block h-full transition-transform hover:-translate-y-1">
      <Card className="h-full flex flex-col bg-background/60 backdrop-blur-md border-primary/30 hover:border-primary/50 transition-colors shadow-sm hover:shadow-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none">
           <Pin className="h-12 w-12 rotate-45 text-primary" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-display truncate text-primary font-bold pr-10">{repo.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pb-2 relative z-10">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {repo.description || "No description provided."}
          </p>
        </CardContent>
        <CardFooter className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border/40 mt-2 pb-3">
          <div className="flex items-center gap-3 mt-2">
            {repo.primaryLanguage && (
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color || "#8b5cf6" }}></span>
                <span className="font-medium text-foreground">{repo.primaryLanguage.name}</span>
              </div>
            )}
            <div className="flex items-center gap-1 hover:text-amber-400 transition-colors">
              <Star className="w-4 h-4" />
              <span>{repo.stargazerCount}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-primary transition-colors">
              <GitFork className="w-4 h-4" />
              <span>{repo.forkCount}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </a>
  )
}
