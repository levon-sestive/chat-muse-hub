import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecommendationActionProps {
  title: string;
  author: string;
  type: "book" | "podcast";
  isAdded?: boolean;
  onAdd?: () => void;
  className?: string;
}

export default function RecommendationAction({ 
  title, 
  author, 
  type, 
  isAdded = false, 
  onAdd,
  className 
}: RecommendationActionProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 p-3 rounded-lg border bg-card text-card-foreground shadow-sm",
      "hover:shadow-md transition-all duration-200",
      className
    )}>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">"{title}"</p>
        <p className="text-xs text-muted-foreground">by {author}</p>
      </div>
      
      <Button
        variant={isAdded ? "secondary" : "default"}
        size="sm"
        onClick={onAdd}
        className={cn(
          "flex-shrink-0 h-8 px-3 text-xs",
          isAdded 
            ? "bg-muted text-muted-foreground" 
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {isAdded ? (
          <>
            <Check className="w-3 h-3 mr-1" />
            Added
          </>
        ) : (
          <>
            <Plus className="w-3 h-3 mr-1" />
            Add to List
          </>
        )}
      </Button>
    </div>
  );
}