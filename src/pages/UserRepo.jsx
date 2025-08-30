import React from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../hook/useAPI";
import { CommitList } from "../components/CommitList";

function UserRepo() {
  const { githubusername, repo } = useParams();

  const { data: submittedData, loading, error } = useApi({
    url: `http://localhost:8000/api/user/bygithubusernameandreponame?username=${githubusername}&repo=${repo}`,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || JSON.stringify(error)}</p>;

  // 🛠 Extract the correct object for CommitList
  const repoData = submittedData?.commits?.[0];
  if (!repoData) return <p>No data found</p>;

  // Shape it for CommitList
  const commitListData = {
    username: repoData.username,
    repo: repoData.repo,
    fetchedAt: repoData.fetchedAt,
    commits: repoData.commits || [],
  };

  return (
    <div className="mt-10">
      <CommitList data={commitListData} />
    </div>
  );
}

export default UserRepo;
