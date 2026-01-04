// Mock data for portfolio - will be replaced with backend integration later

export const personalInfo = {
  name: "GUNVANTH MADABATTULA",
  title: "AI/ML Developer & Data Analyst",
  tagline: "Building intelligent solutions with AI, Machine Learning, and Data Analytics",
  email: "gunvanth752004@gmail.com",
  phone: "+91 6303157119",
  location: "Visakhapatnam, India",
  linkedin: "https://www.linkedin.com/in/gunvanth-m/",
  github: "https://github.com/gunwanth",
  resumeUrl: "/resume/gunvanth_resume.pdf",
  about: "AI/ML Developer specializing in Python, React, and Google Cloud technologies. Built 3+ full-stack AI applications including a disease prediction model with 85%+ accuracy. Experienced in RESTful APIs, data analysis, and Power BI dashboards and well-defined Deployment using Azure CI/CD pipelines"
};

export const experiences = [
  {
    id: 1,
    title: "Data Analyst Intern",
    company: "Naveen PVC Bend Works and Marketing Agencies",
    period: "Jan 2025 - Mar 2025",
    description: "Conducting data analysis to optimize business operations and marketing strategies.",
    type: "internship"
  },
  {
    id: 2,
    title: "Google Cloud Generative AI Virtual Internship",
    company: "AICTE Eduskills Cohort-9",
    period: "July 2024 - Sep 2024",
    description: "Explored generative AI technologies and cloud computing solutions using Google Cloud Platform.",
    type: "internship"
  },
  {
    id: 3,
    title: "GEN AI-ML Virtual Internship",
    company: "AICTE Eduskills Cohort-8",
    period: "Apr 2024 - June 2024",
    description: "Gained hands-on experience with generative AI and machine learning technologies.",
    type: "internship"
  },
  {
    id: 4,
    title: "PowerBI Data Analyst",
    company: "PwC (Job Simulation)",
    period: "2024",
    description: "Completed job simulation as PowerBI data analyst, working on real-world data visualization challenges.",
    type: "experience"
  },
  {
    id: 5,
    title: "Data Analytics Virtual Program",
    company: "Accenture (Forage)",
    period: "2024",
    description: "Participated in Accenture Virtual Experience Program on Data Analytics.",
    type: "experience"
  }
];

