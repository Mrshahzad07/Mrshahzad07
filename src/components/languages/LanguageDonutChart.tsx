import { useGithubRepos } from "@/api/queries"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const COLORS = ['#8b5cf6', '#2dd4bf', '#fbbf24', '#f43f5e', '#3b82f6', '#10b981'];

export function LanguageDonutChart() {
  const { data: repos, isLoading } = useGithubRepos()

  if (isLoading) {
    return (
      <Card className="bg-background/40 backdrop-blur-sm border-primary/20">
         <CardHeader><CardTitle>Language Distribution</CardTitle></CardHeader>
         <CardContent><Skeleton className="h-[300px] w-full rounded-full" /></CardContent>
      </Card>
    )
  }

  if (!repos) return null;

  const languageMap = new Map<string, number>();
  repos.forEach(repo => {
    if (repo.language) {
      languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1);
    }
  });

  const data = Array.from(languageMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return (
    <Card className="bg-background/40 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-display">Language Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
           {data.map((entry, index) => (
             <div key={entry.name} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span>{entry.name}</span>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  )
}
