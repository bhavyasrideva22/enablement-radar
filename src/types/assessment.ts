export interface Question {
  id: string;
  text: string;
  type: 'scale' | 'multiple-choice' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  options?: { value: number | string; label: string }[];
  scale?: { min: number; max: number; labels: string[] };
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorldAlignment: number;
}

export interface AssessmentResults {
  psychologicalFit: number;
  technicalReadiness: number;
  wiscarScores: WISCARScores;
  overallScore: number;
  recommendation: 'yes' | 'no' | 'maybe';
  confidenceScore: number;
  reasoning: string;
  careerPaths: {
    title: string;
    match: number;
    salaryRange: string;
    description: string;
  }[];
  learningPath: {
    level: string;
    description: string;
    resources: string[];
  }[];
  improvements: string[];
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  responses: AssessmentResponse[];
  isComplete: boolean;
  results?: AssessmentResults;
}