export const projects = [
  {
    id: 1,
    title: "Dine Space",
    description: "Full-stack web application that allows users to discover nearby restaurants based on real-time location and preferences. Features image-based food search with visual input recognition.",
    technologies: ["Flask", "Python", "Zomato API", "Machine Learning", "Computer Vision"],
    highlights: [
      "Integrated Zomato datasets for restaurant recommendations",
      "Built image-based food search feature",
      "Custom data preprocessing and JSON conversion scripts"
    ],
    github: "https://github.com/gunwanth/dine-space",
    demo: null
  },
  {
    id: 2,
    title: "Smart Traffic Flow Analyzer",
    description: "Machine learning model using YOLOv8n to count vehicles crossing traffic signals in real-time. Provides enhanced traffic flow insights through precise vehicle counting and pattern recognition.",
    technologies: ["YOLOv8n", "Python", "Computer Vision", "Real-time Processing"],
    highlights: [
      "Real-time vehicle detection and classification",
      "Optimized for performance and scalability",
      "Accurate pattern recognition in diverse traffic conditions"
    ],
    github: "https://github.com/gunwanth/Smart_Traffic_flow_Analyzer",
    demo: null
  },
  {
    id: 3,
    title: "Disease Prediction Model",
    description: "Machine learning system that predicts diseases based on user-input symptoms. Features a Flask web application for seamless symptom input and disease prediction.",
    technologies: ["Python", "Flask", "Machine Learning", "Decision Trees", "Logistic Regression"],
    highlights: [
      "Trained decision trees and logistic regression models",
      "Data cleaning and structuring for accurate predictions",
      "User-friendly web interface for early disease detection"
    ],
    github: "https://github.com/gunwanth/Disease_Analyzer",
    demo: null
  },
  {
    id: 4,
    title: "Dynamic Phishing Detector",
    description: "Advanced security tool that dynamically detects phishing websites using machine learning algorithms. Analyzes URL patterns, website content, and behavioral indicators to identify malicious sites.",
    technologies: ["Python", "Machine Learning", "Flask", "Security Analysis"],
    highlights: [
      "Dynamic analysis of website characteristics",
      "Real-time phishing detection using ML models",
      "Comprehensive URL and content feature extraction"
    ],
    github: "https://github.com/gunwanth/phishing_project_dynamic",
    demo: null
  },
  {
    id: 5,
    title: "Stock Tracker",
    description: "Real-time stock market tracking application that monitors stock prices, displays market trends, and provides analytical insights for informed investment decisions.",
    technologies: ["Python", "Flask", "APIs", "Data Visualization"],
    highlights: [
      "Real-time stock price monitoring and updates",
      "Interactive data visualization and trend analysis",
      "Portfolio tracking and performance metrics"
    ],
    github: "https://github.com/gunwanth/stock_tracker",
    demo: null
  },
  {
    id: 6,
    title: "Sweet Shop Management",
    description: "Full-stack inventory and e-commerce system with admin panels for stock management and customer dashboards for purchasing sweets.",
    technologies: ["Prisma ORM", "PostgreSQL", "JWT Authentication", "Jest"],
    highlights: [
      "Admin: add / delete / restock sweets",
      "JWT-based authentication",
      "Tests with Jest & Supertest"
    ],
    github: "https://github.com/gunwanth/sweet-shop-management-system",
    demo: null
  }
];

export const skills = {
  programming: ["Python", "Java", "C++", "SQL"],
  dataScience: ["Data Analysis", "Machine Learning", "Data Visualization", "PowerBI", "AI", "Prompt Engineering"],
  frameworks: ["Flask", "YOLOv8"],
  tools: ["VS Code", "GitHub", "Postman", "Oracle", "Supabase", "LM Studio", "MS Office"],
  other: ["DSA", "Computer Vision", "LLMs"]
};

export const certifications = [
  { id: 1, name: "Python Certification", provider: "GUVI", year: "2024" },
  { id: 2, name: "Excel Certification", provider: "GUVI", year: "2024" },
  { id: 3, name: "Advanced Python", provider: "Infosys Springboard", year: "2024" },
  { id: 4, name: "Java Programming", provider: "edX, CareerNinja", year: "2024" },
  { id: 5, name: "Prompt Engineering (Beginner)", provider: "Cognitive AI Classes", year: "2024" },
  { id: 6, name: "Prompt Engineering (Intermediate)", provider: "Codecademy", year: "2024" },
  { id: 7, name: "Power BI", provider: "Codecademy", year: "2024" },
  { id: 8, name: "Power BI (Intermediate)", provider: "Infosys Springboard 5.0", year: "2024" },
  { id: 9, name: "Data Analytics using Python", provider: "APSSDC", year: "2024" },
  { id: 10, name: "Gen AI and Cloud Computing Badges", provider: "Google Cloud", year: "2024" }
];

export const education = [
  {
    id: 1,
    degree: "Bachelor of Technology in Computer Science Engineering (AI/ML)",
    institution: "Gayatri Vidya Parishad College of Engineering",
    period: "2022 - 2026",
    grade: "7.8 CGPA"
  },
  {
    id: 2,
    degree: "Intermediate (MPC)",
    institution: "Sri Viswa Junior College",
    period: "2020 - 2022",
    grade: "78%"
  },
  {
    id: 3,
    degree: "Grade X (CBSE)",
    institution: "Little Angels School",
    period: "2019 - 2020",
    grade: "75%"
  }
];
