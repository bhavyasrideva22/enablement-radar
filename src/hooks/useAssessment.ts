import { useState } from "react";
import { AssessmentState, AssessmentResponse, AssessmentResults, WISCARScores } from "@/types/assessment";
import { assessmentSections } from "@/data/assessmentData";

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    responses: [],
    isComplete: false
  });

  const totalQuestions = assessmentSections.reduce((acc, section) => acc + section.questions.length, 0);
  const currentQuestionIndex = state.currentSection === 0 ? state.currentQuestion : 
    assessmentSections.slice(0, state.currentSection).reduce((acc, section) => acc + section.questions.length, 0) + state.currentQuestion;

  const getCurrentQuestion = () => {
    const section = assessmentSections[state.currentSection];
    return section?.questions[state.currentQuestion];
  };

  const getCurrentSection = () => {
    return assessmentSections[state.currentSection];
  };

  const getResponse = (questionId: string) => {
    return state.responses.find(r => r.questionId === questionId)?.value;
  };

  const saveResponse = (questionId: string, value: number | string) => {
    setState(prev => ({
      ...prev,
      responses: [
        ...prev.responses.filter(r => r.questionId !== questionId),
        { questionId, value }
      ]
    }));
  };

  const goToNext = () => {
    const currentSection = assessmentSections[state.currentSection];
    const isLastQuestionInSection = state.currentQuestion === currentSection.questions.length - 1;
    const isLastSection = state.currentSection === assessmentSections.length - 1;

    if (isLastQuestionInSection && isLastSection) {
      // Complete assessment
      const results = calculateResults(state.responses);
      setState(prev => ({
        ...prev,
        isComplete: true,
        results
      }));
    } else if (isLastQuestionInSection) {
      // Move to next section
      setState(prev => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0
      }));
    } else {
      // Move to next question
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  };

  const goToPrevious = () => {
    if (state.currentQuestion > 0) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    } else if (state.currentSection > 0) {
      const prevSection = assessmentSections[state.currentSection - 1];
      setState(prev => ({
        ...prev,
        currentSection: prev.currentSection - 1,
        currentQuestion: prevSection.questions.length - 1
      }));
    }
  };

  const canGoNext = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return false;
    const response = getResponse(currentQuestion.id);
    return response !== undefined && response !== "";
  };

  const canGoPrevious = () => {
    return state.currentSection > 0 || state.currentQuestion > 0;
  };

  const restart = () => {
    setState({
      currentSection: 0,
      currentQuestion: 0,
      responses: [],
      isComplete: false
    });
  };

  return {
    state,
    totalQuestions,
    currentQuestionIndex: currentQuestionIndex + 1,
    getCurrentQuestion,
    getCurrentSection,
    getResponse,
    saveResponse,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious,
    restart
  };
};

// Assessment scoring logic
const calculateResults = (responses: AssessmentResponse[]): AssessmentResults => {
  // Group responses by category
  const psychometricResponses = responses.filter(r => 
    assessmentSections.flatMap(s => s.questions).find(q => q.id === r.questionId)?.category === 'psychometric'
  );
  
  const technicalResponses = responses.filter(r => 
    assessmentSections.flatMap(s => s.questions).find(q => q.id === r.questionId)?.category === 'technical'
  );
  
  const wiscarResponses = responses.filter(r => 
    assessmentSections.flatMap(s => s.questions).find(q => q.id === r.questionId)?.category === 'wiscar'
  );

  // Calculate scores
  const psychologicalFit = calculateCategoryScore(psychometricResponses);
  const technicalReadiness = calculateCategoryScore(technicalResponses);
  const wiscarScores = calculateWISCARScores(wiscarResponses);
  
  const overallScore = Math.round((psychologicalFit + technicalReadiness + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3);
  
  // Determine recommendation
  let recommendation: 'yes' | 'no' | 'maybe';
  let confidenceScore: number;
  
  if (overallScore >= 80) {
    recommendation = 'yes';
    confidenceScore = 85 + Math.random() * 10;
  } else if (overallScore >= 60) {
    recommendation = 'maybe';
    confidenceScore = 65 + Math.random() * 15;
  } else {
    recommendation = 'no';
    confidenceScore = 40 + Math.random() * 20;
  }

  return {
    psychologicalFit,
    technicalReadiness,
    wiscarScores,
    overallScore,
    recommendation,
    confidenceScore: Math.round(confidenceScore),
    reasoning: generateReasoning(recommendation, overallScore, psychologicalFit, technicalReadiness),
    careerPaths: generateCareerPaths(overallScore),
    learningPath: generateLearningPath(recommendation),
    improvements: generateImprovements(psychologicalFit, technicalReadiness, wiscarScores)
  };
};

const calculateCategoryScore = (responses: AssessmentResponse[]): number => {
  if (responses.length === 0) return 0;
  
  const totalScore = responses.reduce((sum, response) => {
    const numericValue = typeof response.value === 'number' ? response.value : 3; // Default to middle score for non-numeric
    return sum + (numericValue * 20); // Scale to 0-100
  }, 0);
  
  return Math.min(100, Math.round(totalScore / responses.length));
};

const calculateWISCARScores = (responses: AssessmentResponse[]): WISCARScores => {
  const categories = ['will', 'interest', 'skill', 'cognitive', 'ability', 'real-world'];
  const scores: WISCARScores = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorldAlignment: 0
  };

  categories.forEach(category => {
    const categoryResponses = responses.filter(r => {
      const question = assessmentSections.flatMap(s => s.questions).find(q => q.id === r.questionId);
      return question?.subcategory === category || question?.subcategory === 'real-world';
    });
    
    if (categoryResponses.length > 0) {
      const categoryScore = calculateCategoryScore(categoryResponses);
      switch (category) {
        case 'will':
          scores.will = categoryScore;
          break;
        case 'interest':
          scores.interest = categoryScore;
          break;
        case 'skill':
          scores.skill = categoryScore;
          break;
        case 'cognitive':
          scores.cognitive = categoryScore;
          break;
        case 'ability':  
          scores.ability = categoryScore;
          break;
        case 'real-world':
          scores.realWorldAlignment = categoryScore;
          break;
      }
    }
  });

  return scores;
};

