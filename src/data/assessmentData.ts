import { AssessmentSection } from "@/types/assessment";

export const assessmentSections: AssessmentSection[] = [
  {
    id: "introduction",
    title: "Role Introduction",
    description: "Understanding the Training & Enablement Specialist role and your initial interest",
    questions: [
      {
        id: "intro-1",
        text: "How familiar are you with the role of a Training & Enablement Specialist?",
        type: "scale",
        category: "psychometric",
        scale: { min: 1, max: 5, labels: ["Not familiar", "Somewhat familiar", "Moderately familiar", "Very familiar", "Expert level"] }
      },
      {
        id: "intro-2", 
        text: "What initially attracts you to this career path?",
        type: "multiple-choice",
        category: "psychometric",
        options: [
          { value: "helping-others", label: "Helping others learn and grow" },
          { value: "content-creation", label: "Creating educational content" },
          { value: "strategic-impact", label: "Strategic business impact" },
          { value: "technology", label: "Working with learning technologies" },
          { value: "variety", label: "Variety in daily activities" }
        ]
      }
    ]
  },
  {
    id: "psychometric",
    title: "Personality & Motivation Assessment",
    description: "Understanding your psychological fit for the role",
    questions: [
      {
        id: "psych-1",
        text: "I enjoy explaining complex ideas in a simple way",
        type: "scale",
        category: "psychometric",
        subcategory: "communication",
        scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
      },
      {
        id: "psych-2",
        text: "I prefer collaborative learning environments over solo work",
        type: "scale", 
        category: "psychometric",
        subcategory: "social",
        scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
      },
      {
        id: "psych-3",
        text: "I regularly seek feedback to improve my teaching or mentoring approach",
        type: "scale",
        category: "psychometric", 
        subcategory: "growth",
        scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
      },
      {
        id: "psych-4",
        text: "When teaching someone a new skill, I typically:",
        type: "multiple-choice",
        category: "psychometric",
        subcategory: "teaching-style",
        options: [
          { value: "demonstrate", label: "Show them how to do it first" },
          { value: "explain", label: "Explain the theory behind it" },
          { value: "practice", label: "Let them try while I guide" },
          { value: "resources", label: "Provide resources for self-learning" }
        ]
      },
      {
        id: "psych-5",
        text: "I am energized by helping others overcome learning challenges",
        type: "scale",
        category: "psychometric",
        subcategory: "motivation",
        scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
      }
    ]
  },
  {
    id: "technical",
    title: "Technical Aptitude & Knowledge",
    description: "Assessing your current technical skills and learning capacity",
    questions: [
      {
        id: "tech-1",
        text: "Which learning management systems (LMS) have you used?",
        type: "multiple-choice",
        category: "technical",
        subcategory: "tools",
        options: [
          { value: "none", label: "I haven't used any LMS" },
          { value: "basic", label: "Basic platforms (Google Classroom, Canvas)" },
          { value: "corporate", label: "Corporate LMS (Cornerstone, Workday)" },
          { value: "advanced", label: "Advanced platforms (Articulate, Adobe Captivate)" },
          { value: "multiple", label: "Multiple platforms across categories" }
        ]
      },
      {
        id: "tech-2",
        text: "A training program shows low completion rates. Your first step would be to:",
        type: "scenario",
        category: "technical",
        subcategory: "problem-solving",
        options: [
          { value: "data", label: "Analyze completion data and identify drop-off points" },
          { value: "feedback", label: "Survey participants about barriers" },
          { value: "content", label: "Review and simplify the content" },
          { value: "stakeholders", label: "Meet with stakeholders to understand context" }
        ]
      },
      {
        id: "tech-3",
        text: "How familiar are you with instructional design models (like ADDIE or SAM)?",
        type: "scale",
        category: "technical",
        subcategory: "methodology",
        scale: { min: 1, max: 5, labels: ["Never heard of them", "Heard but don't understand", "Basic understanding", "Can apply with guidance", "Can implement independently"] }
      },
      {
        id: "tech-4",
        text: "You need to create training for a technical topic you're unfamiliar with. How do you proceed?",
        type: "scenario",
        category: "technical", 
        subcategory: "learning-agility",
        options: [
          { value: "research", label: "Research thoroughly before involving experts" },
          { value: "collaborate", label: "Partner with subject matter experts from the start" },
          { value: "prototype", label: "Create a draft and iterate based on expert feedback" },
          { value: "outsource", label: "Find existing resources or external training" }
        ]
      }
    ]
  },
  {
    id: "wiscar",
    title: "WISCAR Framework Analysis",
    description: "Comprehensive assessment of your readiness across multiple dimensions",
    questions: [
      {
        id: "will-1",
        text: "I regularly help others learn even without formal rewards",
        type: "scale",
        category: "wiscar",
        subcategory: "will",
        scale: { min: 1, max: 5, labels: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
      },
      {
        id: "will-2", 
        text: "I maintain consistency in learning and development activities over time",
        type: "scale",
        category: "wiscar",
        subcategory: "will",
        scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
      },
      {
        id: "interest-1",
        text: "I enjoy discovering better ways to teach people",
        type: "scale",
        category: "wiscar",
        subcategory: "interest",
        scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
      },
      {
        id: "interest-2",
        text: "I find myself naturally curious about how people learn best",
        type: "scale",
        category: "wiscar", 
        subcategory: "interest",
        scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
      },
      {
        id: "skill-1",
        text: "Rate your current presentation and public speaking skills",
        type: "scale",
        category: "wiscar",
        subcategory: "skill",
        scale: { min: 1, max: 5, labels: ["Beginner", "Developing", "Competent", "Proficient", "Expert"] }
      },
      {
        id: "skill-2",
        text: "How comfortable are you with data analysis and reporting?",
        type: "scale",
        category: "wiscar",
        subcategory: "skill", 
        scale: { min: 1, max: 5, labels: ["Very uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very comfortable"] }
      },
      {
        id: "cognitive-1",
        text: "You're designing training for a complex process. You would:",
        type: "scenario",
        category: "wiscar",
        subcategory: "cognitive",
        options: [
          { value: "linear", label: "Break it into sequential, linear steps" },
          { value: "modular", label: "Create interconnected learning modules" },
          { value: "adaptive", label: "Design adaptive pathways based on learner needs" },
          { value: "immersive", label: "Use simulation or hands-on practice" }
        ]
      },
      {
        id: "ability-1",
        text: "When I make mistakes in teaching or training, I:",
        type: "multiple-choice",
        category: "wiscar",
        subcategory: "ability",
        options: [
          { value: "reflect", label: "Reflect deeply and adjust my approach" },
          { value: "research", label: "Research better methods and practices" },
          { value: "seek-feedback", label: "Ask for feedback from learners and peers" },
          { value: "experiment", label: "Try different approaches until I find what works" }
        ]
      },
      {
        id: "real-world-1",
        text: "How important is work-life balance to you?",
        type: "scale",
        category: "wiscar",
        subcategory: "real-world",
        scale: { min: 1, max: 5, labels: ["Not important", "Slightly important", "Moderately important", "Very important", "Extremely important"] }
      },
      {
        id: "real-world-2",
        text: "You're offered a project that requires significant overtime but great learning opportunity. You:",
        type: "scenario",
        category: "wiscar",
        subcategory: "real-world",
        options: [
          { value: "accept", label: "Accept enthusiastically for the growth opportunity" },
          { value: "negotiate", label: "Negotiate for better work-life balance terms" },
          { value: "decline", label: "Decline to protect your personal time" },
          { value: "partial", label: "Accept with clear boundaries and timelines" }
        ]
      }
    ]
  }
];