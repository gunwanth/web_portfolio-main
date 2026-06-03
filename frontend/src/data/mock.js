// Mock data for portfolio - will be replaced with backend integration later

export const personalInfo = {
  name: "GUNVANTH MADABATTULA",
  title: "Full Stack AI/ML Engineer | Agentic AI Developer | RAG & LLM Engineer",
  tagline: "Building intelligent AI systems, scalable web applications, autonomous agents, and production-ready AI platforms using LLMs, RAG, Machine Learning, React, Node.js, and Cloud Technologies.",
  email: "gunvanth752004@gmail.com",
  phone: "+91 6303157119",
  location: "Visakhapatnam, Andhra Pradesh, India",
  linkedin: "https://www.linkedin.com/in/gunvanth-m/",
  github: "https://github.com/gunwanth",
  resumeUrl: "/resume/gunvanth_resume.pdf",
  about: "Final-year B.Tech Computer Science Engineering (AI & ML) student with hands-on experience developing AI-powered products, Retrieval-Augmented Generation (RAG) systems, agentic AI workflows, intelligent chatbots, stock market analysis platforms, phishing detection systems, disease prediction models, and full-stack web applications. Experienced in designing scalable backend architectures, integrating LLMs, vector databases, broker APIs, cloud services, and real-time analytics platforms. Strong interest in Generative AI, Agentic AI, System Design, Machine Learning Engineering, and Full-Stack Development."
};

export const experiences = [
  {
    id: 1,
    title: "Full Stack AI/ML Engineer Intern",
    company: "AAVI Labs",
    period: "Mar 2026 - May 2026",
    description: "Developed production-grade AI systems, RAG pipelines, semantic search, and intelligent orchestration workflows.",
    highlights: [
      "Developed a production-grade AI chatbot platform",
      "Built Retrieval-Augmented Generation (RAG) pipelines",
      "Implemented semantic search and vector database integrations",
      "Developed AGI-inspired search workflows",
      "Created rubric-based AI evaluation frameworks",
      "Integrated multi-source APIs and intelligent orchestration systems",
      "Worked on real-time conversation management systems"
    ],
    type: "internship"
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "Naveen PVC Bend Works & Marketing Agencies",
    period: "Jan 2025 - Mar 2025",
    description: "Built Power BI dashboards, managed server reporting workflows, and improved business data analysis processes.",
    highlights: [
      "Built 5+ Power BI dashboards",
      "Reduced reporting time by 40%",
      "Performed server management and business data analysis",
      "Improved operational reporting processes"
    ],
    type: "internship"
  },
  {
    id: 3,
    title: "Google Cloud Generative AI Intern",
    company: "AICTE Eduskills",
    period: "Jul 2024 - Sep 2024",
    description: "Worked on Generative AI labs, Google Cloud AI services, prompt engineering, and cloud-based AI workflows.",
    highlights: [
      "Worked on Generative AI labs",
      "Learned Google Cloud AI services",
      "Practiced prompt engineering",
      "Built cloud-based AI workflows",
      "Worked with storage systems and cloud architecture"
    ],
    type: "internship"
  }
];

