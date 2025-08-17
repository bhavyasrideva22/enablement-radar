import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Users, TrendingUp, Target, Clock, Award } from "lucide-react";
import assessmentHero from "@/assets/assessment-hero.jpg";

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-glow/10" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Is Training & Enablement Right for You?
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Discover if you're perfectly suited for a career as a Training & Enablement Specialist with our comprehensive psychometric assessment.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button onClick={onStart} variant="hero" size="xl">
                  Start Assessment
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>20-30 minutes</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={assessmentHero}
                alt="Professional training environment"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* What is a Training & Enablement Specialist Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What is a Training & Enablement Specialist?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A Training & Enablement Specialist designs, develops, and delivers internal or external training programs that improve performance, skills, knowledge, and product understanding across teams or clients.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Program Development</h3>
                <p className="text-muted-foreground">Design comprehensive learning experiences that drive skill development and knowledge retention.</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <TrendingUp className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Performance Impact</h3>
                <p className="text-muted-foreground">Measure and optimize training effectiveness to ensure measurable business outcomes.</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Target className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Strategic Alignment</h3>
                <p className="text-muted-foreground">Align learning initiatives with organizational goals and individual career development paths.</p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Career Paths */}
      <div className="bg-secondary/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Typical Career Paths in This Domain
            </h2>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Training & Development Specialist", salary: "$55k - $85k" },
                { title: "Learning & Development Manager", salary: "$75k - $110k" },
                { title: "Instructional Designer", salary: "$65k - $95k" },
                { title: "Enablement Program Manager", salary: "$80k - $120k" },
                { title: "Learning Consultant", salary: "$70k - $100k" },
                { title: "Onboarding & Certification Trainer", salary: "$50k - $80k" }
              ].map((career, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold mb-2">{career.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{career.salary}</p>
                  <div className="text-xs text-success font-medium">High Growth Potential</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Traits That Excel */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Traits That Excel in This Role
            </h2>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Strong communication & empathy",
                "Instructional design thinking", 
                "Analytical understanding of learning behavior",
                "Organizational skills & planning",
                "Patience, curiosity, and collaboration",
                "Structured and creative problem-solving"
              ].map((trait, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-muted-foreground">{trait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Overview */}
      <div className="bg-accent/20 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Award className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comprehensive Career Assessment
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our scientifically-designed assessment evaluates your psychological fit, technical readiness, and overall alignment with the Training & Enablement Specialist role.
            </p>
            <div className="mt-10">
              <Button onClick={onStart} variant="hero" size="xl">
                Begin Your Assessment Journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};