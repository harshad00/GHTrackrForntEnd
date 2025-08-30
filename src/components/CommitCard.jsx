import { Card, CardContent, CardHeader } from "./comen/button/Card";
import { Badge } from "./comen/button/Badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./comen/button/collapsible";
import { GitCommit, Calendar, User, Hash, Package, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { useState } from "react";

export const CommitCard = ({ commit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatSummary = (summary) => {
    return summary
      .replace(/##\s*/g, "")
      .replace(/\*\*/g, "")
      .split("\n")
      .filter((line) => line.trim() !== "");
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(commit.summary);
      setMessage("✅ Summary copied to clipboard!");
    } catch (err) {
      setMessage("❌ Failed to copy summary.");
    }

    // Auto-hide message after 3s
    setTimeout(() => setMessage(null), 3000);
  };

  const summaryLines = formatSummary(commit.summary);
  const previewLines = summaryLines.slice(0, 3);

  return (
    <Card className="bg-gradient-card border-border/50 hover:shadow-card hover:shadow-primary/20 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <GitCommit className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{commit.repo}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" />
                {commit.githubusername}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              variant="ghost"
              size="sm"
              onClick={copySummary}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-3 w-3" />
            </button>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Package className="h-3 w-3" />
              v{commit.version}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Show success/failure message */}
        {message && (
          <p className="text-xs text-center text-green-500">{message}</p>
        )}

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">Summary</h4>
              <CollapsibleTrigger asChild>
                <button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  {isOpen ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </CollapsibleTrigger>
            </div>

            <div className="bg-code border border-code-border rounded-md p-3 space-y-1">
              {previewLines.map((line, index) => (
                <p
                  key={index}
                  className="text-sm text-code-foreground leading-relaxed"
                >
                  {line}
                </p>
              ))}

              <CollapsibleContent className="space-y-1">
                {summaryLines.slice(3).map((line, index) => (
                  <p
                    key={index + 3}
                    className="text-sm text-code-foreground leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </CollapsibleContent>

              {summaryLines.length > 3 && !isOpen && (
                <p className="text-xs text-muted-foreground italic">
                  ... {summaryLines.length - 3} more lines
                </p>
              )}
            </div>
          </div>
        </Collapsible>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(commit.createdAt.$date)}
            </span>
            <span className="flex items-center gap-1">
              <GitCommit className="h-3 w-3" />
              {commit.totalCommits} commits
            </span>
          </div>
          <span className="flex items-center gap-1 font-mono">
            <Hash className="h-3 w-3" />
            {commit._id.slice(-8)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
