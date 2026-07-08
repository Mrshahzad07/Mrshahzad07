import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/hero/HeroSection"
import { ContributionHeatmap } from "@/components/contributions/ContributionHeatmap"
import { StreakCounter } from "@/components/contributions/StreakCounter"
import { PinnedRepos } from "@/components/repos/PinnedRepos"
import { RepoGrid } from "@/components/repos/RepoGrid"
import { LanguageDonutChart } from "@/components/languages/LanguageDonutChart"
import { TechStackCloud } from "@/components/languages/TechStackCloud"
import { ActivityTimeline } from "@/components/activity/ActivityTimeline"
import { AchievementsStrip } from "@/components/achievements/AchievementsStrip"
import { motion, useScroll, useSpring } from "framer-motion"
import { GITHUB_USERNAME } from "@/lib/constants"
import { useEffect } from "react"

const queryClient = new QueryClient()

function DashboardContent() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    document.title = `${GITHUB_USERNAME} | GitHub Dashboard`
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />
      <Header />
      <main className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <HeroSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <ContributionHeatmap />
            <StreakCounter />
          </div>
          <div className="lg:col-span-1">
            <ActivityTimeline />
          </div>
        </div>

        <PinnedRepos />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          <LanguageDonutChart />
          <TechStackCloud />
        </div>

        <RepoGrid />
        
        <AchievementsStrip />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  )
}

export default App
