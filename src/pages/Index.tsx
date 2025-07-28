import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageCircle, Brain, Headphones } from "lucide-react";
import ChatRecommendation from "@/components/ChatRecommendation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">New Nörm</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your personal therapeutic companion for mental wellness
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-therapeutic hover:bg-therapeutic/90">
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Conversation
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/recommendations">
                <BookOpen className="w-5 h-5 mr-2" />
                View Recommendations
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-soft hover:shadow-therapeutic transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-therapeutic">
                <MessageCircle className="w-5 h-5" />
                Just Talk
              </CardTitle>
              <CardDescription>
                Open conversations about whatever's on your mind
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-soft hover:shadow-therapeutic transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-therapeutic">
                <Brain className="w-5 h-5" />
                Deep Mode
              </CardTitle>
              <CardDescription>
                Structured therapeutic sessions for deeper exploration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-soft hover:shadow-therapeutic transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-therapeutic">
                <BookOpen className="w-5 h-5" />
                Recommendations
              </CardTitle>
              <CardDescription>
                Personalized books and podcasts for your wellness journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/recommendations">
                  <Headphones className="w-4 h-4 mr-2" />
                  View All
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Example Chat Recommendations */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Chat Recommendations Preview</h2>
          
          <ChatRecommendation
            title="The Body Keeps the Score"
            author="Bessel van der Kolk"
            type="book"
            description="A groundbreaking exploration of how trauma affects the body and mind, offering innovative approaches to recovery through body awareness and healing."
            reason="Based on your interest in understanding trauma responses and healing mechanisms."
          />
          
          <ChatRecommendation
            title="On Being with Krista Tippett"
            author="Krista Tippett"
            type="podcast"
            description="Thoughtful conversations about meaning, spirituality, and what it means to be human in our complex world."
            reason="Perfect for your journey of self-discovery and mindfulness practice."
          />
        </div>

        {/* Quick Stats or Recent Activity could go here */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            A safe space for mental health conversations and personal growth
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
