import { useState } from "react";
import { ChevronDown, ChevronUp, Book, Headphones, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Recommendation, RecommendationStatus, statusLabels } from "@/types/recommendations";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onStatusChange: (id: string, status: RecommendationStatus) => void;
}

export function RecommendationCard({ recommendation, onStatusChange }: RecommendationCardProps) {
  const [showReason, setShowReason] = useState(false);

  const getStatusVariant = (status: RecommendationStatus) => {
    switch (status) {
      case 'want-to-read': return 'want-to-read';
      case 'reading': return 'reading';
      case 'completed': return 'completed';
      case 'not-interested': return 'not-interested';
      default: return 'default';
    }
  };

  return (
    <Card className="group hover:shadow-soft transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/30">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-20 bg-gradient-to-br from-therapeutic/10 to-accent/10 rounded-lg flex items-center justify-center shadow-sm">
              {recommendation.type === 'book' ? (
                <Book className="w-8 h-8 text-therapeutic" />
              ) : (
                <Headphones className="w-8 h-8 text-therapeutic" />
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-therapeutic transition-colors">
                  {recommendation.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  by {recommendation.author}
                </p>
              </div>
              
              <Badge variant={getStatusVariant(recommendation.status)} className="flex-shrink-0">
                {statusLabels[recommendation.status]}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Calendar className="w-3 h-3" />
              <span>Recommended {recommendation.recommendedAt.toLocaleDateString()}</span>
            </div>

            {recommendation.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {recommendation.description}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReason(!showReason)}
            className="text-therapeutic hover:text-therapeutic-foreground hover:bg-therapeutic/10 transition-colors"
          >
            {showReason ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Hide reason
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Why recommended?
              </>
            )}
          </Button>

          <Select
            value={recommendation.status}
            onValueChange={(value: RecommendationStatus) => 
              onStatusChange(recommendation.id, value)
            }
          >
            <SelectTrigger className="w-40 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="want-to-read">Want to Read</SelectItem>
              <SelectItem value="reading">Reading</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not-interested">Not Interested</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {showReason && (
          <div className={cn(
            "mt-4 p-4 bg-therapeutic-muted/50 rounded-lg border-l-4 border-therapeutic",
            "animate-in slide-in-from-top-2 duration-200"
          )}>
            <p className="text-sm text-foreground leading-relaxed">
              {recommendation.reason}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}