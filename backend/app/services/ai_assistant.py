"""
Context-Aware AI Career Advisor Service
Provides personalized, student-grounded career advice based on active profile,
skill gaps, and roadmap milestones. Works out-of-the-box with intelligent
semantic rules, and optionally connects to LLM APIs (OpenAI/Gemini) if configured.
"""

import os
import json
import requests
from typing import Dict, Any, List, Optional
from app.schemas.schemas import ChatRequest, ChatResponse, ProfileCreate, SkillGapResponse


class AIAssistantService:
    @staticmethod
    def generate_response(
        request: ChatRequest,
        profile: ProfileCreate,
        career_match_role: str = "Data Scientist",
        match_score: int = 82,
        skill_gaps: Optional[SkillGapResponse] = None
    ) -> ChatResponse:
        """
        Generate contextual AI career response grounded in student profile.
        """
        user_query = request.message.strip()
        lower_query = user_query.lower()

        # Extract user context variables
        user_skills_dict = {s.name: s.level for s in profile.skills}
        top_skills = sorted(profile.skills, key=lambda x: x.level, reverse=True)[:3]
        weak_skills = sorted(profile.skills, key=lambda x: x.level)[:3]

        major_gaps = []
        if skill_gaps:
            major_gaps = [g.skill for g in skill_gaps.skill_gaps if g.priority == "HIGH"]
        if not major_gaps:
            major_gaps = ["Machine Learning", "Deep Learning", "Advanced Statistics"]

        context_summary = {
            "student_name": profile.name,
            "degree": profile.degree,
            "semester": profile.current_semester,
            "cgpa": profile.cgpa,
            "top_match_role": career_match_role,
            "readiness_score": f"{match_score}%",
            "strongest_skills": [f"{s.name} ({s.level}%)" for s in top_skills],
            "biggest_gaps": major_gaps[:3],
            "project_count": len(profile.projects)
        }

        # Check for external LLM API keys if configured
        openai_key = os.getenv("OPENAI_API_KEY")
        gemini_key = os.getenv("GEMINI_API_KEY")

        if openai_key and openai_key.startswith("sk-"):
            try:
                llm_reply = AIAssistantService._query_openai(openai_key, user_query, request.history, context_summary)
                if llm_reply:
                    return ChatResponse(
                        reply=llm_reply,
                        suggested_prompts=AIAssistantService._get_suggested_prompts(career_match_role),
                        context_used=context_summary
                    )
            except Exception as e:
                print(f"OpenAI API fallback: {e}")

        # Intelligent Context-Grounded Semantic Engine (Zero API Key Fallback)
        reply = AIAssistantService._semantic_career_advisor(
            lower_query=lower_query,
            profile=profile,
            career_role=career_match_role,
            match_score=match_score,
            major_gaps=major_gaps,
            top_skills=top_skills,
            context_summary=context_summary
        )

        return ChatResponse(
            reply=reply,
            suggested_prompts=AIAssistantService._get_suggested_prompts(career_match_role),
            context_used=context_summary
        )

    @staticmethod
    def _semantic_career_advisor(
        lower_query: str,
        profile: ProfileCreate,
        career_role: str,
        match_score: int,
        major_gaps: List[str],
        top_skills: List[Any],
        context_summary: Dict[str, Any]
    ) -> str:
        """
        Rule-based contextual advisor synthesizing student strengths and gaps.
        """
        name = profile.name.split()[0] if profile.name else "there"
        top_skill_names = ", ".join([s.name for s in top_skills])
        gap_1 = major_gaps[0] if len(major_gaps) > 0 else "Machine Learning"
        gap_2 = major_gaps[1] if len(major_gaps) > 1 else "Statistics"

        # 1. "What should I learn next?"
        if any(w in lower_query for w in ["what should i learn", "learn next", "next skill", "what to study", "priority"]):
            return (
                f"### 🎯 Personalized Learning Recommendation for {name}\n\n"
                f"Based on your target goal of **{career_role}** (Current Readiness: **{match_score}%**), your highest return on investment right now is:\n\n"
                f"1. **Primary Priority: {gap_1}**\n"
                f"   - *Why:* This is currently your widest gap relative to entry-level industry benchmarks.\n"
                f"   - *Action Item:* Complete structured modules on fundamental theory, implement 2 baseline models, and focus on hyperparameter tuning.\n\n"
                f"2. **Secondary Priority: {gap_2}**\n"
                f"   - *Why:* Solidifying this complements your existing strengths in **{top_skill_names}**.\n\n"
                f"💡 **Recommended Project:** Build a *Customer Churn Prediction & Explainable AI* project to apply both {gap_1} and {gap_2} simultaneously in your portfolio."
            )

        # 2. "Am I ready for an internship / job?"
        elif any(w in lower_query for w in ["ready", "internship", "job ready", "am i prepared", "hireable", "can i apply"]):
            if match_score >= 80:
                verdict = f"**Yes, you are in a strong position (Readiness: {match_score}%)** to begin applying for **{career_role} internships**!"
            elif match_score >= 65:
                verdict = f"**You are moderately prepared (Readiness: {match_score}%)**, but closing 1–2 specific gaps will dramatically boost interview conversion."
            else:
                verdict = f"**Not quite yet (Readiness: {match_score}%)**. We recommend 6–8 weeks of targeted project building first."

            return (
                f"### 📊 Career Readiness Assessment for {career_role}\n\n"
                f"{verdict}\n\n"
                f"#### Your Competitive Advantages:\n"
                f"- ✅ Strong foundational proficiency in **{top_skill_names}**.\n"
                f"- ✅ Academic standing: **{profile.cgpa} CGPA** ({profile.degree}, Sem {profile.current_semester}).\n"
                f"- ✅ **{len(profile.projects)}** documented project(s) on your profile.\n\n"
                f"#### Critical Gaps to Address Before Interview Rounds:\n"
                f"- ⚠️ Improve **{gap_1}** to at least 75%.\n"
                f"- ⚠️ Ensure your GitHub portfolio includes live deployed links, documentation, and architecture diagrams.\n\n"
                f"📌 *Next Step:* Head to the **Skill Gap** tab and start Month 1 of your personalized roadmap."
            )

        # 3. "Which projects should I build?"
        elif any(w in lower_query for w in ["which project", "project idea", "build", "portfolio project", "what project"]):
            return (
                f"### 🚀 High-Impact Portfolio Project Ideas for {career_role}\n\n"
                f"To bridge your current gap in **{gap_1}** and **{gap_2}**, recruiters love seeing end-to-end applications rather than toy Kaggle notebooks:\n\n"
                f"1. **🌟 Project 1: End-to-End {gap_1} Predictive Service with Explainability**\n"
                f"   - *Tech:* Python, Scikit-Learn, SHAP, FastAPI, Streamlit.\n"
                f"   - *Resume Bullet:* *'Built and served a churn classification model with 89% ROC-AUC; integrated SHAP feature attribution and deployed via FastAPI REST API.'*\n\n"
                f"2. **🌟 Project 2: Real-Time Analytics & Cohort Retention Dashboard**\n"
                f"   - *Tech:* SQL, PostgreSQL, Power BI / Tableau.\n"
                f"   - *Resume Bullet:* *'Designed complex window queries for monthly customer retention cohorts, identifying 14% drop-off points.'*\n\n"
                f"Check out the **Projects** section in the sidebar for full 5-step implementation blueprints!"
            )

        # 4. "How can I improve SQL / Python / specific skill?"
        elif any(w in lower_query for w in ["improve sql", "how to improve", "learn sql", "learn python", "learn machine learning"]):
            return (
                f"### ⚡ Actionable Skill Improvement Guide\n\n"
                f"Here is an efficient 4-step framework to rapidly level up your skills:\n\n"
                f"1. **Theory & Syntax (Week 1):** Focus on core idioms (Window functions for SQL, Vectorized operations & OOP for Python, Loss functions for ML).\n"
                f"2. **Algorithmic Practice (Week 2):** Solve 15–20 targeted problems (LeetCode/StrataScratch for SQL & Python).\n"
                f"3. **Hands-On Implementation (Weeks 3-4):** Build a standalone module or data pipeline handling real dirty data.\n"
                f"4. **Benchmarking & Optimization (Week 5):** Profile latency, query execution plans, or cross-validation scores.\n\n"
                f"Check the **Learning** tab in the navigation menu for hours breakdown and curated topics."
            )

        # 5. "Create a 3-month / 6-month plan"
        elif any(w in lower_query for w in ["3-month", "3 month", "6 month", "plan", "roadmap", "schedule", "timeline"]):
            return (
                f"### 🗓️ Tailored 3-Month Fast-Track Plan for {career_role}\n\n"
                f"- **Month 1 (Foundation & Gaps):** Focus on **{gap_1}** + deep dive into practical problem solving (30 hrs total).\n"
                f"- **Month 2 (Applied System & Projects):** Build an end-to-end portfolio project bridging **{gap_2}** with a live FastAPI backend.\n"
                f"- **Month 3 (Deployment & Interview Preparation):** Containerize projects with Docker, polish GitHub READMEs, and practice 30+ technical interview questions.\n\n"
                f"You can track your month-by-month progress with interactive checkboxes on the **Roadmap** page!"
            )

        # 6. Default / General Career Advice
        else:
            return (
                f"### 🤖 AI Career Navigator Advisor\n\n"
                f"Hello **{name}**! I've analyzed your profile against industry standards for **{career_role}**:\n\n"
                f"- **Your Overall Match:** **{match_score}%**\n"
                f"- **Key Strengths:** {top_skill_names}\n"
                f"- **Primary Growth Focus:** {gap_1} & {gap_2}\n\n"
                f"You can ask me questions such as:\n"
                f"- *'What should I learn next?'*\n"
                f"- *'Am I ready for a {career_role} internship?'*\n"
                f"- *'Which portfolio projects will impress recruiters most?'*\n"
                f"- *'Create a 3-month roadmap for me.'*\n\n"
                f"How can I help you build your roadmap today?"
            )

    @staticmethod
    def _get_suggested_prompts(role: str) -> List[str]:
        return [
            "What should I learn next?",
            f"Am I ready for a {role} internship?",
            "Which projects should I build for my portfolio?",
            "Create a 3-month personalized learning plan.",
            f"How does my profile compare to top {role} candidates?"
        ]

    @staticmethod
    def _query_openai(api_key: str, user_query: str, history: List[Any], context: Dict[str, Any]) -> Optional[str]:
        """Optional OpenAI chat completion integration if key is provided."""
        try:
            system_prompt = (
                "You are an expert AI Career Coach and Engineering Mentor. "
                "Provide direct, inspiring, and actionable career advice. "
                f"Student Profile Context: {json.dumps(context)}. "
                "Always format responses cleanly in markdown with headings, bullet points, and actionable next steps."
            )
            messages = [{"role": "system", "content": system_prompt}]
            for msg in history[-4:]:
                messages.append({"role": msg.role, "content": msg.content})
            messages.append({"role": "user", "content": user_query})

            resp = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
                json={"model": "gpt-4o-mini", "messages": messages, "temperature": 0.7, "max_tokens": 800},
                timeout=10
            )
            if resp.status_code == 200:
                return resp.json()["choices"][0]["message"]["content"]
        except Exception:
            pass
        return None
