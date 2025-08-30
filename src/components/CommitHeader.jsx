import { Badge } from "./comen/button/Badge";
import { GitBranch, Code2, Zap } from "lucide-react";

export const CommitHeader = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-subtle border-b border-border/50">
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      <div className="relative container mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center gap-2 mb-4 p-2 rounded-full bg-primary/10 border border-primary/20">
          <Code2 className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Commit Chorus</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Code Analysis Dashboard
        </h1>
        
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Visualize and analyze your commit history with detailed summaries, version tracking, and repository insights
        </p>
        
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge variant="outline" className="flex items-center gap-1 border-primary/30 text-primary">
            <GitBranch className="h-3 w-3" />
            Version Control
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 border-success/30 text-success">
            <Zap className="h-3 w-3" />
            Real-time Analysis
          </Badge>
        </div>
      </div>
    </div>
  );
};