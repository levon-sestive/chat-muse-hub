import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Book, Headphones, Plus, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ChatRecommendationProps {
  title: string;
  author: string;
  type: "book" | "podcast";
  description: string;
  reason?: string;
  onAddToList?: () => void;
  className?: string;
}

export default function ChatRecommendation({
  title,
  author,
  type,
  description,
  reason,
  onAddToList,
  className
}: ChatRecommendationProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    setIsAdded(true);
    onAddToList?.();
  };

  const Icon = type === "book" ? Book : Headphones;

  return (
    <Card className={cn(
      "p-4 border-0 bg-gradient-to-br from-background to-muted/30",
      "shadow-sm hover:shadow-md transition-all duration-300",
      "animate-fade-in",
      className
    )}>
      <div className="flex items-start gap-3">
        {/* AI Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>

        <div className="flex-1 space-y-3">
          {/* Recommendation Header */}
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {type === "book" ? "Book Recommendation" : "Podcast Recommendation"}
            </span>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div>
              <h4 className="font-semibold text-foreground leading-tight">
                "{title}"
              </h4>
              <p className="text-sm text-muted-foreground">by {author}</p>
            </div>

            <p className="text-sm text-foreground/90 leading-relaxed">
              {description}
            </p>

            {reason && (
              <p className="text-xs text-muted-foreground italic border-l-2 border-primary/20 pl-3">
                {reason}
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleAdd}
              disabled={isAdded}
              size="sm"
              className={cn(
                "h-8 px-4 text-xs font-medium transition-all duration-200",
                isAdded 
                  ? "bg-green-100 text-green-700 hover:bg-green-100 border border-green-200" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow"
              )}
            >
              {isAdded ? (
                <>
                  <Check className="w-3 h-3 mr-1.5" />
                  Added to List
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 mr-1.5" />
                  Add to Reading List
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}