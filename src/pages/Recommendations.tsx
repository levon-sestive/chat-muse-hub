import { useState } from "react";
import { Search, Book, Headphones, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Recommendation, RecommendationType, RecommendationStatus, statusLabels } from "@/types/recommendations";
import { cn } from "@/lib/utils";

// Mock data
const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    type: "book",
    status: "want-to-read",
    reason: "During our conversation about stress and anxiety, I noticed you mentioned feeling overwhelmed by past experiences. This book offers insights into how trauma affects the body and mind, with practical approaches for healing.",
    recommendedAt: new Date("2024-01-15"),
    description: "A revolutionary understanding of how trauma affects the body and mind, and practical approaches for recovery."
  },
  {
    id: "2",
    title: "Huberman Lab Podcast",
    author: "Andrew Huberman",
    type: "podcast",
    status: "reading",
    reason: "You expressed interest in understanding the science behind stress management. This podcast covers neuroscience-based tools for improving mental health, sleep, and stress resilience.",
    recommendedAt: new Date("2024-01-10"),
    description: "Science-based tools for everyday life covering neuroscience, health, and performance."
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    type: "book",
    status: "completed",
    reason: "When you mentioned struggling with consistency in your self-care routine, I thought this book would help you build sustainable positive habits gradually.",
    recommendedAt: new Date("2024-01-05"),
    description: "An easy and proven way to build good habits and break bad ones."
  },
  {
    id: "4",
    title: "Ten Percent Happier",
    author: "Dan Harris",
    type: "podcast",
    status: "not-interested",
    reason: "You showed interest in meditation but mentioned finding it difficult. This podcast makes mindfulness accessible with practical tips from experts.",
    recommendedAt: new Date("2024-01-01"),
    description: "Practical meditation and mindfulness guidance without the mystical fluff."
  }
];

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | RecommendationType>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | RecommendationStatus>("all");
  const [expandedReason, setExpandedReason] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: RecommendationStatus) => {
    setRecommendations(prev =>
      prev.map(rec =>
        rec.id === id ? { ...rec, status: newStatus } : rec
      )
    );
  };

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesSearch = rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rec.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || rec.type === selectedType;
    const matchesStatus = selectedStatus === "all" || rec.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: RecommendationStatus) => {
    switch (status) {
      case 'want-to-read': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'reading': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'not-interested': return 'bg-gray-50 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Recommendations</h1>
          <p className="text-gray-600">Books and podcasts suggested during our conversations</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search recommendations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
            
            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as any)}>
              <SelectTrigger className="border-gray-200">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="book">Books</SelectItem>
                <SelectItem value="podcast">Podcasts</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as any)}>
              <SelectTrigger className="border-gray-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="want-to-read">Want to Read</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="not-interested">Not Interested</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {filteredRecommendations.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredRecommendations.map((recommendation) => (
                <div key={recommendation.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        {recommendation.type === 'book' ? (
                          <Book className="w-5 h-5 text-gray-500" />
                        ) : (
                          <Headphones className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {recommendation.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          by {recommendation.author}
                        </p>
                        {recommendation.description && (
                          <p className="text-sm text-gray-500 mb-3">
                            {recommendation.description}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 mb-3">
                          <span className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                            getStatusColor(recommendation.status)
                          )}>
                            {statusLabels[recommendation.status]}
                          </span>
                          <span className="text-xs text-gray-500">
                            Recommended {recommendation.recommendedAt.toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedReason(
                              expandedReason === recommendation.id ? null : recommendation.id
                            )}
                            className="text-xs text-gray-600 hover:text-gray-900 h-7 px-2"
                          >
                            {expandedReason === recommendation.id ? (
                              <>
                                <ChevronUp className="w-3 h-3 mr-1" />
                                Hide reason
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3 h-3 mr-1" />
                                Why recommended?
                              </>
                            )}
                          </Button>

                          <Select
                            value={recommendation.status}
                            onValueChange={(value: RecommendationStatus) => 
                              handleStatusChange(recommendation.id, value)
                            }
                          >
                            <SelectTrigger className="w-36 h-7 text-xs border-gray-200">
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

                        {expandedReason === recommendation.id && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-200">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {recommendation.reason}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Book className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-600">No recommendations found</p>
              <p className="text-sm text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}