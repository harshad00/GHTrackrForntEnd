import { CommitItem } from "./CommitItem";
import { Card } from "./comen/button/Card";
import { GitCommit, Folder, Sparkles } from "lucide-react";

export function CommitList({ data }) {
  // console.log("[CommitList] Rendered with data:", data);

  const formatFetchTime = (dateString) => {
    console.log("[CommitList] Formatting fetch time for:", dateString);
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleAIExplain = () => {
    console.log("[CommitList] Running AI Explain...");
    console.log("[CommitList] Commits array:", data.commits);

    const totalCommits = data.commits.length;

    // Handle file stats only if they exist
    const totalFiles = data.commits.reduce(
      (acc, commit) => acc + (commit.files?.length || 0),
      0
    );

    const totalAdditions = data.commits.reduce(
      (acc, commit) =>
        acc +
        (commit.files?.reduce(
          (fileAcc, file) => fileAcc + (file.additions || 0),
          0
        ) || 0),
      0
    );

    const totalDeletions = data.commits.reduce(
      (acc, commit) =>
        acc +
        (commit.files?.reduce(
          (fileAcc, file) => fileAcc + (file.deletions || 0),
          0
        ) || 0),
      0
    );

    // console.log("[CommitList] Totals:", {
    //   totalCommits,
    //   totalFiles,
    //   totalAdditions,
    //   totalDeletions
    // });

    const recentActivity = data.commits.slice(0, 3);
    const mainActivities = recentActivity.map((commit) => {
      const msg = commit.message.toLowerCase();
      if (msg.includes("test")) return "testing";
      if (msg.includes("fix")) return "bug fixes";
      if (msg.includes("add") || msg.includes("create")) return "new features";
      if (msg.includes("update") || msg.includes("refactor")) return "improvements";
      if (msg.includes("remove") || msg.includes("delete")) return "cleanup";
      return "development";
    });

    const uniqueActivities = [...new Set(mainActivities)];

    // Simple AI summary
    const summary = `Repository ${data.username}/${data.repo} has ${totalCommits} commits.`
      + (totalFiles > 0
        ? ` Affecting ${totalFiles} files (+${totalAdditions}/-${totalDeletions} lines).`
        : "")
      + ` Recent focus: ${uniqueActivities.join(", ")}.`;

    console.log("[AI Explain Summary]", summary);

  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6 bg-accent">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Folder className="h-6 w-6 text-accent-foreground text-white" />
            <h1 className="text-2xl font-bold text-accent-foreground text-white">
              {data.username}/{data.repo}
            </h1>
          </div>
          <button
            onClick={handleAIExplain}
            variant="secondary"
            size="sm"
            className="flex items-center gap-2 borser border-yellow-100 rounded-md "
          >
            <Sparkles className="h-4 w-4 text-wrap" />
            AI Explain
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Last fetched: {formatFetchTime(data.fetchedAt)}</p>
          <p>{data.commits.length} commit{data.commits.length !== 1 ? "s" : ""} found</p>
        </div>
      </Card>

      <div className="flex items-center gap-2">
        <GitCommit className="h-5 w-5 text-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Recent Commits</h2>
      </div>

      <div className="space-y-3">
        {data.commits.length > 0 ? (
          data.commits.map((commit, index) => {
            console.log(`[CommitList] Rendering commit #${index}`, commit);
            return <CommitItem key={commit.sha || index} commit={commit} />;
          })
        ) : (
          <Card className="p-8 text-center">
            <GitCommit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No commits found
            </h3>
            <p className="text-sm text-muted-foreground">
              This repository doesn't have any commits yet.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
