import { useState } from "react";
import { AssessmentIntro } from "@/components/assessment/AssessmentIntro";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";
import { useAssessment } from "@/hooks/useAssessment";

export const Assessment = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const assessment = useAssessment();

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleRestart = () => {
    setHasStarted(false);
    assessment.restart();
  };

  if (!hasStarted) {
    return <AssessmentIntro onStart={handleStart} />;
  }

  if (assessment.state.isComplete && assessment.state.results) {
    return <AssessmentResults results={assessment.state.results} onRestart={handleRestart} />;
  }

  const currentQuestion = assessment.getCurrentQuestion();
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionCard
      question={currentQuestion}
      value={assessment.getResponse(currentQuestion.id)}
      onAnswer={(value) => assessment.saveResponse(currentQuestion.id, value)}
      onNext={assessment.goToNext}
      onPrevious={assessment.goToPrevious}
      canGoNext={assessment.canGoNext()}
      canGoPrevious={assessment.canGoPrevious()}
      questionNumber={assessment.currentQuestionIndex}
      totalQuestions={assessment.totalQuestions}
    />
  );
};

export default Assessment;