import { useState } from "react";
import { ExternalLink, FileText, Calendar, User, Plus, Minus, Edit3, ChevronDown, ChevronUp, Code } from "lucide-react";
import { Card } from "./comen/button/Card";
import { Badge } from "./comen/button/Badge";

export function CommitItem({ commit }) {
  const [isOpen, setIsOpen] = useState(false); // 👈 dropdown state

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
  };

  const getFileStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'added':
        return <Plus className="h-3 w-3 text-github-green" />;
      case 'deleted':
        return <Minus className="h-3 w-3 text-github-red" />;
      case 'modified':
        return <Edit3 className="h-3 w-3 text-github-blue" />;
      default:
        return <FileText className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getFileStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'added':
        return 'text-github-green';
      case 'deleted':
        return 'text-github-red';
      case 'modified':
        return 'text-github-blue';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTotalChanges = () => {
    if (!commit.files) return { additions: 0, deletions: 0 };
    return commit.files.reduce(
      (acc, file) => ({
        additions: acc.additions + (file.additions || 0),
        deletions: acc.deletions + (file.deletions || 0),
      }),
      { additions: 0, deletions: 0 }
    );
  };

  const shortSha = commit.sha.substring(0, 7);
  const { additions, deletions } = getTotalChanges();

  return (
    <Card className="p-4 hover:bg-commit-hover transition-colors border-commit-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Commit SHA + GitHub link */}
          <div className="flex items-center gap-2 mb-2">
            <code className="bg-sha-bg text-sha-text px-2 py-1 rounded text-sm font-mono">
              {shortSha}
            </code>
            <a
              href={commit.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              View on GitHub
            </a>
          </div>

          {/* Commit message */}
          <h3 className="font-medium text-foreground mb-2 leading-tight">
            {commit.message}
          </h3>

          {/* Author + Date */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {commit.author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(commit.date)}
            </div>
          </div>

          {/* Toggle button */}
          {commit.files && commit.files.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {isOpen ? "Hide Changes" : "Show Changes"}
              </button>

              {/* Dropdown content */}
              {isOpen && (
                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      {commit.files.length} file{commit.files.length !== 1 ? 's' : ''} changed
                    </div>
                    {(additions > 0 || deletions > 0) && (
                      <div className="flex items-center gap-2">
                        {additions > 0 && (
                          <div className="flex items-center gap-1 text-github-green text-sm">
                            <Plus className="h-3 w-3" /> {additions}
                          </div>
                        )}
                        {deletions > 0 && (
                          <div className="flex items-center gap-1 text-github-red text-sm">
                            <Minus className="h-3 w-3" /> {deletions}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Files list */}
                  {commit.files.map((file, index) => (
                    <div
                      key={index}
                      className="p-2 bg-muted/30 rounded-md border border-muted space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {getFileStatusIcon(file.status || '')}
                          <span className="text-sm font-mono truncate">{file.filename}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getFileStatusColor(file.status || '')}`}
                          >
                            {file.status || 'unknown'}
                          </Badge>
                        </div>
                        {(file.additions || file.deletions) && (
                          <div className="flex items-center gap-2 text-xs">
                            {file.additions > 0 && <span className="text-github-green">+{file.additions}</span>}
                            {file.deletions > 0 && <span className="text-github-red">-{file.deletions}</span>}
                          </div>
                        )}
                      </div>

                      {/* Patch code block */}
                      {file.patch && (
                        <pre className="bg-black text-green-300 p-2 rounded-md overflow-x-auto text-xs">
                          {file.patch}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
