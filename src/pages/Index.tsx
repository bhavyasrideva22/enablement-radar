import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Target, Users, TrendingUp, Award } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Career Assessment Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover your perfect career path with our scientifically-designed assessments. 
            Get personalized insights, career recommendations, and learning roadmaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Target className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Accurate Assessment</h3>
            <p className="text-sm text-muted-foreground">Psychometrically validated questions for precise career matching</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Users className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Personality Analysis</h3>
            <p className="text-sm text-muted-foreground">Deep insights into your work style and preferences</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Growth Recommendations</h3>
            <p className="text-sm text-muted-foreground">Personalized learning paths and skill development</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Award className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Career Guidance</h3>
            <p className="text-sm text-muted-foreground">Expert recommendations and salary insights</p>
          </Card>
        </div>

        <Card className="p-12 text-center shadow-xl">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Training & Enablement Specialist Assessment</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take our comprehensive assessment to discover if you're suited for a career in Training & Enablement. 
              Get detailed insights about your fit, readiness, and development areas.
            </p>
            <Button 
              onClick={() => navigate('/assessment')} 
              variant="hero" 
              size="xl"
              className="mb-4"
            >
              Start Assessment
            </Button>
            <p className="text-sm text-muted-foreground">
              20-30 minutes • Comprehensive analysis • Instant results
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
