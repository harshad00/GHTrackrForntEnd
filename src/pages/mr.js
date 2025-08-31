import React from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../hook/useAPI";
import { CommitList } from "../components/CommitList";

function UserRepo() {
  const { githubusername, repo } = useParams();

  // console.log("📌 Params:", { githubusername, repo });

  const { data: submittedData, loading, error } = useApi({
    url: `${import.meta.env.VITE_BACKEND_URL}/api/user/bygithubusernameandreponame?userId=${githubusername}&repo=${repo}`,
  });

  // console.log("📌 API Raw Data:", submittedData);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("❌ API Fetch Error:", error);
    return <p>Error: {error.message || JSON.stringify(error)}</p>;
  }

  // ✅ Transform API data into the format CommitList expects
  const commitListData = {
    commits: submittedData?.commits || [],
  };

  // console.log("🔹 Data passed to CommitList:", commitListData);

  return (
    <div className="mt-10">
      {commitListData.commits.length > 0 ? (
        <CommitList data={commitListData} />
      ) : (
        <p>No commits found</p>
      )}
    </div>
  );
}

export default UserRepo;