export const projects = [
  {
    id: 1,
    title: "NexaCore",
    description: "Full-stack agentic AI chat platform powered by SambaNova & Hugging Face APIs. Features a multi-step autonomous Dino agent with web grounding, persistent RAG knowledge base, and multi-session management.",
    technologies: ["Node.js", "Express.js", "React", "Vite", "PostgreSQL", "SambaNova API", "Agentic AI", "RAG"],
    highlights: [
      "Agentic ReAct loop (Dino 1.0) with web search, RAG retrieval, and autonomous knowledge storage",
      "Persistent knowledge base with full-text chunked retrieval and continuous self-learning",
      "Provider-cascade image generation pipeline with HF Inference, Freepik & local worker fallbacks"
    ],
    github: "https://github.com/gunwanth/FuboticsAI",
    demo: null
  },
  {
    id: 2,
    title: "AI Rule Builder",
    description: "React and React Flow workspace for designing rule pipelines, simulating executions, and generating Agent Data Protocol outputs across multiple domains.",
    technologies: ["React", "React Flow", "Node.js", "PostgreSQL", "Agent Data Protocol"],
    highlights: [
      "Visual workflow builder with draggable rule nodes and connected edges",
      "Simulation Lab for replaying rules, test cases, and execution traces",
      "ADP pipeline panel with raw, standardized, and SFT-ready outputs"
    ],
    github: "https://github.com/gunwanth/RuleManagement",
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
    title: "Sentinel",
    description: "Advanced AI-powered security platform for detecting phishing emails and SMS messages. Combines ML models, channel-aware ingestion pipelines, and agentic RAG workflows to identify and block threats in real time.",
    technologies: ["Python", "Machine Learning", "Flask", "Scikit-learn", "NLP", "Security Analysis"],
    highlights: [
      "Channel-aware phishing detection across Gmail and SMS with multi-model ensemble",
      "Agentic RAG pipeline for continuous threat intelligence learning and knowledge base growth",
      "Real-time URL, content, and behavioral feature extraction with explainable risk scoring"
    ],
    github: "https://github.com/gunwanth/Safechat_Intelligent_Messaging_System",
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
    title: "Agent Control Protocol",
    description: "Standardized protocol workflow for collecting, processing, validating, and converting agent training data into supervised fine-tuning formats.",
    technologies: ["Python", "Pydantic", "JSONL", "Pytest", "SFT Pipelines"],
    highlights: [
      "Unified schemas for agent actions, observations, and trajectories",
      "Multi-agent conversion support for OpenHands, SWE-agent, and AgentLab",
      "Built-in quality checks, schema validation, and dataset conversion tests"
    ],
    github: "https://github.com/neulab/agent-data-protocol",
    demo: "https://www.agentdataprotocol.com/"
  }
];

export const skills = {
  programming: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "C", "C++"],
  dataScience: ["Machine Learning", "Deep Learning", "Generative AI", "Agentic AI", "RAG Systems", "Prompt Engineering", "LLM Integration", "Semantic Search", "Vector Databases", "NLP", "Predictive Analytics"],
  frontend: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Streamlit"],
  backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT Authentication"],
  databases: ["PostgreSQL", "Firebase", "Supabase", "Vector Databases"],
  cloudDevOps: ["Google Cloud Platform", "Firebase Services", "Git", "GitHub", "Postman"],
  dataAnalytics: ["Power BI", "Excel", "Data Visualization", "Dashboard Development"],
  other: ["Agentic AI Systems", "Large Language Models (LLMs)", "AI Chatbots", "Multi-Agent Architectures", "Full Stack Development", "Machine Learning Engineering", "System Design", "Cloud Computing", "API Integration", "Vector Search Systems", "AI Evaluation Frameworks"]
};

export const certifications = [
  { id: 1, name: "Google Cloud Generative AI Certification", provider: "Google Cloud / AICTE Eduskills", year: "2024" },
  { id: 2, name: "Google Cloud Study Jam Badges", provider: "Google Cloud", year: "2024" },
  { id: 3, name: "Power BI Certification", provider: "Codecademy / Infosys Springboard", year: "2024" },
  { id: 4, name: "Java Certification", provider: "edX / CareerNinja", year: "2024" },
  { id: 5, name: "Python Certification", provider: "GUVI / Infosys Springboard", year: "2024" },
  { id: 6, name: "Prompt Engineering Certification", provider: "Cognitive AI Classes / Codecademy", year: "2024" },
  { id: 7, name: "Data Analytics Certification", provider: "APSSDC / Accenture", year: "2024" }
];

export const education = [
  {
    id: 1,
    degree: "Bachelor of Technology in Computer Science Engineering (AI/ML)",
    institution: "Gayatri Vidya Parishad College of Engineering",
    period: "Nov 2022 - Apr 2026",
    grade: "7.8/10 CGPA"
  }
];

export const achievements = [
  "Managed infrastructure handling 700+ application requests for a private business organization",
  "Successfully built multiple AI-powered production systems",
  "Completed AICTE Google Cloud Generative AI Internship",
  "Developed full-stack AI solutions integrating LLMs, RAG, and cloud services",
  "Participated in virtual experiences with Accenture and PwC",
  "Qualified for the Juspay Hiring Challenge 2025 - Round 1.2"
];