const generateReasoning = (recommendation: string, overall: number, psych: number, tech: number): string => {
  if (recommendation === 'yes') {
    return `Your assessment shows strong alignment with the Training & Enablement Specialist role. You demonstrate excellent psychological fit (${psych}%) and solid technical readiness (${tech}%). Your natural teaching inclination and communication skills position you well for success in this field.`;
  } else if (recommendation === 'maybe') {
    return `You show promise for the Training & Enablement Specialist role with some areas for development. While your overall score of ${overall}% indicates potential, focusing on ${psych < tech ? 'interpersonal skills and teaching motivation' : 'technical learning design skills'} would strengthen your readiness.`;
  } else {
    return `Based on your responses, a Training & Enablement Specialist role may not be the best fit at this time. Your assessment suggests exploring alternative career paths that better align with your current interests and strengths.`;
  }
};

const generateCareerPaths = (overallScore: number) => {
  const allPaths = [
    {
      title: "Training & Enablement Specialist",
      match: Math.max(overallScore - 5, 0),
      salaryRange: "$60k - $90k",
      description: "Design and deliver comprehensive training programs to enhance team performance and product knowledge."
    },
    {
      title: "Instructional Designer", 
      match: Math.max(overallScore - 10, 0),
      salaryRange: "$65k - $95k",
      description: "Create engaging learning experiences and educational materials using systematic design approaches."
    },
    {
      title: "Learning & Development Manager",
      match: Math.max(overallScore - 15, 0), 
      salaryRange: "$75k - $110k",
      description: "Lead organizational learning initiatives and manage training strategy across departments."
    },
    {
      title: "Corporate Trainer",
      match: Math.max(overallScore - 20, 0),
      salaryRange: "$55k - $85k", 
      description: "Deliver in-person and virtual training sessions on various professional development topics."
    }
  ];
  
  return allPaths.filter(path => path.match > 0).sort((a, b) => b.match - a.match).slice(0, 3);
};

const generateLearningPath = (recommendation: string) => {
  const paths = {
    beginner: {
      level: "Beginner (0-6 months)",
      description: "Build foundational knowledge in learning theory and instructional design principles.",
      resources: ["ADDIE Model Course", "Adult Learning Theory", "Basic LMS Training", "Communication Skills Workshop"]
    },
    intermediate: {
      level: "Intermediate (6-12 months)", 
      description: "Develop practical skills in content creation and learner engagement strategies.",
      resources: ["Microlearning Design", "Kirkpatrick Evaluation", "Stakeholder Management", "Data Analysis Basics"]
    },
    advanced: {
      level: "Job-Ready (12+ months)",
      description: "Master advanced techniques and earn industry certifications to become job-ready.",
      resources: ["ATD Certification", "Portfolio Development", "Advanced Analytics", "Leadership Training"]
    }
  };

  if (recommendation === 'yes') {
    return [paths.intermediate, paths.advanced];
  } else if (recommendation === 'maybe') {
    return [paths.beginner, paths.intermediate, paths.advanced];
  } else {
    return [paths.beginner];
  }
};

const generateImprovements = (psych: number, tech: number, wiscar: WISCARScores): string[] => {
  const improvements: string[] = [];
  
  if (psych < 70) {
    improvements.push("Develop stronger communication and empathy skills through practice and training");
    improvements.push("Build experience in mentoring or teaching others informally");
  }
  
  if (tech < 70) {
    improvements.push("Gain familiarity with learning management systems and instructional design tools");
    improvements.push("Study foundational learning theories and adult education principles");
  }
  
  if (wiscar.skill < 70) {
    improvements.push("Enhance presentation and public speaking abilities");
    improvements.push("Develop analytical skills for learning data interpretation");
  }
  
  if (wiscar.interest < 70) {
    improvements.push("Explore different learning methodologies to build genuine interest in the field");
  }
  
  return improvements.slice(0, 4); // Limit to top 4 improvements
};