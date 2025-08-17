import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/assessment";

interface QuestionCardProps {
  question: Question;
  value?: number | string;
  onAnswer: (value: number | string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({
  question,
  value,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  questionNumber,
  totalQuestions
}: QuestionCardProps) => {
  const [currentValue, setCurrentValue] = useState<number | string>(value || "");

  const handleValueChange = (newValue: number | string) => {
    setCurrentValue(newValue);
    onAnswer(newValue);
  };

  const renderScale = () => {
    if (!question.scale) return null;
    
    return (
      <div className="space-y-4">
        <RadioGroup
          value={currentValue.toString()}
          onValueChange={(value) => handleValueChange(parseInt(value))}
          className="space-y-3"
        >
          {Array.from({ length: question.scale.max - question.scale.min + 1 }, (_, i) => {
            const scaleValue = question.scale!.min + i;
            const labelIndex = i;
            
            return (
              <div key={scaleValue} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={scaleValue.toString()} id={`scale-${scaleValue}`} />
                <Label 
                  htmlFor={`scale-${scaleValue}`} 
                  className="flex-1 cursor-pointer font-medium"
                >
                  {scaleValue}. {question.scale!.labels[labelIndex]}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    if (!question.options) return null;
    
    return (
      <RadioGroup
        value={currentValue.toString()} 
        onValueChange={(value) => handleValueChange(value)}
        className="space-y-3"
      >
        {question.options.map((option) => (
          <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
            <Label 
              htmlFor={`option-${option.value}`} 
              className="flex-1 cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8">
      <div className="mx-auto max-w-4xl px-6">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {questionNumber} of {totalQuestions}</span>
            <span>{Math.round((questionNumber / totalQuestions) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-assessment-progress h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">{question.text}</h2>
              {question.category && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {question.category.charAt(0).toUpperCase() + question.category.slice(1)} Assessment
                </div>
              )}
            </div>

            <div className="space-y-4">
              {question.type === 'scale' && renderScale()}
              {(question.type === 'multiple-choice' || question.type === 'scenario') && renderMultipleChoice()}
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={!canGoPrevious}
              >
                Previous
              </Button>
              
              <Button
                variant="assessment"
                onClick={onNext}
                disabled={!canGoNext || !currentValue}
              >
                {questionNumber === totalQuestions ? "Complete Assessment" : "Next"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};