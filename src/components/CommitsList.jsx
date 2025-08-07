import React from "react";
import { useGithubCommits } from "../hook/useGithubCommits";

const CommitList = ({ username, repo }) => {
  const { commits, loading, error } = useGithubCommits(username, repo);

  if (!username || !repo) return null; // avoid fetch with empty values
  if (loading) return <p>Loading commits...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ol>
      {commits.map((commit, idx) => (
        <li key={idx}> { idx + 1}: {commit.message}</li>
      ))}
    </ol>
  );
};

export default CommitList;
18002090365
18002090365.