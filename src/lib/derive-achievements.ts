import { GitHubRepo, GitHubEvent } from "@/types/github";

export function deriveAchievements(repos: GitHubRepo[], events: GitHubEvent[], contributions: any) {
  const achievements = [];

  // 1. Open Source Contributor
  const hasForks = repos.some(r => r.fork);
  const hasExternalPRs = events.some(e => e.type === "PullRequestEvent" && !e.repo.name.includes("Mrshahzad07"));
  if (hasForks || hasExternalPRs) {
    achievements.push({
      id: "opensource",
      title: "Open Source Contributor",
      description: "Contributed to external repositories",
      icon: "git-merge",
      color: "text-teal-400",
      bg: "bg-teal-400/10"
    });
  }

  // 2. Polyglot
  const languages = new Set(repos.filter(r => r.language).map(r => r.language));
  if (languages.size >= 5) {
    achievements.push({
      id: "polyglot",
      title: "Polyglot",
      description: `${languages.size} languages used across repos`,
      icon: "code",
      color: "text-violet-500",
      bg: "bg-violet-500/10"
    });
  }

  // 3. 100+ Contributions
  if (contributions && contributions.totalContributions > 100) {
    achievements.push({
      id: "100-contributions",
      title: "Active Contributor",
      description: `${contributions.totalContributions} contributions this year`,
      icon: "flame",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    });
  }

  // 4. Stargazer
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  if (totalStars > 50) {
    achievements.push({
      id: "stargazer",
      title: "Stargazer",
      description: `Earned ${totalStars} stars on public repos`,
      icon: "star",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10"
    });
  }

  return achievements;
}
