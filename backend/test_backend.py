"""
Backend verification script
Tests database initialization, demo profile retrieval, career scoring, skill gaps,
roadmaps, project recommendations, and AI chat advisor.
"""

import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

from app.database.models import init_db, SessionLocal, ProfileDB
from app.api.endpoints import get_demo_profile_data, save_profile_to_db
from app.services.scoring_engine import ScoringEngine
from app.services.skill_gap_engine import SkillGapEngine
from app.services.roadmap_engine import RoadmapEngine
from app.services.project_recommender import ProjectRecommender
from app.services.ai_assistant import AIAssistantService
from app.schemas.schemas import ChatRequest

def run_tests():
    print("[TEST] Initializing Database...")
    init_db()
    db = SessionLocal()

    print("[TEST] Testing Demo Profile Seeding...")
    demo = get_demo_profile_data()
    profile_db = save_profile_to_db(demo, db, profile_id="test-alex-student")
    assert profile_db.id == "test-alex-student"
    print(f"[OK] Demo profile saved: {profile_db.name} ({profile_db.degree}, CGPA: {profile_db.cgpa})")

    print("\n[TEST] Testing Career Scoring Engine...")
    matches = ScoringEngine.calculate_career_matches(demo)
    assert len(matches) > 0
    top_match = matches[0]
    print(f"[OK] Top Match: {top_match.role} ({top_match.match_percentage}%)")
    print(f"   XAI Breakdown: Tech={top_match.xai_breakdown.technical_skills}, Projects={top_match.xai_breakdown.projects}, Interests={top_match.xai_breakdown.interests}, Academics={top_match.xai_breakdown.academic_performance}, Certs={top_match.xai_breakdown.certifications}")
    print(f"   Strengths: {top_match.why_it_matches}")
    print(f"   Growth Areas: {top_match.needs_improvement}")

    print("\n[TEST] Testing Skill Gap Engine...")
    gaps = SkillGapEngine.analyze_skill_gaps(demo, target_role="Data Scientist")
    print(f"[OK] Skill Gaps for Data Scientist: {gaps.major_gaps_count} Major Gaps, {gaps.improve_skills_count} To Improve, {gaps.strong_skills_count} Strong")
    for g in gaps.skill_gaps[:3]:
        print(f"   - {g.skill}: User={g.user_level}%, Req={g.required_level}% [{g.status}] Priority: {g.priority}")

    print("\n[TEST] Testing Roadmap Generator Engine...")
    roadmap = RoadmapEngine.generate_roadmap(demo, target_role="Data Scientist")
    print(f"[OK] Generated {len(roadmap)}-Month Roadmap for Data Scientist:")
    for stage in roadmap[:2]:
        print(f"   Month {stage.month}: {stage.title} ({stage.estimated_hours} hrs) - {stage.difficulty}")

    print("\n[TEST] Testing Project Recommender...")
    projects = ProjectRecommender.recommend_projects(demo, gaps)
    print(f"[OK] Recommended {len(projects)} Gap-Targeted Projects:")
    for p in projects[:2]:
        print(f"   - {p.title} (Portfolio Value: {p.portfolio_value}/5) Target Gap: {p.target_gap_skill}")

    print("\n[TEST] Testing AI Career Assistant...")
    chat_req = ChatRequest(
        profile_id="test-alex-student",
        message="What should I learn next to become a Data Scientist?",
        active_role="Data Scientist"
    )
    chat_resp = AIAssistantService.generate_response(
        request=chat_req,
        profile=demo,
        career_match_role="Data Scientist",
        match_score=top_match.match_percentage,
        skill_gaps=gaps
    )
    print(f"[OK] AI Assistant Response received ({len(chat_resp.reply)} chars):")
    print(chat_resp.reply[:200].encode('ascii', 'replace').decode('ascii') + "...\n")
    print(f"   Suggested prompts: {chat_resp.suggested_prompts}")

    db.close()
    print("\n[SUCCESS] ALL BACKEND TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    run_tests()
