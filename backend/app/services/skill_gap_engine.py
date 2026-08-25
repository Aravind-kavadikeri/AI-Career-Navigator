"""
Skill Gap Analysis & Priority Engine
Compares current student proficiencies against target career role benchmarks,
computes gap magnitudes, classifies them into (Strong, Improve, Major Gap),
and assigns prioritized learning orders with domain-specific rationales.
"""

from typing import List, Dict, Any
from app.data.career_taxonomy import CAREERS_DATA
from app.schemas.schemas import SkillGapItem, SkillGapResponse, ProfileCreate


class SkillGapEngine:
    @staticmethod
    def analyze_skill_gaps(profile: ProfileCreate, target_role: str = "Data Scientist") -> SkillGapResponse:
        """
        Analyze skill gaps for the specified target career role.
        """
        # Default to Data Scientist if role not found
        if target_role not in CAREERS_DATA:
            target_role = "Data Scientist"

        role_data = CAREERS_DATA[target_role]
        required_skills = role_data["required_skills"]
        user_skills_dict = {s.name.lower(): s.level for s in profile.skills}

        items: List[SkillGapItem] = []
        strong_count = 0
        improve_count = 0
        major_gap_count = 0

        # Rationale templates
        skill_reasons: Dict[str, str] = {
            "Machine Learning": "Core requirement for predictive modeling, feature engineering, and algorithm selection.",
            "Deep Learning": "Essential for neural network architectures, computer vision, NLP, and complex non-linear patterns.",
            "Statistics": "Crucial foundation for hypothesis testing, A/B experimentation, probability models, and inference.",
            "Python": "Primary programming language for data manipulation, scientific computing, and ML pipeline development.",
            "SQL": "Critical for relational database queries, aggregating large datasets, and feature extraction.",
            "Data Analysis": "Foundational for discovering data patterns, trend analysis, and business insights.",
            "Data Visualization": "Key for executive reporting, communicating complex findings, and interactive dashboards.",
            "Mathematics": "Fundamental for gradient descent optimization, linear algebra transformations, and loss functions.",
            "NLP": "Required for language modeling, tokenization, text embeddings, and transformer applications.",
            "Computer Vision": "Required for image classification, object detection, and spatial visual features.",
            "Excel": "Standard corporate data validation, financial modeling, and rapid tabular inspection.",
            "Power BI": "Industry standard for enterprise business intelligence dashboards and DAX metrics.",
            "Tableau": "Widely used for interactive visual storytelling and multi-dimensional analytics.",
            "Java": "Important for enterprise backend services, scalable distributed systems, and Android.",
            "JavaScript": "Standard for full-stack web applications, interactive frontends, and API integrations.",
            "C++": "Critical for low-latency systems, high-performance computing, and edge AI deployment.",
            "C": "Essential for systems programming, memory management, and embedded hardware."
        }

        for skill_name, req_level in required_skills.items():
            user_level = user_skills_dict.get(skill_name.lower(), 0)
            gap = max(0, req_level - user_level)

            if user_level >= req_level - 5:
                status = "Strong"
                priority = "LOW"
                priority_order = 3
                strong_count += 1
                reason = f"You meet or exceed the industry benchmark ({user_level}% vs {req_level}% req). Maintain proficiency."
            elif gap <= 20:
                status = "Improve"
                priority = "MEDIUM"
                priority_order = 2
                improve_count += 1
                reason = skill_reasons.get(skill_name, f"Solid foundation in {skill_name}, but needs refinement for production readiness.")
            else:
                status = "Major Gap"
                priority = "HIGH"
                priority_order = 1
                major_gap_count += 1
                reason = skill_reasons.get(skill_name, f"Significant gap identified. High priority to study before applying for {target_role}.")

            items.append(SkillGapItem(
                skill=skill_name,
                user_level=user_level,
                required_level=req_level,
                gap=gap,
                status=status,
                priority=priority,
                priority_order=priority_order,
                reason=reason
            ))

        # Sort items: Major Gaps (HIGH) first, then Improve (MEDIUM), then Strong (LOW)
        # Within same priority, sort by gap descending
        items.sort(key=lambda x: (x.priority_order, -x.gap))

        top_priority_item = next((item.skill for item in items if item.priority == "HIGH"), items[0].skill if items else "Python")

        return SkillGapResponse(
            role=target_role,
            role_match_score=max(20, min(98, int(100 - (sum(i.gap for i in items) / max(1, len(items)))))),
            strong_skills_count=strong_count,
            improve_skills_count=improve_count,
            major_gaps_count=major_gap_count,
            skill_gaps=items,
            top_learning_priority=f"Prioritize mastering {top_priority_item} to close the largest career gap."
        )
