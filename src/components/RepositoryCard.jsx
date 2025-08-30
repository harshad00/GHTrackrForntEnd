import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./comen/button/Card";
import { Badge } from "./comen/button/Badge";
import { GitBranch, Calendar, User, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const RepositoryCard = ({ repository }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleFetchClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true); // ✅ show popup instead of fetching
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 cursor-pointer">
        <Link to={`/user-repo-AIsummary/${repository.repo}`} className="block">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {repository.repo}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{repository.username}</span>
                </div>
              </div>

              <Badge variant="secondary" className="shrink-0">
                <GitBranch className="h-3 w-3 mr-1" />
                {repository.commits?.length || 0} commits
              </Badge>
            </div>
          </CardHeader>
        </Link>

        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last fetched: {formatDate(repository.fetchedAt)}</span>
            </div>

            <div className="w-full flex justify-center">
              <button
                onClick={handleFetchClick}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                <span>Fetch Yesterday Commits</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✅ Simple Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-yellow-300 mb-4">🚧 Under Development</h2>
            <p className="mb-6 text-gray-700">
              This feature is currently under development. Please check back later.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RepositoryCard;
