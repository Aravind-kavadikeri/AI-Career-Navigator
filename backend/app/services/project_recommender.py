"""
Project Recommendation Engine
Generates portfolio project recommendations tailored to bridge specific skill gaps,
complete with portfolio value ratings, difficulty levels, and implementation guides.
"""

from typing import List, Dict, Any
from app.schemas.schemas import ProjectRecommendation, ProfileCreate, SkillGapResponse


class ProjectRecommender:
    PROJECT_CATALOG = [
        {
            "id": "proj_churn_pred",
            "title": "Customer Churn Prediction & Explainable AI Dashboard",
            "description": "Build an end-to-end machine learning system to predict customer churn, calculate risk probabilities, and compute local SHAP feature importances with a FastAPI + React dashboard.",
            "skills_gained": ["Python", "Pandas", "Scikit-Learn", "Feature Engineering", "Classification", "SHAP", "FastAPI"],
            "difficulty": "Intermediate",
            "portfolio_value": 5,
            "target_gap_skill": "Machine Learning",
            "estimated_days": 10,
            "implementation_steps": [
                "Perform exploratory data analysis and correlation heatmaps on customer usage data.",
                "Engineer behavioral features (recency, frequency, monetary trend indicators).",
                "Train and benchmark XGBoost, LightGBM, and Random Forest classifiers.",
                "Calculate SHAP tree values to explain why individual customers are at churn risk.",
                "Deploy an interactive dashboard allowing business stakeholders to simulate customer interventions."
            ]
        },
        {
            "id": "proj_sql_cohort",
            "title": "SaaS Retention & Churn Cohort Analytics Engine",
            "description": "Construct advanced SQL analytics queries to calculate monthly retention cohorts, lifetime value (LTV), expansion revenue, and customer acquisition payback periods.",
            "skills_gained": ["SQL", "Data Analysis", "Window Functions", "Data Modeling", "Tableau / Power BI"],
            "difficulty": "Intermediate",
            "portfolio_value": 4,
            "target_gap_skill": "SQL",
            "estimated_days": 7,
            "implementation_steps": [
                "Design a normalized subscription transaction schema in PostgreSQL.",
                "Write multi-layered CTEs and Window functions (LAG, LEAD, NTILE) for cohort calculations.",
                "Compute monthly Net Retention Rate (NRR) and logo churn percentages.",
                "Build an executive dashboard in Power BI / Tableau visualizing cohort heatmaps.",
                "Document executive takeaways and data-backed revenue growth recommendations."
            ]
        },
        {
            "id": "proj_rag_assistant",
            "title": "Enterprise Multi-Document RAG Knowledge Assistant",
            "description": "Develop a Production Retrieval Augmented Generation system that parses multi-format PDFs, creates semantic vector embeddings, and answers queries with verified citations.",
            "skills_gained": ["NLP", "Deep Learning", "Vector Databases", "LangChain", "FastAPI", "Prompt Engineering"],
            "difficulty": "Advanced",
            "portfolio_value": 5,
            "target_gap_skill": "Deep Learning",
            "estimated_days": 14,
            "implementation_steps": [
                "Implement chunking strategies (semantic + recursive character splitting) on complex technical documents.",
                "Generate vector embeddings using Hugging Face / OpenAI models and store in ChromaDB.",
                "Implement hybrid sparse-dense retrieval and cross-encoder re-ranking.",
                "Create a streaming chat API in FastAPI with citations and source document highlighting.",
                "Add automated evaluation for hallucination rate using RAGAS."
            ]
        },
        {
            "id": "proj_ab_testing",
            "title": "A/B Experimentation & Statistical Decision Engine",
            "description": "Implement a rigorous statistical hypothesis testing framework that analyzes conversion rate experiments, controls false discovery rates, and estimates required sample sizes.",
            "skills_gained": ["Statistics", "Mathematics", "Python", "Hypothesis Testing", "A/B Testing", "Data Visualization"],
            "difficulty": "Intermediate",
            "portfolio_value": 4,
            "target_gap_skill": "Statistics",
            "estimated_days": 8,
            "implementation_steps": [
                "Calculate minimum detectable effect (MDE) and sample sizes using statistical power calculations.",
                "Simulate A/B experiment data with realistic variance, skew, and outliers.",
                "Perform two-sample T-tests, Mann-Whitney U tests, and Chi-square contingency analysis.",
                "Implement sequential testing to allow early stopping without inflating Type I error rates.",
                "Visualize confidence intervals, p-values, and practical business significance in interactive charts."
            ]
        },
        {
            "id": "proj_realtime_stream",
            "title": "Real-Time Transaction Fraud Detection & Streaming Pipeline",
            "description": "Construct an end-to-end event-driven pipeline that streams transaction logs via Kafka, runs low-latency anomaly detection, and triggers real-time alerts.",
            "skills_gained": ["Python", "Machine Learning", "FastAPI", "Docker", "Data Analysis", "SQL"],
            "difficulty": "Advanced",
            "portfolio_value": 5,
            "target_gap_skill": "Machine Learning",
            "estimated_days": 12,
            "implementation_steps": [
                "Build a mock transaction event generator producing 500+ TPS.",
                "Train an Isolation Forest and Autoencoder neural network on synthetic imbalanced fraud data.",
                "Serve predictions via sub-20ms FastAPI endpoint with Redis feature caching.",
                "Package into multi-container Docker Compose setup with Prometheus monitoring.",
                "Benchmark latency percentiles (p50, p95, p99) under simulated load."
            ]
        },
        {
            "id": "proj_exec_powerbi",
            "title": "Executive E-Commerce Operations & Supply Chain BI Suite",
            "description": "Build an enterprise-grade interactive Power BI / Tableau reporting suite with star-schema data modeling, dynamic DAX KPIs, and drill-down analysis.",
            "skills_gained": ["Power BI", "Excel", "Tableau", "Data Visualization", "Data Analysis"],
            "difficulty": "Beginner to Intermediate",
            "portfolio_value": 4,
            "target_gap_skill": "Data Visualization",
            "estimated_days": 6,
            "implementation_steps": [
                "Ingest and clean multi-table sales, inventory, and logistics datasets.",
                "Design a star schema with fact and dimension tables.",
                "Author custom DAX measures for Year-over-Year (YoY) growth, running totals, and margin variance.",
                "Create interactive drill-through pages for product categories and regional performance.",
                "Publish a public portfolio report demonstrating executive storytelling."
            ]
        },
        {
            "id": "proj_vision_classifier",
            "title": "Automated Medical Scan Defect Classifier with PyTorch & Grad-CAM",
            "description": "Fine-tune a convolutional neural network (ResNet/EfficientNet) for medical image classification and generate Grad-CAM heatmaps showing which pixels triggered the diagnosis.",
            "skills_gained": ["Computer Vision", "Deep Learning", "PyTorch", "Data Visualization", "Explainable AI"],
            "difficulty": "Advanced",
            "portfolio_value": 5,
            "target_gap_skill": "Computer Vision",
            "estimated_days": 12,
            "implementation_steps": [
                "Preprocess image datasets with data augmentation (rotations, color jitters, mixup).",
                "Fine-tune a pretrained PyTorch backbone using transfer learning and learning rate schedulers.",
                "Compute precision, recall, specificity, and confusion matrix.",
                "Implement Grad-CAM to visualize model attention maps overlaid on scans.",
                "Export model to TorchScript/ONNX and build an interactive web upload demo."
            ]
        }
    ]

    @staticmethod
    def recommend_projects(profile: ProfileCreate, skill_gap_response: SkillGapResponse) -> List[ProjectRecommendation]:
        """
        Match student's specific high-priority skill gaps to portfolio projects.
        """
        # Identify top gap skills
        gap_skills = [item.skill for item in skill_gap_response.skill_gaps if item.priority in ("HIGH", "MEDIUM")]
        gap_skills_set = set(gap_skills)

        # Score and prioritize projects based on relevance to detected gaps
        scored_projects = []
        for p in ProjectRecommender.PROJECT_CATALOG:
            relevance = 0
            if p["target_gap_skill"] in gap_skills_set:
                relevance += 10
            for skill in p["skills_gained"]:
                if skill in gap_skills_set:
                    relevance += 3
            
            scored_projects.append((relevance, p))

        # Sort by relevance descending, then portfolio_value descending
        scored_projects.sort(key=lambda x: (x[0], x[1]["portfolio_value"]), reverse=True)

        recommendations: List[ProjectRecommendation] = []
        for _, p in scored_projects[:4]:
            recommendations.append(ProjectRecommendation(
                id=p["id"],
                title=p["title"],
                description=p["description"],
                skills_gained=p["skills_gained"],
                difficulty=p["difficulty"],
                portfolio_value=p["portfolio_value"],
                target_gap_skill=p["target_gap_skill"],
                estimated_days=p["estimated_days"],
                implementation_steps=p["implementation_steps"]
            ))

        return recommendations
