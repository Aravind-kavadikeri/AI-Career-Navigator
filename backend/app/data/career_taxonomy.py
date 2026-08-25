"""
Career Taxonomy & Benchmark Dataset
Provides industry-grounded requirements, skill weights, career progression,
and domain keywords for each career role.
"""

from typing import Dict, List, Any

CAREERS_DATA: Dict[str, Dict[str, Any]] = {
    "Data Scientist": {
        "title": "Data Scientist",
        "category": "Data Science & AI",
        "tagline": "Turn complex data into actionable predictions and business insights",
        "description": "Data Scientists use statistical analysis, machine learning algorithms, and domain expertise to extract meaningful insights and build predictive models from large volumes of structured and unstructured data.",
        "difficulty": "Intermediate to Advanced",
        "required_skills": {
            "Python": 85,
            "SQL": 80,
            "Statistics": 85,
            "Machine Learning": 85,
            "Data Visualization": 75,
            "Deep Learning": 60,
            "Data Analysis": 85,
            "Mathematics": 75,
            "Excel": 65,
            "Power BI": 60,
            "Tableau": 65,
        },
        "core_technologies": ["Python", "SQL", "Pandas", "Scikit-Learn", "Matplotlib/Seaborn", "TensorFlow/PyTorch", "Jupyter", "Git"],
        "interest_keywords": ["Data Science", "Artificial Intelligence", "Machine Learning", "Data Analytics", "Research", "Statistics"],
        "typical_projects": [
            "Customer Churn Prediction & Lifetime Value Modeling",
            "E-commerce Recommendation System using Collaborative Filtering",
            "Medical Diagnosis Prediction with Explainable ML (SHAP/LIME)",
            "Automated Exploratory Data Analysis & Anomaly Detection Pipeline"
        ],
        "career_progression": [
            {"level": "Junior Data Scientist", "experience": "0-2 years", "focus": "Data cleaning, exploratory data analysis, baseline ML models, feature engineering"},
            {"level": "Data Scientist", "experience": "2-5 years", "focus": "End-to-end model development, A/B testing, business metric optimization, production deployment"},
            {"level": "Senior Data Scientist", "experience": "5-8 years", "focus": "System architecture, cross-functional project leadership, high-impact ML initiatives"},
            {"level": "Lead / Principal Data Scientist", "experience": "8+ years", "focus": "AI strategy, research direction, mentoring teams, executive stakeholder advisory"}
        ],
        "learning_modules": [
            {"skill": "Statistics & Probability", "hours": 24, "topics": ["Hypothesis Testing", "Bayesian Inference", "Distributions", "ANOVA"]},
            {"skill": "Machine Learning Foundations", "hours": 32, "topics": ["Regression", "Classification", "Ensembles (XGBoost/LightGBM)", "Cross-Validation"]},
            {"skill": "Feature Engineering & EDA", "hours": 20, "topics": ["Data Imputation", "Categorical Encoding", "Dimensionality Reduction (PCA)", "Outlier Handling"]},
            {"skill": "Model Interpretability & Deployment", "hours": 25, "topics": ["SHAP", "LIME", "FastAPI Serving", "Streamlit Dashboards"]}
        ]
    },

    "Data Analyst": {
        "title": "Data Analyst",
        "category": "Analytics & BI",
        "tagline": "Translate raw datasets into compelling visualizations and executive decisions",
        "description": "Data Analysts collect, clean, and analyze tabular data to identify trends, patterns, and anomalies, presenting findings through interactive dashboards and executive reports.",
        "difficulty": "Beginner to Intermediate",
        "required_skills": {
            "SQL": 90,
            "Excel": 85,
            "Power BI": 80,
            "Tableau": 80,
            "Data Visualization": 85,
            "Data Analysis": 90,
            "Statistics": 70,
            "Python": 70,
            "Mathematics": 60,
            "Machine Learning": 40,
            "Deep Learning": 20,
        },
        "core_technologies": ["SQL", "Excel", "Power BI", "Tableau", "Python (Pandas)", "PostgreSQL", "Google Looker Studio"],
        "interest_keywords": ["Data Analytics", "Data Science", "Product Management", "Business Analyst", "Statistics"],
        "typical_projects": [
            "Executive Sales & Revenue KPI Performance Dashboard in Power BI",
            "User Retention & Churn Cohort Analysis using Advanced SQL Window Functions",
            "Supply Chain Logistics Optimization & Cost Analysis Report",
            "Marketing Campaign ROI & Conversion Funnel Analysis"
        ],
        "career_progression": [
            {"level": "Junior Data Analyst", "experience": "0-2 years", "focus": "Ad-hoc SQL queries, spreadsheet cleanup, dashboard maintenance"},
            {"level": "Data Analyst", "experience": "2-4 years", "focus": "Complex data modeling, self-serve BI architectures, cohort & funnel analysis"},
            {"level": "Senior Data Analyst", "experience": "4-7 years", "focus": "Strategic forecasting, cross-team analytics leadership, executive reporting"},
            {"level": "Analytics Manager / Head of BI", "experience": "7+ years", "focus": "BI roadmap, data governance, analytics team management"}
        ],
        "learning_modules": [
            {"skill": "Advanced SQL for Analytics", "hours": 26, "topics": ["Window Functions", "CTEs", "Subqueries", "Query Optimization", "Aggregations"]},
            {"skill": "Business Intelligence & BI Tools", "hours": 28, "topics": ["Power BI DAX", "Tableau Visual Storytelling", "Data Modeling", "Dashboard UX"]},
            {"skill": "Statistical Analysis for Business", "hours": 18, "topics": ["Hypothesis Testing", "Correlation vs Causation", "A/B Testing Basics"]},
            {"skill": "Python for Data Cleaning", "hours": 20, "topics": ["Pandas", "NumPy", "Seaborn Visualization", "Automated Reporting"]}
        ]
    },

    "ML Engineer": {
        "title": "ML Engineer",
        "category": "Machine Learning & Engineering",
        "tagline": "Build, optimize, and deploy scalable machine learning systems in production",
        "description": "Machine Learning Engineers bridge the gap between data science experimentation and software engineering, creating production-grade ML pipelines, low-latency inference APIs, and automated training workflows.",
        "difficulty": "Advanced",
        "required_skills": {
            "Python": 90,
            "Machine Learning": 90,
            "Deep Learning": 80,
            "SQL": 70,
            "Data Analysis": 75,
            "Mathematics": 80,
            "Statistics": 80,
            "C++": 60,
            "Java": 55,
            "Data Visualization": 65,
            "Excel": 40,
        },
        "core_technologies": ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Docker", "FastAPI", "MLflow", "ONNX", "Kubernetes"],
        "interest_keywords": ["Machine Learning", "Artificial Intelligence", "Software Development", "Cloud Computing", "Research"],
        "typical_projects": [
            "Real-Time Fraud Detection API with Sub-100ms Inference Latency",
            "End-to-End MLOps Pipeline with MLflow Experiment Tracking & Docker Deployment",
            "Scalable Semantic Search Engine using Vector Embeddings & FAISS",
            "Distributed Model Training & Hyperparameter Tuning Pipeline"
        ],
        "career_progression": [
            {"level": "Junior ML Engineer", "experience": "0-2 years", "focus": "Model serialization, REST API endpoints, automated testing, feature stores"},
            {"level": "Machine Learning Engineer", "experience": "2-5 years", "focus": "Distributed training, model quantization, CI/CD for ML, monitoring drift"},
            {"level": "Senior ML Engineer", "experience": "5-8 years", "focus": "Production ML architecture, latency reduction, MLOps orchestration at scale"},
            {"level": "Staff / Lead ML Systems Architect", "experience": "8+ years", "focus": "Enterprise AI infrastructure, GPU cluster optimization, tech vision"}
        ],
        "learning_modules": [
            {"skill": "Advanced ML Algorithms & Math", "hours": 35, "topics": ["Gradient Boosting", "Optimization Math (SGD/Adam)", "Loss Functions", "Regularization"]},
            {"skill": "Deep Learning & Neural Architectures", "hours": 40, "topics": ["CNNs", "Transformers", "Transfer Learning", "PyTorch Core"]},
            {"skill": "Production ML & Serving", "hours": 30, "topics": ["FastAPI", "Docker", "Triton Server", "Model Quantization & ONNX"]},
            {"skill": "MLOps & Pipeline Automation", "hours": 28, "topics": ["MLflow", "DVC", "Model Monitoring & Data Drift", "CI/CD Workflows"]}
        ]
    },

    "AI Engineer": {
        "title": "AI Engineer",
        "category": "GenAI & Applied AI",
        "tagline": "Architect next-generation applications powered by LLMs, GenAI, and multimodal models",
        "description": "AI Engineers build intelligent software solutions leveraging state-of-the-art Large Language Models, Retrieval-Augmented Generation (RAG), Autonomous Agents, and Vision-Language models.",
        "difficulty": "Advanced",
        "required_skills": {
            "Python": 90,
            "NLP": 85,
            "Deep Learning": 80,
            "Machine Learning": 80,
            "Computer Vision": 75,
            "JavaScript": 70,
            "SQL": 70,
            "Data Analysis": 70,
            "Statistics": 70,
            "Mathematics": 75,
            "HTML": 65,
            "CSS": 60,
        },
        "core_technologies": ["Python", "LangChain/LlamaIndex", "Hugging Face", "PyTorch", "Vector DBs (Chroma/Pinecone)", "FastAPI", "TypeScript", "Next.js"],
        "interest_keywords": ["Artificial Intelligence", "Machine Learning", "Software Development", "Research", "Product Management"],
        "typical_projects": [
            "Enterprise Multi-Document RAG Assistant with Hybrid Search & Citations",
            "Autonomous Multi-Agent Task Planner using LangGraph and Tool Execution",
            "Multimodal Image & Document Intelligence Analyzer with Vision LLMs",
            "Domain-Specific LLM Fine-Tuning Pipeline using LoRA / QLoRA"
        ],
        "career_progression": [
            {"level": "Associate AI Engineer", "experience": "0-2 years", "focus": "Prompt engineering, RAG pipelines, API integrations, vector databases"},
            {"level": "AI Engineer", "experience": "2-5 years", "focus": "Agentic workflows, model fine-tuning, evaluation frameworks, guardrails"},
            {"level": "Senior AI Systems Engineer", "experience": "5-8 years", "focus": "Enterprise GenAI platform design, cost/latency optimization, governance"},
            {"level": "Principal AI Architect", "experience": "8+ years", "focus": "Company-wide AI roadmap, proprietary model strategy, frontier AI innovation"}
        ],
        "learning_modules": [
            {"skill": "LLM Fundamentals & Prompt Engineering", "hours": 20, "topics": ["Tokenization", "Context Windows", "Chain-of-Thought", "Few-Shot Prompting"]},
            {"skill": "Retrieval Augmented Generation (RAG)", "hours": 32, "topics": ["Chunking Strategies", "Vector Embeddings", "Hybrid Search", "Re-ranking"]},
            {"skill": "Agentic Architectures & Tool Use", "hours": 30, "topics": ["ReAct Pattern", "LangGraph", "Function Calling", "Stateful Memory"]},
            {"skill": "Fine-Tuning & Evaluation", "hours": 28, "topics": ["PEFT / LoRA", "RAGAS Evaluation", "Guardrails & Safety", "Deployment"]}
        ]
    },

    "Data Engineer": {
        "title": "Data Engineer",
        "category": "Data Infrastructure",
        "tagline": "Design and build resilient, high-throughput pipelines and modern lakehouse architectures",
        "description": "Data Engineers construct scalable data pipelines, data warehouses, and streaming architectures that collect, transform, and deliver clean, reliable data to analytics and machine learning teams.",
        "difficulty": "Intermediate to Advanced",
        "required_skills": {
            "SQL": 95,
            "Python": 85,
            "Java": 75,
            "C++": 60,
            "Data Analysis": 75,
            "Mathematics": 65,
            "Statistics": 60,
            "Machine Learning": 50,
            "Excel": 60,
            "Power BI": 50,
            "Tableau": 50,
        },
        "core_technologies": ["SQL", "Python", "Apache Spark", "Airflow", "PostgreSQL", "Snowflake/BigQuery", "Kafka", "Docker", "dbt"],
        "interest_keywords": ["Cloud Computing", "Software Development", "Data Analytics", "Data Science"],
        "typical_projects": [
            "Automated Real-Time Streaming Pipeline with Apache Kafka and Spark",
            "Modern Analytics Lakehouse Data Pipeline with dbt, Airflow, and BigQuery",
            "High-Performance Change Data Capture (CDC) Pipeline for Financial Transactions",
            "Distributed Data Quality & Anomaly Validation Suite"
        ],
        "career_progression": [
            {"level": "Junior Data Engineer", "experience": "0-2 years", "focus": "SQL transformations, ETL pipeline maintenance, data ingestion scripts"},
            {"level": "Data Engineer", "experience": "2-5 years", "focus": "Distributed Spark pipelines, data warehousing modeling (Kimball), Airflow DAGs"},
            {"level": "Senior Data Engineer", "experience": "5-8 years", "focus": "Lakehouse architecture, streaming infrastructure, reliability and governance"},
            {"level": "Principal Data Architect", "experience": "8+ years", "focus": "Enterprise data platform vision, cloud migrations, performance optimization"}
        ],
        "learning_modules": [
            {"skill": "Expert SQL & Data Modeling", "hours": 30, "topics": ["Dimensional Modeling (Star/Snowflake)", "Partitioning", "Indexing", "Query Tuning"]},
            {"skill": "Distributed Computing with Spark", "hours": 35, "topics": ["PySpark DataFrames", "RDDs", "Spark Streaming", "Memory Management"]},
            {"skill": "Workflow Orchestration with Airflow", "hours": 24, "topics": ["DAGs", "Operators & Sensors", "Error Handling", "Scheduling"]},
            {"skill": "Modern Data Stack & Cloud DW", "hours": 26, "topics": ["dbt Transformations", "Snowflake / BigQuery", "Kafka Ingestion", "Delta Lake"]}
        ]
    },

    "Software Engineer": {
        "title": "Software Engineer",
        "category": "Core Software & Web",
        "tagline": "Engineer robust, scalable applications and resilient distributed systems",
        "description": "Software Engineers design, develop, test, and maintain software applications, APIs, and microservices powering modern digital products and platforms.",
        "difficulty": "Intermediate",
        "required_skills": {
            "Python": 80,
            "JavaScript": 85,
            "HTML": 85,
            "CSS": 80,
            "Java": 80,
            "C++": 75,
            "C": 70,
            "SQL": 75,
            "Mathematics": 70,
            "Data Analysis": 50,
            "Machine Learning": 40,
        },
        "core_technologies": ["JavaScript/TypeScript", "React", "Node.js/Express", "Python (FastAPI/Django)", "Java/Spring Boot", "Git", "Docker", "PostgreSQL"],
        "interest_keywords": ["Software Development", "Cloud Computing", "Cybersecurity", "Product Management"],
        "typical_projects": [
            "Full-Stack Collaborative SaaS Platform with WebSockets & Role-Based Access Control",
            "High-Throughput RESTful Microservices Backend with Redis Caching",
            "DevOps CI/CD Automation Pipeline with Containerized Deployments",
            "Secure E-Commerce Platform with Payment Gateway & Inventory Management"
        ],
        "career_progression": [
            {"level": "Junior Software Engineer", "experience": "0-2 years", "focus": "Feature development, unit testing, bug fixing, code reviews"},
            {"level": "Software Engineer", "experience": "2-5 years", "focus": "System design, API contract design, microservices architecture, performance"},
            {"level": "Senior Software Engineer", "experience": "5-8 years", "focus": "Technical leadership, distributed architecture, mentorship, scalability"},
            {"level": "Staff / Lead Architect", "experience": "8+ years", "focus": "Engineering roadmap, cross-system design, reliability standards, strategy"}
        ],
        "learning_modules": [
            {"skill": "Data Structures & Algorithms", "hours": 40, "topics": ["Trees & Graphs", "Dynamic Programming", "Time & Space Complexity", "Hash Maps"]},
            {"skill": "Full-Stack Web Development", "hours": 35, "topics": ["React & TypeScript", "State Management", "REST APIs", "Authentication (JWT/OAuth)"]},
            {"skill": "System Design & Microservices", "hours": 30, "topics": ["Scalability", "Load Balancing", "Database Sharding", "Caching with Redis"]},
            {"skill": "DevOps & Cloud Deployment", "hours": 22, "topics": ["Docker", "GitHub Actions CI/CD", "AWS/GCP Basics", "Monitoring"]}
        ]
    },

    "Business Analyst": {
        "title": "Business Analyst",
        "category": "Strategy & Business Intelligence",
        "tagline": "Bridge business strategy with technological solutions through data-driven decisions",
        "description": "Business Analysts analyze business domains, document processes, identify organizational inefficiencies, and craft data-driven requirements for technical teams.",
        "difficulty": "Beginner to Intermediate",
        "required_skills": {
            "Excel": 90,
            "Power BI": 80,
            "Tableau": 80,
            "SQL": 75,
            "Data Analysis": 85,
            "Data Visualization": 80,
            "Statistics": 65,
            "Python": 50,
            "Mathematics": 55,
            "Machine Learning": 30,
        },
        "core_technologies": ["Excel (Advanced VBA/Macros)", "Power BI", "Tableau", "SQL", "Jira/Confluence", "Figma", "Lucidchart"],
        "interest_keywords": ["Product Management", "Data Analytics", "Business Analyst", "Cybersecurity"],
        "typical_projects": [
            "Customer Journey Optimization & Revenue Leakage Discovery Analysis",
            "Enterprise Process Automation & Cost-Benefit Feasibility Study",
            "Comprehensive Product Metric Dashboard (Retention, LTV, CAC)",
            "Market Opportunity Assessment & Competitor Benchmarking Matrix"
        ],
        "career_progression": [
            {"level": "Associate Business Analyst", "experience": "0-2 years", "focus": "Requirements gathering, user story writing, basic reporting"},
            {"level": "Business Analyst", "experience": "2-5 years", "focus": "Process re-engineering, stakeholder management, KPI frameworks"},
            {"level": "Senior Business Analyst", "experience": "5-8 years", "focus": "Strategic roadmap development, enterprise change management"},
            {"level": "Director of Business Operations / PM", "experience": "8+ years", "focus": "Organizational strategy, product vision, executive decision making"}
        ],
        "learning_modules": [
            {"skill": "Advanced Excel & Financial Modeling", "hours": 25, "topics": ["VLOOKUP/XLOOKUP", "Pivot Tables", "Scenario Manager", "VBA Basics"]},
            {"skill": "Business Intelligence & Dashboards", "hours": 28, "topics": ["Power BI KPI Design", "Executive Reporting", "Storytelling with Data"]},
            {"skill": "Requirements Engineering & Agile", "hours": 20, "topics": ["User Stories", "Acceptance Criteria", "Scrum Framework", "BPMN Process Flows"]},
            {"skill": "SQL for Business Inquiries", "hours": 22, "topics": ["Data Extraction", "Customer Segmentation", "Cohort Queries"]}
        ]
    },

    "AI Researcher": {
        "title": "AI Researcher",
        "category": "Scientific Research & Frontier AI",
        "tagline": "Pioneer groundbreaking algorithms and advance the theoretical frontier of AI",
        "description": "AI Research Scientists conduct novel research in machine learning theory, novel neural architectures, generative models, reinforcement learning, and cognitive computing.",
        "difficulty": "Advanced to Expert",
        "required_skills": {
            "Python": 95,
            "Mathematics": 95,
            "Statistics": 90,
            "Machine Learning": 95,
            "Deep Learning": 95,
            "NLP": 85,
            "Computer Vision": 85,
            "C++": 75,
            "Data Analysis": 80,
            "Data Visualization": 70,
            "SQL": 60,
        },
        "core_technologies": ["PyTorch", "JAX", "LaTeX", "C++", "Hugging Face", "CUDA", "Weights & Biases", "NumPy/SciPy"],
        "interest_keywords": ["Research", "Artificial Intelligence", "Machine Learning", "Statistics"],
        "typical_projects": [
            "Novel Attention Mechanism for Low-Compute Transformer Architectures",
            "Self-Supervised Representation Learning for Multimodal Biomedical Imaging",
            "Sample-Efficient Reinforcement Learning Algorithm with Physics Constraints",
            "Mathematical Formalization of Interpretability & Neural Circuit Probing"
        ],
        "career_progression": [
            {"level": "Research Fellow / PhD Intern", "experience": "0-2 years", "focus": "Literature review, reproducibility studies, baseline model experimentation"},
            {"level": "Research Scientist", "experience": "2-5 years", "focus": "Novel algorithm design, conference publication (NeurIPS/ICML), paper authoring"},
            {"level": "Senior Research Scientist", "experience": "5-8 years", "focus": "Leading research initiatives, patent filings, grant proposals, research teams"},
            {"level": "Principal Research Scientist / VP of AI Research", "experience": "8+ years", "focus": "Frontier AI agenda, fundamental research lab direction"}
        ],
        "learning_modules": [
            {"skill": "Advanced Linear Algebra & Optimization", "hours": 45, "topics": ["Matrix Decompositions", "Convex Optimization", "Information Theory", "Measure Theory"]},
            {"skill": "Deep Learning Theory & Architectures", "hours": 50, "topics": ["Diffusion Models", "Transformer Mechanics", "Energy-Based Models", "Mechanistic Interpretability"]},
            {"skill": "High-Performance Computing & JAX/CUDA", "hours": 35, "topics": ["JAX Autograd & vmap", "Custom CUDA Kernels", "Distributed Tensor Parallelism"]},
            {"skill": "Academic Writing & Research Methods", "hours": 20, "topics": ["Paper Writing", "Benchmarking Rigor", "Peer Review Process"]}
        ]
    }
}

# Pre-defined list of selectable skills across Technical and AI domains
ALL_TECHNICAL_SKILLS = [
    "Python", "SQL", "Java", "C", "C++", "JavaScript", "HTML", "CSS", "Excel", "Power BI", "Tableau"
]

ALL_AI_SKILLS = [
    "Statistics", "Mathematics", "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Data Visualization", "Data Analysis"
]

ALL_INTERESTS = [
    "Data Science", "Artificial Intelligence", "Machine Learning", "Data Analytics",
    "Software Development", "Cybersecurity", "Cloud Computing", "Product Management", "Research"
]

ALL_CAREER_OPTIONS = [
    "Data Scientist", "Data Analyst", "ML Engineer", "AI Engineer",
    "Data Engineer", "Software Engineer", "Business Analyst", "AI Researcher"
]
