import { Card, CardContent, CardHeader, CardTitle } from "./comen/button/Card";
import { GitCommit, Package, Clock, TrendingUp } from "lucide-react";

export const CommitStats = ({ commits }) => {
  const totalCommits = commits.reduce((sum, commit) => sum + commit.totalCommits, 0);
  const totalRepos = new Set(commits.map((commit) => commit.repo)).size;
  const latestVersion = Math.max(...commits.map((commit) => commit.version));
  const totalUsers = new Set(commits.map((commit) => commit.githubusername)).size;

  const stats = [
    {
      title: "Total Commits",
      value: totalCommits.toLocaleString(),
      icon: GitCommit,
      color: "text-primary",
    },
    {
      title: "Repositories",
      value: totalRepos.toString(),
      icon: Package,
      color: "text-success",
    },
    {
      title: "Latest Version",
      value: `v${latestVersion}`,
      icon: TrendingUp,
      color: "text-warning",
    },
    {
      title: "Contributors",
      value: totalUsers.toString(),
      icon: Clock,
      color: "text-accent",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300"
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
