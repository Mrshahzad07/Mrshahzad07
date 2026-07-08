import { useGithubEvents } from "@/api/queries"
import { GitHubEvent } from "@/types/github"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { GitCommit, GitPullRequest, BookmarkPlus, Star, MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"

export function ActivityTimeline() {
  const { data: events, isLoading } = useGithubEvents()

  if (isLoading) {
    return (
      <Card className="bg-background/40 backdrop-blur-sm border-primary/20">
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!events) return null;

  const getEventIcon = (type: string) => {
    switch (type) {
      case "PushEvent": return <GitCommit className="w-4 h-4 text-violet-500" />
      case "PullRequestEvent": return <GitPullRequest className="w-4 h-4 text-teal-400" />
      case "CreateEvent": return <BookmarkPlus className="w-4 h-4 text-amber-400" />
      case "WatchEvent": return <Star className="w-4 h-4 text-amber-300" />
      case "IssueCommentEvent": return <MessageSquare className="w-4 h-4 text-blue-400" />
      default: return <GitCommit className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getEventText = (event: GitHubEvent) => {
    const repoName = event.repo.name.replace("Mrshahzad07/", "");
    switch (event.type) {
      case "PushEvent": return <span>Pushed to <span className="font-medium text-foreground">{repoName}</span></span>
      case "PullRequestEvent": return <span>{event.payload.action === 'opened' ? 'Opened' : 'Updated'} PR in <span className="font-medium text-foreground">{repoName}</span></span>
      case "CreateEvent": return <span>Created {event.payload.ref_type || 'repo'} in <span className="font-medium text-foreground">{repoName}</span></span>
      case "WatchEvent": return <span>Starred <span className="font-medium text-foreground">{repoName}</span></span>
      case "IssueCommentEvent": return <span>Commented on issue in <span className="font-medium text-foreground">{repoName}</span></span>
      default: return <span>Activity in <span className="font-medium text-foreground">{repoName}</span></span>
    }
  }

  return (
    <Card className="bg-background/40 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="font-display">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {events.slice(0, 6).map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                 {getEventIcon(event.type)}
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-background/50 hover:border-primary/30 transition-colors shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">
                  {getEventText(event)}
                </div>
                <time className="text-xs font-medium text-primary/60">{formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}</time>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
