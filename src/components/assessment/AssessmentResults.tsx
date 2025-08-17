import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Target,
  DollarSign,
  Clock,
  Users
} from "lucide-react";
import { AssessmentResults as Results } from "@/types/assessment";

interface AssessmentResultsProps {
  results: Results;
  onRestart: () => void;
}

export const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'success';
      case 'maybe': return 'warning';
      case 'no': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return CheckCircle;
      case 'maybe': return AlertCircle;
      case 'no': return AlertCircle;
      default: return Target;
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'Highly Recommended';
      case 'maybe': return 'Cautious Entry';
      case 'no': return 'Consider Alternatives';
      default: return 'Assessment Complete';
    }
  };

  const RecommendationIcon = getRecommendationIcon(results.recommendation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Your Assessment Results</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your responses, here's your comprehensive career readiness analysis for Training & Enablement Specialist
          </p>
        </div>

        {/* Main Recommendation Card */}
        <Card className="p-8 mb-8 shadow-lg border-2" style={{borderColor: `hsl(var(--${getRecommendationColor(results.recommendation)}))`}}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" 
                 style={{backgroundColor: `hsl(var(--${getRecommendationColor(results.recommendation)}) / 0.1)`}}>
              <RecommendationIcon className="h-10 w-10" style={{color: `hsl(var(--${getRecommendationColor(results.recommendation)}))`}} />
            </div>
            <h2 className="text-3xl font-bold mb-4">{getRecommendationText(results.recommendation)}</h2>
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge variant={getRecommendationColor(results.recommendation) as any} className="text-sm py-1 px-3">
                {results.confidenceScore}% Confidence Score
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{results.reasoning}</p>
          </div>
        </Card>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Overall Score</h3>
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">{results.overallScore}%</div>
            <Progress value={results.overallScore} className="h-2" />
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Psychological Fit</h3>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">{results.psychologicalFit}%</div>
            <Progress value={results.psychologicalFit} className="h-2" />
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Technical Readiness</h3>
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">{results.technicalReadiness}%</div>
            <Progress value={results.technicalReadiness} className="h-2" />
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Confidence</h3>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">{results.confidenceScore}%</div>
            <Progress value={results.confidenceScore} className="h-2" />
          </Card>
        </div>

        {/* WISCAR Analysis */}
        <Card className="p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">WISCAR Framework Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(results.wiscarScores).map(([key, value]) => (
              <div key={key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <span className="text-lg font-bold">{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Career Paths */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Recommended Career Paths</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.careerPaths.map((career, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{career.title}</h4>
                  <Badge variant="secondary">{career.match}% Match</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                <div className="text-lg font-semibold text-success">{career.salaryRange}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Learning Path */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Your Learning Journey</h3>
          </div>
          <div className="space-y-6">
            {results.learningPath.map((level, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{level.level}</h4>
                  <p className="text-muted-foreground mb-3">{level.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {level.resources.map((resource, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{resource}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Areas for Improvement */}
        {results.improvements.length > 0 && (
          <Card className="p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Areas for Development</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.improvements.map((improvement, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm">{improvement}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button onClick={onRestart} variant="hero" size="lg">
            Take Assessment Again
          </Button>
          <p className="text-sm text-muted-foreground">
            Share these results with career counselors or use them to guide your professional development
          </p>
        </div>
      </div>
    </div>
  );
};