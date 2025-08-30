import React from "react";
import { useApi } from "../hook/useAPI.js";
import { useParams } from "react-router-dom";
import { CommitHeader } from "../components/CommitHeader.jsx";
import { CommitStats } from "../components/CommitStats.jsx";
import { CommitCard } from "../components/CommitCard.jsx";

function AiSummary() {
  const { repo } = useParams();

 const { data, error, loading } = useApi({
  url: `${import.meta.env.VITE_BACKEND_URL}/api/summar/summarybyrepo?repo=${repo}`,
});


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No summary data available for repo: {repo}</p>;
  }

  return (
    <div className="min-h-screen bg-background">
      <CommitHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Commit Stats from API data */}
        <CommitStats commits={data} />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Repo Summary: {repo}
            </h2>
            <span className="text-sm text-muted-foreground">
              {data.length} entries found
            </span>
          </div>

          <div className="grid gap-6">
            {data.map((commit) => (
              <CommitCard key={commit._id} commit={commit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiSummary;
