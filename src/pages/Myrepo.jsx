import React from "react";
import { useApi } from "../hook/useAPI";
import { Badge } from "../components/comen/button/Badge";
import { GitCommit, Database } from "lucide-react";
import RepositoryCard from "../components/RepositoryCard";


function Myrepo({ user }) {
  console.log("User:", user?._id);

  if (!user) {
    return <p>Please log in to view your repositories.</p>;
  }
console.log(`${import.meta.env.VITE_BACKEND_URL}/api/user/all?userId=${user._id}`);

 const { data, loading, error } = useApi({
   url: `${import.meta.env.VITE_BACKEND_URL}/api/user/all?userId=${user._id}`,
   
   
});


  if (loading) return <p>Loading...</p>;
  if (error) {
  return (
    <p className="mt-20 text-center text-red-500 font-medium">
      No repositories found. Please add a repository.
    </p>
  );
}
  
  // console.log(data);
  const { commits} = data || {};
  const repositories = commits || [];
  const totalCommits = repositories.reduce(
    (acc, repo) => acc + (repo.commits?.length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground">
                Repository Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor and manage your GitHub repositories
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                <Database className="h-4 w-4 mr-1" />
                {repositories.length} repositories
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <GitCommit className="h-4 w-4 mr-1" />
                {totalCommits} total commits
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-12 py-8">
        {repositories.length === 0 ? (
          <div className="text-center py-12 ">
            <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <Database className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No repositories found
            </h3>
            <p className="text-muted-foreground mb-4">
              Start by adding some repositories to monitor.
            </p>
            {/* <Button className=" text-white bg-blue-400" >Add Repository</Button> */}

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repository) => (
              <RepositoryCard key={repository._id} repository={repository} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Myrepo;
