import { useState } from "react";
import { Book, Headphones, Filter, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecommendationCard } from "@/components/RecommendationCard";
import { Recommendation, RecommendationType, RecommendationStatus } from "@/types/recommendations";

// Mock data - in a real app, this would come from your backend/state management
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

  const getStatusCounts = () => {
    return recommendations.reduce((acc, rec) => {
      acc[rec.status] = (acc[rec.status] || 0) + 1;
      return acc;
    }, {} as Record<RecommendationStatus, number>);
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Recommendations</h1>
          <p className="text-muted-foreground">
            Books and podcasts suggested during our conversations to support your journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 bg-therapeutic-muted/30">
            <CardContent className="p-4 text-center">
              <Badge variant="want-to-read" className="mb-2">
                {statusCounts['want-to-read'] || 0}
              </Badge>
              <p className="text-sm text-muted-foreground">Want to Read</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-warning-muted/30">
            <CardContent className="p-4 text-center">
              <Badge variant="reading" className="mb-2">
                {statusCounts['reading'] || 0}
              </Badge>
              <p className="text-sm text-muted-foreground">Reading</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-success-muted/30">
            <CardContent className="p-4 text-center">
              <Badge variant="completed" className="mb-2">
                {statusCounts['completed'] || 0}
              </Badge>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-neutral-muted/30">
            <CardContent className="p-4 text-center">
              <Badge variant="not-interested" className="mb-2">
                {statusCounts['not-interested'] || 0}
              </Badge>
              <p className="text-sm text-muted-foreground">Not Interested</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5 text-therapeutic" />
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search recommendations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="book" className="flex items-center gap-1">
                    <Book className="w-3 h-3" />
                    Books
                  </TabsTrigger>
                  <TabsTrigger value="podcast" className="flex items-center gap-1">
                    <Headphones className="w-3 h-3" />
                    Podcasts
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Tabs value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as any)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All Status</TabsTrigger>
                  <TabsTrigger value="want-to-read">Want to Read</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Grid */}
        {filteredRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12 border-0 bg-muted/30">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No recommendations found</p>
                <p className="text-sm">Try adjusting your filters or search terms</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}