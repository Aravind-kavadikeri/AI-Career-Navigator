"""
Personalized Roadmap Generator
Constructs a dynamic 6-month career preparation roadmap based on detected
skill gaps, preferred career targets, and student experience level.
Includes curated learning resources, direct tutorials, and gamified XP rewards.
"""

from typing import List, Dict, Any
from app.data.career_taxonomy import CAREERS_DATA
from app.schemas.schemas import RoadmapStage, ResourceItem, ProfileCreate


class RoadmapEngine:
    @staticmethod
    def generate_roadmap(profile: ProfileCreate, target_role: str = "Data Scientist", completed_milestone_ids: List[str] = None) -> List[RoadmapStage]:
        """
        Generate a structured 6-month personalized learning roadmap with resource links.
        """
        if target_role not in CAREERS_DATA:
            target_role = "Data Scientist"

        completed_set = set(completed_milestone_ids or [])
        user_skills_dict = {s.name.lower(): s.level for s in profile.skills}

        # Role-specific tailored roadmaps with curated resources
        if target_role == "Data Scientist":
            stages_data = [
                {
                    "month": 1,
                    "title": "Python Foundations & Advanced Statistics",
                    "skills": ["Python", "Statistics", "Probability", "NumPy & Pandas"],
                    "learning_objectives": [
                        "Master vectorization and exploratory data analysis with Pandas",
                        "Conduct statistical hypothesis testing (Z-tests, T-tests, ANOVA)",
                        "Understand distributions, Central Limit Theorem, and Bayesian fundamentals"
                    ],
                    "recommended_projects": ["Automated Exploratory Data Analysis Toolkit", "Statistical Analysis of Real-World Housing Trends"],
                    "estimated_hours": 30,
                    "difficulty": "Intermediate",
                    "xp_reward": 300,
                    "resources": [
                        {"title": "Python Data Science Handbook", "url": "https://jakevdp.github.io/PythonDataScienceHandbook/", "type": "Interactive Book", "platform": "Free Online Book"},
                        {"title": "StatQuest: Statistics Fundamentals", "url": "https://statquest.org/", "type": "Video Masterclass", "platform": "YouTube / StatQuest"},
                        {"title": "Kaggle Pandas Micro-Course", "url": "https://www.kaggle.com/learn/pandas", "type": "Hands-on Practice", "platform": "Kaggle Learn"}
                    ]
                },
                {
                    "month": 2,
                    "title": "Advanced SQL & Feature Engineering",
                    "skills": ["SQL", "Data Analysis", "Feature Transformation"],
                    "learning_objectives": [
                        "Write complex SQL window functions, CTEs, and recursive queries",
                        "Build automated imputation, categorical encoding, and scaling pipelines",
                        "Perform dimensionality reduction using PCA and t-SNE"
                    ],
                    "recommended_projects": ["E-Commerce Customer Retention & Cohort Analytics", "Credit Risk Feature Engineering Pipeline"],
                    "estimated_hours": 32,
                    "difficulty": "Intermediate",
                    "xp_reward": 350,
                    "resources": [
                        {"title": "Mode Analytics SQL Tutorial", "url": "https://mode.com/sql-tutorial/", "type": "Interactive Guide", "platform": "Mode Analytics"},
                        {"title": "Kaggle Feature Engineering", "url": "https://www.kaggle.com/learn/feature-engineering", "type": "Interactive Practice", "platform": "Kaggle"},
                        {"title": "LeetCode Top 50 SQL Study Plan", "url": "https://leetcode.com/studyplan/top-sql-50/", "type": "Practice Challenges", "platform": "LeetCode"}
                    ]
                },
                {
                    "month": 3,
                    "title": "Supervised & Unsupervised Machine Learning",
                    "skills": ["Machine Learning", "Scikit-Learn", "Model Evaluation"],
                    "learning_objectives": [
                        "Implement gradient boosted trees (XGBoost, LightGBM, CatBoost)",
                        "Perform rigorous cross-validation and hyperparameter tuning with Optuna",
                        "Evaluate models using ROC-AUC, PR curves, F1-scores, and calibration"
                    ],
                    "recommended_projects": ["Customer Churn Prediction & Value Maximization", "Unsupervised Market Basket Clustering Engine"],
                    "estimated_hours": 38,
                    "difficulty": "Intermediate to Advanced",
                    "xp_reward": 400,
                    "resources": [
                        {"title": "Scikit-Learn Official User Guide", "url": "https://scikit-learn.org/stable/user_guide.html", "type": "Official Documentation", "platform": "Scikit-Learn"},
                        {"title": "Machine Learning Specialization by Andrew Ng", "url": "https://www.deeplearning.ai/courses/machine-learning-specialization/", "type": "Video Course", "platform": "DeepLearning.AI"},
                        {"title": "Optuna Hyperparameter Tuning Guide", "url": "https://optuna.readthedocs.io/", "type": "Official Docs", "platform": "Optuna"}
                    ]
                },
                {
                    "month": 4,
                    "title": "Explainable AI & ML Pipeline Engineering",
                    "skills": ["Explainable AI (SHAP/LIME)", "FastAPI", "Data Visualization"],
                    "learning_objectives": [
                        "Compute global and local feature attributions using SHAP and TreeSHAP",
                        "Package predictive ML pipelines into robust FastAPI REST endpoints",
                        "Design interactive analytical dashboards with Streamlit and Plotly"
                    ],
                    "recommended_projects": ["Medical Diagnosis Explainer Dashboard (SHAP/FastAPI)", "Real-Time Pricing Recommendation API"],
                    "estimated_hours": 35,
                    "difficulty": "Advanced",
                    "xp_reward": 450,
                    "resources": [
                        {"title": "Interpretable Machine Learning (SHAP Book)", "url": "https://christophm.github.io/interpretable-ml-book/", "type": "Free Online Book", "platform": "GitHub Pages"},
                        {"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/", "type": "Official Documentation", "platform": "FastAPI"},
                        {"title": "Streamlit Documentation & Component Gallery", "url": "https://docs.streamlit.io/", "type": "Hands-on Guide", "platform": "Streamlit"}
                    ]
                },
                {
                    "month": 5,
                    "title": "Deep Learning & NLP Foundations",
                    "skills": ["Deep Learning", "PyTorch", "NLP", "Transformers"],
                    "learning_objectives": [
                        "Construct multi-layer perceptrons and convolutional networks in PyTorch",
                        "Understand self-attention mechanisms and Hugging Face Transformers",
                        "Fine-tune pre-trained models for domain-specific text classification"
                    ],
                    "recommended_projects": ["Sentiment & Aspect-Based Opinion Mining System", "Multimodal Image & Text Search Engine"],
                    "estimated_hours": 42,
                    "difficulty": "Advanced",
                    "xp_reward": 500,
                    "resources": [
                        {"title": "Practical Deep Learning for Coders", "url": "https://course.fast.ai/", "type": "Full Course", "platform": "Fast.ai"},
                        {"title": "PyTorch 60-Minute Blitz", "url": "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html", "type": "Official Tutorial", "platform": "PyTorch"},
                        {"title": "Hugging Face NLP Course", "url": "https://huggingface.co/learn/nlp-course", "type": "Interactive Course", "platform": "Hugging Face"}
                    ]
                },
                {
                    "month": 6,
                    "title": "Portfolio Deployment & Technical Interview Prep",
                    "skills": ["Portfolio Engineering", "Docker", "ML System Design", "Interview Prep"],
                    "learning_objectives": [
                        "Deploy end-to-end full-stack AI portfolio on cloud infrastructure with Docker",
                        "Master Data Science system design (latency, drift, cold-start problems)",
                        "Complete 50+ live SQL and Machine Learning algorithmic coding challenges"
                    ],
                    "recommended_projects": ["Full-Stack AI Career Intelligence SaaS Showcase", "Open-Source Python ML Benchmark Library"],
                    "estimated_hours": 28,
                    "difficulty": "Advanced",
                    "xp_reward": 600,
                    "resources": [
                        {"title": "Made With ML: Production MLOps", "url": "https://madewithml.com/", "type": "Interactive Guide", "platform": "Made With ML"},
                        {"title": "ML Systems Design Primer", "url": "https://github.com/chiphuyen/machine-learning-systems-design", "type": "Curated Guide", "platform": "GitHub"},
                        {"title": "Data Science Interview Repository", "url": "https://github.com/alexeygrigorev/data-science-interviews", "type": "Interview Q&A", "platform": "GitHub"}
                    ]
                }
            ]
        elif target_role == "Data Analyst":
            stages_data = [
                {
                    "month": 1,
                    "title": "Advanced Excel & Business Metrics",
                    "skills": ["Excel", "Data Analysis", "Financial Modeling"],
                    "learning_objectives": [
                        "Master nested XLOOKUP, INDEX/MATCH, Dynamic Arrays, and Pivot Tables",
                        "Understand business KPIs: CAC, LTV, Churn, Retention, MRR, Gross Margins",
                        "Build interactive financial sensitivity and scenario analysis workbooks"
                    ],
                    "recommended_projects": ["SaaS Financial Model & Unit Economics Simulator", "Retail Store Sales & Profit Margin Analyzer"],
                    "estimated_hours": 24,
                    "difficulty": "Beginner to Intermediate",
                    "xp_reward": 250,
                    "resources": [
                        {"title": "Excel for Business Specialization", "url": "https://www.coursera.org/specializations/excel", "type": "Interactive Course", "platform": "Coursera"},
                        {"title": "Corporate Finance Institute Excel Guide", "url": "https://corporatefinanceinstitute.com/resources/excel/", "type": "Free Tutorial", "platform": "CFI"},
                        {"title": "SaaS Metrics Guide by David Skok", "url": "https://www.forentrepreneurs.com/saas-metrics-2/", "type": "Industry Guide", "platform": "ForEntrepreneurs"}
                    ]
                },
                {
                    "month": 2,
                    "title": "Modern SQL Mastery for Analytics",
                    "skills": ["SQL", "PostgreSQL", "Database Schema Design"],
                    "learning_objectives": [
                        "Write complex Window functions (RANK, DENSE_RANK, LEAD, LAG, NTILE)",
                        "Implement Common Table Expressions (CTEs) and recursive queries",
                        "Optimize execution plans and build aggregate summary views"
                    ],
                    "recommended_projects": ["Subscription Churn Cohort SQL Analyzer", "Hospital Patient Flow & Wait-Time Optimization Query Suite"],
                    "estimated_hours": 30,
                    "difficulty": "Intermediate",
                    "xp_reward": 300,
                    "resources": [
                        {"title": "Mode SQL Tutorial for Analysts", "url": "https://mode.com/sql-tutorial/", "type": "Interactive Guide", "platform": "Mode"},
                        {"title": "StrataScratch SQL Practice", "url": "https://www.stratascratch.com/", "type": "Real Company Questions", "platform": "StrataScratch"},
                        {"title": "PostgreSQL Window Functions Guide", "url": "https://www.postgresqltutorial.com/postgresql-window-function/", "type": "Tutorial", "platform": "PostgreSQL Tutorial"}
                    ]
                },
                {
                    "month": 3,
                    "title": "Power BI & Enterprise Data Modeling",
                    "skills": ["Power BI", "DAX", "Data Modeling"],
                    "learning_objectives": [
                        "Construct Star and Snowflake schemas in Power BI Power Query",
                        "Write advanced DAX measures (CALCULATE, FILTER, Time Intelligence)",
                        "Implement Row-Level Security (RLS) and dynamic visual bookmarking"
                    ],
                    "recommended_projects": ["Executive C-Suite Sales KPI Dashboard", "Global Supply Chain Logistics & Delay Tracker"],
                    "estimated_hours": 32,
                    "difficulty": "Intermediate",
                    "xp_reward": 350,
                    "resources": [
                        {"title": "Microsoft Learn: Power BI Data Analyst Path", "url": "https://learn.microsoft.com/en-us/training/paths/data-analytics-microsoft/", "type": "Official Microsoft Path", "platform": "Microsoft Learn"},
                        {"title": "SQLBI DAX Guide & Patterns", "url": "https://www.daxpatterns.com/", "type": "Best Practice Patterns", "platform": "SQLBI"},
                        {"title": "Maven Analytics Power BI Challenges", "url": "https://www.mavenanalytics.io/challenges", "type": "Hands-on Practice", "platform": "Maven Analytics"}
                    ]
                },
                {
                    "month": 4,
                    "title": "Tableau & Visual Storytelling",
                    "skills": ["Tableau", "Data Visualization", "Storyboarding"],
                    "learning_objectives": [
                        "Master Level of Detail (LOD) expressions in Tableau (FIXED, INCLUDE, EXCLUDE)",
                        "Design accessible, high-contrast visual narratives and interactive parameters",
                        "Publish and maintain public Tableau portfolios"
                    ],
                    "recommended_projects": ["Global Climate & Renewable Energy Transition Story", "E-Commerce Funnel Drop-off Diagnostic Tool"],
                    "estimated_hours": 28,
                    "difficulty": "Intermediate",
                    "xp_reward": 350,
                    "resources": [
                        {"title": "Tableau Public Learning Videos", "url": "https://www.tableau.com/learn/training", "type": "Official Videos", "platform": "Tableau"},
                        {"title": "Makeover Monday Community Datasets", "url": "https://www.makeovermonday.co.uk/", "type": "Weekly Visual Practice", "platform": "MakeoverMonday"},
                        {"title": "Storytelling with Data Guide", "url": "https://www.storytellingwithdata.com/", "type": "Design Principles", "platform": "Storytelling With Data"}
                    ]
                },
                {
                    "month": 5,
                    "title": "Python for Automated Analytics",
                    "skills": ["Python", "Pandas", "Seaborn", "Automated Reporting"],
                    "learning_objectives": [
                        "Clean raw unstructured CSV/JSON exports with Pandas",
                        "Generate automated weekly PDF/HTML reports with Python scripts",
                        "Perform basic statistical correlation and A/B test validation"
                    ],
                    "recommended_projects": ["Automated Multi-Channel Marketing Attribution Pipeline", "Customer Survey NLP Word-Cloud & Sentiment Visualizer"],
                    "estimated_hours": 26,
                    "difficulty": "Intermediate",
                    "xp_reward": 400,
                    "resources": [
                        {"title": "Automate the Boring Stuff with Python", "url": "https://automatetheboringstuff.com/", "type": "Free Book", "platform": "Al Sweigart"},
                        {"title": "Seaborn Gallery & Tutorials", "url": "https://seaborn.pydata.org/examples/index.html", "type": "Code Gallery", "platform": "Seaborn"},
                        {"title": "Kaggle Data Cleaning Course", "url": "https://www.kaggle.com/learn/data-cleaning", "type": "Hands-on Practice", "platform": "Kaggle"}
                    ]
                },
                {
                    "month": 6,
                    "title": "Business Case Studies & Interview Readiness",
                    "skills": ["Case Studies", "Stakeholder Communication", "Portfolio Review"],
                    "learning_objectives": [
                        "Solve real-world business case interview questions (root-cause analysis)",
                        "Refine public GitHub & Tableau portfolio with documented business ROI",
                        "Practice behavioral and technical analytics interviews"
                    ],
                    "recommended_projects": ["Comprehensive FinTech Fraud & Chargeback Business Review", "Product Feature A/B Test Rollout Recommendation Memo"],
                    "estimated_hours": 22,
                    "difficulty": "Intermediate",
                    "xp_reward": 500,
                    "resources": [
                        {"title": "Case Interview Secrets & Analytics Frameworks", "url": "https://www.caseinterview.com/", "type": "Case Frameworks", "platform": "Victor Cheng"},
                        {"title": "Data Analyst Interview Questions (GitHub)", "url": "https://github.com/virgili0/open-datasource", "type": "Curated Q&A", "platform": "GitHub"},
                        {"title": "Analytics Portfolio Guide", "url": "https://towardsdatascience.com/how-to-build-a-data-analyst-portfolio-that-gets-you-hired-7df7ce982e5b", "type": "Portfolio Strategy", "platform": "Towards Data Science"}
                    ]
                }
            ]
        elif target_role == "ML Engineer":
            stages_data = [
                {
                    "month": 1,
                    "title": "Python Algorithms & Math for ML",
                    "skills": ["Python", "Linear Algebra", "Calculus", "Optimization"],
                    "learning_objectives": [
                        "Implement gradient descent and backpropagation from scratch in pure NumPy",
                        "Master vector spaces, eigenvalues, singular value decomposition (SVD)",
                        "Write clean, modular, object-oriented Python code following PEP 8"
                    ],
                    "recommended_projects": ["NumPy-Only Neural Network & Autograd Engine", "Custom Matrix Decomposition & Compression Tool"],
                    "estimated_hours": 35,
                    "difficulty": "Intermediate to Advanced",
                    "xp_reward": 350,
                    "resources": [
                        {"title": "Essence of Linear Algebra (3Blue1Brown)", "url": "https://www.3blue1brown.com/topics/linear-algebra", "type": "Visual Math Series", "platform": "3Blue1Brown"},
                        {"title": "Mathematics for Machine Learning (Free Book)", "url": "https://mml-book.github.io/", "type": "Academic Textbook", "platform": "Cambridge Press"},
                        {"title": "NumPy Illustrated Tutorial", "url": "https://betterprogramming.pub/numpy-illustrated-the-visual-guide-to-numpy-3b1d4976de1d", "type": "Visual Guide", "platform": "Medium"}
                    ]
                },
                {
                    "month": 2,
                    "title": "Production Machine Learning & Scikit-Learn",
                    "skills": ["Machine Learning", "Scikit-Learn", "Model Optimization"],
                    "learning_objectives": [
                        "Design custom Scikit-Learn Transformers and Pipelines",
                        "Master LightGBM, XGBoost, and CatBoost with GPU acceleration",
                        "Conduct Bayesian hyperparameter optimization with Optuna"
                    ],
                    "recommended_projects": ["Real-Time Click-Through Rate (CTR) Prediction Service", "High-Dimensional Fraud Detection Engine with Custom Loss"],
                    "estimated_hours": 36,
                    "difficulty": "Advanced",
                    "xp_reward": 400,
                    "resources": [
                        {"title": "Scikit-Learn Pipeline Tutorials", "url": "https://scikit-learn.org/stable/modules/compose.html", "type": "Official Docs", "platform": "Scikit-Learn"},
                        {"title": "XGBoost Production Guide", "url": "https://xgboost.readthedocs.io/", "type": "Documentation", "platform": "XGBoost"},
                        {"title": "Optuna Distributed Tuning Guide", "url": "https://optuna.readthedocs.io/", "type": "Tutorial", "platform": "Optuna"}
                    ]
                },
                {
                    "month": 3,
                    "title": "Deep Learning & PyTorch Core",
                    "skills": ["Deep Learning", "PyTorch", "CNNs", "Transformers"],
                    "learning_objectives": [
                        "Build custom PyTorch `nn.Module` architectures and Dataset loaders",
                        "Train ResNet, Vision Transformer (ViT), and RoBERTa architectures",
                        "Implement mixed-precision training (FP16/BF16) and gradient accumulation"
                    ],
                    "recommended_projects": ["Multimodal Visual Question Answering Model", "Low-Latency Acoustic Keyword Spotting Model"],
                    "estimated_hours": 42,
                    "difficulty": "Advanced",
                    "xp_reward": 450,
                    "resources": [
                        {"title": "Neural Networks: Zero to Hero (Andrej Karpathy)", "url": "https://karpathy.ai/zero-to-hero.html", "type": "Masterclass Video Series", "platform": "YouTube / Karpathy"},
                        {"title": "PyTorch Official Deep Learning Tutorials", "url": "https://pytorch.org/tutorials/", "type": "Code Tutorials", "platform": "PyTorch"},
                        {"title": "Timm: PyTorch Image Models", "url": "https://timm.fast.ai/", "type": "Vision Library", "platform": "Ross Wightman"}
                    ]
                },
                {
                    "month": 4,
                    "title": "ML Serving & Low-Latency APIs",
                    "skills": ["FastAPI", "Docker", "ONNX Runtime", "Triton Server"],
                    "learning_objectives": [
                        "Convert PyTorch/XGBoost models to ONNX and TensorRT for 5x inference speedup",
                        "Build asynchronous, batch-aware FastAPI inference endpoints",
                        "Containerize model services with multi-stage Docker builds"
                    ],
                    "recommended_projects": ["Sub-15ms Real-Time Inference Microservice on Docker", "Asynchronous Video Frame ML Processing Pipeline"],
                    "estimated_hours": 38,
                    "difficulty": "Advanced",
                    "xp_reward": 500,
                    "resources": [
                        {"title": "ONNX Runtime Tutorials", "url": "https://onnxruntime.ai/docs/tutorials/", "type": "Official Guide", "platform": "Microsoft ONNX"},
                        {"title": "Docker for Machine Learning", "url": "https://docs.docker.com/get-started/", "type": "Official Tutorial", "platform": "Docker"},
                        {"title": "Triton Inference Server Getting Started", "url": "https://github.com/triton-inference-server/server", "type": "Open Source", "platform": "NVIDIA GitHub"}
                    ]
                },
                {
                    "month": 5,
                    "title": "MLOps Pipelines & Experiment Tracking",
                    "skills": ["MLflow", "DVC", "Kubernetes", "Data Drift Monitoring"],
                    "learning_objectives": [
                        "Track experiments, parameters, and model artifacts with MLflow",
                        "Version large datasets and model weights using DVC and S3",
                        "Detect covariate shift and concept drift in production using Evidently AI"
                    ],
                    "recommended_projects": ["End-to-End Automated CI/CD Model Retraining Pipeline", "Live ML Drift Detection & Alerting Service"],
                    "estimated_hours": 40,
                    "difficulty": "Advanced",
                    "xp_reward": 550,
                    "resources": [
                        {"title": "MLflow Quickstart Guide", "url": "https://mlflow.org/docs/latest/index.html", "type": "Documentation", "platform": "MLflow"},
                        {"title": "DVC (Data Version Control) Tutorials", "url": "https://dvc.org/doc/start", "type": "Tutorials", "platform": "Iterative DVC"},
                        {"title": "Evidently AI: ML Monitoring Guide", "url": "https://docs.evidentlyai.com/", "type": "Monitoring Framework", "platform": "Evidently AI"}
                    ]
                },
                {
                    "month": 6,
                    "title": "Distributed Training & ML System Design",
                    "skills": ["Ray", "Distributed PyTorch", "System Design", "Interviews"],
                    "learning_objectives": [
                        "Scale model training across multiple GPUs using PyTorch DDP and Ray",
                        "Design scalable production ML architectures (feature stores, caching, vector search)",
                        "Complete ML engineering whiteboard system design challenges"
                    ],
                    "recommended_projects": ["Distributed Recommendation Engine with Redis & Vector Search", "Production ML Systems Design Portfolio"],
                    "estimated_hours": 32,
                    "difficulty": "Advanced",
                    "xp_reward": 650,
                    "resources": [
                        {"title": "Ray Core & Ray Train Documentation", "url": "https://docs.ray.io/en/latest/train/train.html", "type": "Documentation", "platform": "Anyscale Ray"},
                        {"title": "Designing Machine Learning Systems by Chip Huyen", "url": "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", "type": "Industry Standard Book", "platform": "O'Reilly"},
                        {"title": "ML Engineering Interview Guide", "url": "https://github.com/chiphuyen/machine-learning-systems-design", "type": "System Design", "platform": "GitHub"}
                    ]
                }
            ]
        else:
            # Generic 6-Month Roadmap with curated resources for other roles
            role_info = CAREERS_DATA[target_role]
            req_skills_list = list(role_info["required_skills"].keys())
            stages_data = [
                {
                    "month": 1,
                    "title": f"{req_skills_list[0]} & Core Foundations",
                    "skills": req_skills_list[:2],
                    "learning_objectives": [
                        f"Master foundational concepts and modern syntax in {req_skills_list[0]}",
                        "Set up professional development workflows, version control, and testing",
                        "Build first interactive proof-of-concept project"
                    ],
                    "recommended_projects": [f"{target_role} Starter Application", "Data Processing Utilities"],
                    "estimated_hours": 28,
                    "difficulty": "Intermediate",
                    "xp_reward": 300,
                    "resources": [
                        {"title": f"Official {req_skills_list[0]} Documentation", "url": "https://docs.python.org/3/", "type": "Official Docs", "platform": "Official"},
                        {"title": "FreeCodeCamp Technical Roadmaps", "url": "https://www.freecodecamp.org/", "type": "Interactive Tutorials", "platform": "freeCodeCamp"},
                        {"title": "GitHub Awesome Developer Resources", "url": "https://github.com/sindresorhus/awesome", "type": "Curated List", "platform": "GitHub"}
                    ]
                },
                {
                    "month": 2,
                    "title": f"Applied {req_skills_list[1] if len(req_skills_list) > 1 else 'Skills'} & Data Processing",
                    "skills": req_skills_list[1:3] if len(req_skills_list) > 2 else req_skills_list[:2],
                    "learning_objectives": [
                        "Deepen knowledge in architectural patterns and database interactions",
                        "Implement clean, maintainable modular codebases with unit tests",
                        "Optimize execution speed and data transformations"
                    ],
                    "recommended_projects": [f"Scalable {target_role} Pipeline Module", "Automated Data Validation Suite"],
                    "estimated_hours": 32,
                    "difficulty": "Intermediate",
                    "xp_reward": 350,
                    "resources": [
                        {"title": "Real Python In-Depth Guides", "url": "https://realpython.com/", "type": "Tutorials", "platform": "Real Python"},
                        {"title": "PostgreSQL & Database Design Course", "url": "https://www.postgresqltutorial.com/", "type": "Database Guide", "platform": "PostgreSQL"},
                        {"title": "Codecademy Practice Labs", "url": "https://www.codecademy.com/", "type": "Hands-on Practice", "platform": "Codecademy"}
                    ]
                },
                {
                    "month": 3,
                    "title": "Systems Integration & Production Workflows",
                    "skills": req_skills_list[2:5] if len(req_skills_list) > 4 else req_skills_list,
                    "learning_objectives": [
                        "Integrate multiple external APIs, services, and databases",
                        "Handle concurrency, error handling, and robust logging",
                        "Implement production CI/CD automation pipelines"
                    ],
                    "recommended_projects": [f"Production-Grade {target_role} Service", "Cloud Infrastructure Deployment"],
                    "estimated_hours": 36,
                    "difficulty": "Advanced",
                    "xp_reward": 400,
                    "resources": [
                        {"title": "Docker & Containerization Crash Course", "url": "https://docs.docker.com/get-started/", "type": "Official Tutorial", "platform": "Docker"},
                        {"title": "GitHub Actions CI/CD Documentation", "url": "https://docs.github.com/en/actions", "type": "CI/CD Guide", "platform": "GitHub"},
                        {"title": "System Design Primer", "url": "https://github.com/donnemartin/system-design-primer", "type": "Architecture Guide", "platform": "GitHub"}
                    ]
                },
                {
                    "month": 4,
                    "title": "Advanced Domain Optimization & Scale",
                    "skills": req_skills_list[3:6] if len(req_skills_list) > 5 else req_skills_list,
                    "learning_objectives": [
                        "Tune performance bottlenecks, caching, and latency",
                        "Design for high availability, fault tolerance, and security",
                        "Implement comprehensive monitoring and alert metrics"
                    ],
                    "recommended_projects": [f"High-Throughput {target_role} Architecture Showcase", "Performance Benchmarking Dashboard"],
                    "estimated_hours": 35,
                    "difficulty": "Advanced",
                    "xp_reward": 450,
                    "resources": [
                        {"title": "High Performance Browser & Server Systems", "url": "https://hpbn.co/", "type": "Free Book (Ilya Grigorik)", "platform": "O'Reilly"},
                        {"title": "Redis In-Memory Caching Architecture", "url": "https://redis.io/docs/", "type": "Official Docs", "platform": "Redis"},
                        {"title": "Prometheus & Grafana Monitoring", "url": "https://prometheus.io/docs/introduction/overview/", "type": "Monitoring Guide", "platform": "Prometheus"}
                    ]
                },
                {
                    "month": 5,
                    "title": "Complex Capstone Project",
                    "skills": role_info["core_technologies"][:3],
                    "learning_objectives": [
                        "Architect a complete end-to-end industry capstone solution",
                        "Incorporate industry-standard design patterns and documentation",
                        "Publish open-source code with live demonstrations"
                    ],
                    "recommended_projects": [f"Enterprise {target_role} Platform Capstone", "Interactive Live Demo Web Application"],
                    "estimated_hours": 40,
                    "difficulty": "Advanced",
                    "xp_reward": 500,
                    "resources": [
                        {"title": "Full Stack Open (University of Helsinki)", "url": "https://fullstackopen.com/en/", "type": "Comprehensive Course", "platform": "Univ. of Helsinki"},
                        {"title": "Cloud Architecture Center", "url": "https://cloud.google.com/architecture", "type": "Reference Architectures", "platform": "Google Cloud"},
                        {"title": "Open Source Portfolio Inspiration", "url": "https://github.com/trending", "type": "Trending Code", "platform": "GitHub"}
                    ]
                },
                {
                    "month": 6,
                    "title": "Technical Interviews & Portfolio Polish",
                    "skills": ["System Design", "Coding Challenges", "Resume Polish", "Interview Prep"],
                    "learning_objectives": [
                        "Prepare for domain-specific technical coding and architecture rounds",
                        "Polish resume, LinkedIn, and GitHub portfolio showcasing verified metrics",
                        "Conduct mock technical interviews and behavioral practice"
                    ],
                    "recommended_projects": ["Comprehensive Portfolio Web Portal", "Interview Knowledge Base"],
                    "estimated_hours": 26,
                    "difficulty": "Advanced",
                    "xp_reward": 600,
                    "resources": [
                        {"title": "Tech Interview Handbook", "url": "https://www.techinterviewhandbook.org/", "type": "Curated Guide", "platform": "Yangshun Tay"},
                        {"title": "LeetCode Algorithmic Practice", "url": "https://leetcode.com/explore/", "type": "Coding Challenges", "platform": "LeetCode"},
                        {"title": "Awesome Interview Questions", "url": "https://github.com/DopplerHQ/awesome-interview-questions", "type": "Question Bank", "platform": "GitHub"}
                    ]
                }
            ]

        roadmap_stages: List[RoadmapStage] = []
        for stage in stages_data:
            stage_id = f"m_{stage['month']}_{target_role.lower().replace(' ', '_')}"
            is_completed = stage_id in completed_set or (stage["month"] == 1 and user_skills_dict.get(stage["skills"][0].lower(), 0) > 85)
            
            # Map resources to ResourceItem models
            resources_list = [
                ResourceItem(
                    title=r["title"],
                    url=r["url"],
                    type=r.get("type", "Interactive Course"),
                    platform=r.get("platform", "Free Online"),
                    is_free=True
                ) for r in stage.get("resources", [])
            ]

            roadmap_stages.append(RoadmapStage(
                id=stage_id,
                month=stage["month"],
                title=stage["title"],
                skills=stage["skills"],
                learning_objectives=stage["learning_objectives"],
                recommended_projects=stage["recommended_projects"],
                estimated_hours=stage["estimated_hours"],
                difficulty=stage["difficulty"],
                xp_reward=stage.get("xp_reward", 250),
                resources=resources_list,
                is_completed=is_completed
            ))

        return roadmap_stages
