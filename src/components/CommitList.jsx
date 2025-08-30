import { CommitItem } from "./CommitItem";
import { Card } from "./comen/button/Card";
import { GitCommit, Folder, Sparkles } from "lucide-react";
import { useApi } from "../hook/useAPI";
import { useNavigate } from "react-router-dom";

export function CommitList({ data }) {
  const navigate = useNavigate();
  // Fetch AI summary at component load
  const {
    data: commitSummary,
    loading,
    error,
  } = useApi({
    url: `http://localhost:8000/api/summar/summary?repo=${data.repo}`,
    method: "GET",
  });

  const formatFetchTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleAIExplain = () => {
    if (loading) {
      console.log("[CommitList] Loading commit summary...");
      return;
    }
    else if (error) {
      console.error("[CommitList] Error fetching commit summary:", error);
      return;
    }
    // console.log("[CommitList] Fetched commit summary:", commitSummary);
       navigate(`/user-repo-AIsummary/${data.repo}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6 bg-accent">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Folder className="h-6 w-6 text-white" />
            <h1 className="text-2xl font-bold text-white">
              {data.username}/{data.repo}
            </h1>
          </div>
          <button
            onClick={handleAIExplain}
            className="flex items-center gap-2 border border-yellow-100 rounded-md px-3 py-1"
          >
            <Sparkles className="h-4 w-4" />
            AI Explain
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Last fetched: {formatFetchTime(data.fetchedAt)}</p>
          <p>
            {data.commits.length} commit
            {data.commits.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </Card>

      <div className="flex items-center gap-2">
        <GitCommit className="h-5 w-5 text-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Recent Commits</h2>
      </div>

      <div className="space-y-3">
        {data.commits.length > 0 ? (
          data.commits.map((commit, index) => (
            <CommitItem key={commit.sha || index} commit={commit} />
          ))
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
