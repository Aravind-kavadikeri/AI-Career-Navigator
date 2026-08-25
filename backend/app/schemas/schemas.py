"""
Pydantic Schemas for AI Career Navigator
Provides complete type safety and serialization for all API interactions.
"""

from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field


class SkillItem(BaseModel):
    name: str
    level: int = Field(..., ge=0, le=100, description="Proficiency level from 0 to 100")
    category: Optional[str] = "Technical"  # "Technical" or "AI/Data"


class ProjectItem(BaseModel):
    name: str
    description: str
    technologies: List[str] = []
    project_type: Optional[str] = "Academic / Portfolio"
    difficulty: Optional[str] = "Intermediate"  # Beginner, Intermediate, Advanced


class CertificationItem(BaseModel):
    name: str
    issuer: str
    year: str


class ProfileCreate(BaseModel):
    name: str = "Alex Student"
    college: str = "Institute of Technology"
    degree: str = "B.Tech Data Science"
    current_semester: int = 6
    cgpa: float = 8.4
    skills: List[SkillItem] = []
    projects: List[ProjectItem] = []
    certifications: List[CertificationItem] = []
    interests: List[str] = []
    preferred_career: str = "Data Scientist"


class ProfileResponse(ProfileCreate):
    id: str
    created_at: Optional[str] = None
    career_readiness_score: int = 82


class XAIFactors(BaseModel):
    technical_skills: float = Field(..., description="Contribution score for technical & AI skills (35% max)")
    projects: float = Field(..., description="Contribution score for practical projects (25% max)")
    interests: float = Field(..., description="Contribution score for domain interests (20% max)")
    academic_performance: float = Field(..., description="Contribution score for academics/CGPA (10% max)")
    certifications: float = Field(..., description="Contribution score for verified certifications (10% max)")


class CareerMatch(BaseModel):
    role: str
    match_percentage: int
    tagline: str
    description: str
    category: str
    difficulty: str
    why_it_matches: List[str]
    needs_improvement: List[str]
    recommended_next_step: str
    xai_breakdown: XAIFactors
    required_skills: Dict[str, int]


class SkillGapItem(BaseModel):
    skill: str
    user_level: int
    required_level: int
    gap: int
    status: str  # "Strong", "Improve", "Major Gap"
    priority: str  # "HIGH", "MEDIUM", "LOW"
    priority_order: int
    reason: str


class SkillGapResponse(BaseModel):
    role: str
    role_match_score: int
    strong_skills_count: int
    improve_skills_count: int
    major_gaps_count: int
    skill_gaps: List[SkillGapItem]
    top_learning_priority: str


class ResourceItem(BaseModel):
    title: str
    url: str
    type: str = "Interactive Course"  # "Interactive", "Official Docs", "Video Masterclass", "Practice"
    platform: str = "Free Online"
    is_free: bool = True


class RoadmapStage(BaseModel):
    id: str
    month: int
    title: str
    skills: List[str]
    learning_objectives: List[str]
    recommended_projects: List[str]
    estimated_hours: int
    difficulty: str
    resources: List[ResourceItem] = []
    xp_reward: int = 250
    is_completed: bool = False



class ProjectRecommendation(BaseModel):
    id: str
    title: str
    description: str
    skills_gained: List[str]
    difficulty: str  # Beginner, Intermediate, Advanced
    portfolio_value: int  # 1 to 5 stars
    target_gap_skill: str
    estimated_days: int
    implementation_steps: List[str]


class ProgressSnapshot(BaseModel):
    month: str
    overall_score: int
    skills_mastered: int
    projects_completed: int


class ProgressResponse(BaseModel):
    overall_progress: int
    skills_completed: int
    total_skills_tracked: int
    roadmap_completion: int
    completed_milestones: int
    total_milestones: int
    projects_completed: int
    skill_growth_timeline: List[ProgressSnapshot]
    current_readiness_level: str


class MilestoneToggleRequest(BaseModel):
    profile_id: str
    milestone_id: str
    completed: bool


class AnalysisReport(BaseModel):
    profile_id: str
    career_readiness_score: int
    top_career_match: str
    career_matches: List[CareerMatch]
    primary_skill_gaps: SkillGapResponse
    roadmap: List[RoadmapStage]
    project_recommendations: List[ProjectRecommendation]
    progress: ProgressResponse


class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    profile_id: Optional[str] = None
    message: str
    history: List[ChatMessage] = []
    active_role: Optional[str] = "Data Scientist"


class ChatResponse(BaseModel):
    reply: str
    suggested_prompts: List[str]
    context_used: Dict[str, Any]
