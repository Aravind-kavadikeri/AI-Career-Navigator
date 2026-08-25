"""
API Endpoints Router for AI Career Navigator
Provides REST endpoints for profile management, career analysis,
skill-gap evaluation, roadmap tracking, project recommendations, and AI chat.
"""

import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.models import (
    get_db, ProfileDB, SkillDB, ProjectDB, CertificationDB,
    InterestDB, MilestoneProgressDB, ProgressSnapshotDB
)
from app.schemas.schemas import (
    ProfileCreate, ProfileResponse, SkillItem, ProjectItem, CertificationItem,
    CareerMatch, SkillGapResponse, RoadmapStage, ProjectRecommendation,
    ProgressResponse, ProgressSnapshot, MilestoneToggleRequest,
    AnalysisReport, ChatRequest, ChatResponse
)
from app.data.career_taxonomy import CAREERS_DATA
from app.services.scoring_engine import ScoringEngine
from app.services.skill_gap_engine import SkillGapEngine
from app.services.roadmap_engine import RoadmapEngine
from app.services.project_recommender import ProjectRecommender
from app.services.ai_assistant import AIAssistantService

router = APIRouter(prefix="/api", tags=["Career Navigator"])


def get_demo_profile_data() -> ProfileCreate:
    """Standard rich sample demo profile for 'Alex Student'."""
    return ProfileCreate(
        name="Alex Student",
        college="National Institute of Technology",
        degree="B.Tech Data Science",
        current_semester=6,
        cgpa=8.4,
        preferred_career="Data Scientist",
        skills=[
            SkillItem(name="Python", level=88, category="Technical"),
            SkillItem(name="SQL", level=76, category="Technical"),
            SkillItem(name="Statistics", level=64, category="AI/Data"),
            SkillItem(name="Machine Learning", level=61, category="AI/Data"),
            SkillItem(name="Data Visualization", level=72, category="AI/Data"),
            SkillItem(name="Deep Learning", level=42, category="AI/Data"),
            SkillItem(name="Data Analysis", level=80, category="AI/Data"),
            SkillItem(name="Mathematics", level=70, category="AI/Data"),
            SkillItem(name="Excel", level=75, category="Technical"),
            SkillItem(name="Power BI", level=68, category="Technical"),
            SkillItem(name="JavaScript", level=55, category="Technical"),
            SkillItem(name="HTML", level=70, category="Technical"),
            SkillItem(name="CSS", level=65, category="Technical"),
        ],
        projects=[
            ProjectItem(
                name="Student Academic Performance Prediction",
                description="Built a supervised regression and classification model predicting semester GPA from historical engagement metrics with Scikit-Learn and Pandas.",
                technologies=["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
                project_type="Academic Capstone",
                difficulty="Intermediate"
            ),
            ProjectItem(
                name="Customer Churn Diagnostic Analyzer",
                description="Exploratory data analysis and logistic regression pipeline to identify drivers of telecom customer subscription cancellations.",
                technologies=["Python", "Pandas", "SQL", "Seaborn"],
                project_type="Portfolio Project",
                difficulty="Intermediate"
            ),
            ProjectItem(
                name="AI Resume Analyzer & Keyword Matcher",
                description="Text parsing application that extracts key technical skills from PDF resumes and matches against job description postings.",
                technologies=["Python", "NLP", "FastAPI", "React"],
                project_type="Independent Project",
                difficulty="Intermediate"
            )
        ],
        certifications=[
            CertificationItem(name="Python for Data Science & ML Bootcamp", issuer="Udemy / Jose Portilla", year="2024"),
            CertificationItem(name="Data Visualization with Python & Power BI", issuer="Coursera / IBM", year="2025"),
            CertificationItem(name="AI Fundamentals & Ethics", issuer="Google Cloud Skills Boost", year="2025")
        ],
        interests=[
            "Data Science", "Artificial Intelligence", "Machine Learning", "Data Analytics"
        ]
    )


def save_profile_to_db(profile_data: ProfileCreate, db: Session, profile_id: Optional[str] = None) -> ProfileDB:
    """Helper to persist or update a profile and its relational entities."""
    if profile_id:
        existing_profile = db.query(ProfileDB).filter(ProfileDB.id == profile_id).first()
        if existing_profile:
            # Delete old relational records to rewrite
            db.query(SkillDB).filter(SkillDB.profile_id == profile_id).delete()
            db.query(ProjectDB).filter(ProjectDB.profile_id == profile_id).delete()
            db.query(CertificationDB).filter(CertificationDB.profile_id == profile_id).delete()
            db.query(InterestDB).filter(InterestDB.profile_id == profile_id).delete()
            profile_record = existing_profile
        else:
            profile_record = ProfileDB(id=profile_id)
            db.add(profile_record)
    else:
        profile_record = ProfileDB(id=str(uuid.uuid4()))
        db.add(profile_record)

    profile_record.name = profile_data.name
    profile_record.college = profile_data.college
    profile_record.degree = profile_data.degree
    profile_record.current_semester = profile_data.current_semester
    profile_record.cgpa = profile_data.cgpa
    profile_record.preferred_career = profile_data.preferred_career

    # Add skills
    for s in profile_data.skills:
        db.add(SkillDB(
            profile_id=profile_record.id,
            name=s.name,
            level=s.level,
            category=s.category or "Technical"
        ))

    # Add projects
    for p in profile_data.projects:
        proj = ProjectDB(
            profile_id=profile_record.id,
            name=p.name,
            description=p.description,
            project_type=p.project_type or "Academic",
            difficulty=p.difficulty or "Intermediate"
        )
        proj.technologies = p.technologies
        db.add(proj)

    # Add certs
    for c in profile_data.certifications:
        db.add(CertificationDB(
            profile_id=profile_record.id,
            name=c.name,
            issuer=c.issuer,
            year=c.year
        ))

    # Add interests
    for i in profile_data.interests:
        db.add(InterestDB(
            profile_id=profile_record.id,
            name=i
        ))

    # Add seed progress snapshot history if none exists
    existing_snapshots = db.query(ProgressSnapshotDB).filter(ProgressSnapshotDB.profile_id == profile_record.id).count()
    if existing_snapshots == 0:
        db.add(ProgressSnapshotDB(profile_id=profile_record.id, month_label="Month 1", overall_score=42, skills_mastered=3, projects_completed=1))
        db.add(ProgressSnapshotDB(profile_id=profile_record.id, month_label="Month 2", overall_score=51, skills_mastered=5, projects_completed=1))
        db.add(ProgressSnapshotDB(profile_id=profile_record.id, month_label="Month 3", overall_score=63, skills_mastered=6, projects_completed=2))
        db.add(ProgressSnapshotDB(profile_id=profile_record.id, month_label="Month 4", overall_score=72, skills_mastered=8, projects_completed=3))
        db.add(ProgressSnapshotDB(profile_id=profile_record.id, month_label="Current", overall_score=82, skills_mastered=8, projects_completed=3))

    db.commit()
    db.refresh(profile_record)
    return profile_record


def db_to_profile_create(profile_db: ProfileDB) -> ProfileCreate:
    """Convert DB model into ProfileCreate Pydantic model."""
    skills = [SkillItem(name=s.name, level=s.level, category=s.category) for s in profile_db.skills]
    projects = [
        ProjectItem(
            name=p.name,
            description=p.description,
            technologies=p.technologies,
            project_type=p.project_type,
            difficulty=p.difficulty
        ) for p in profile_db.projects
    ]
    certs = [CertificationItem(name=c.name, issuer=c.issuer, year=c.year) for c in profile_db.certifications]
    interests = [i.name for i in profile_db.interests]

    return ProfileCreate(
        name=profile_db.name,
        college=profile_db.college,
        degree=profile_db.degree,
        current_semester=profile_db.current_semester,
        cgpa=profile_db.cgpa,
        preferred_career=profile_db.preferred_career,
        skills=skills,
        projects=projects,
        certifications=certs,
        interests=interests
    )


@router.post("/profile", response_model=ProfileResponse)
def create_or_update_profile(profile_data: ProfileCreate, db: Session = Depends(get_db)):
    """Create or save student profile."""
    profile_db = save_profile_to_db(profile_data, db)
    matches = ScoringEngine.calculate_career_matches(profile_data)
    readiness = ScoringEngine.calculate_overall_readiness(matches, profile_data.preferred_career)
    profile_db.career_readiness_score = readiness
    db.commit()

    return ProfileResponse(
        id=profile_db.id,
        name=profile_db.name,
        college=profile_db.college,
        degree=profile_db.degree,
        current_semester=profile_db.current_semester,
        cgpa=profile_db.cgpa,
        preferred_career=profile_db.preferred_career,
        career_readiness_score=readiness,
        skills=profile_data.skills,
        projects=profile_data.projects,
        certifications=profile_data.certifications,
        interests=profile_data.interests,
        created_at=str(profile_db.created_at)
    )


@router.get("/profile/{profile_id}", response_model=ProfileResponse)
def get_profile(profile_id: str, db: Session = Depends(get_db)):
    """Retrieve saved student profile by ID."""
    profile_db = db.query(ProfileDB).filter(ProfileDB.id == profile_id).first()
    if not profile_db:
        # Fallback to demo profile if not found
        demo = get_demo_profile_data()
        profile_db = save_profile_to_db(demo, db, profile_id=profile_id)

    profile_create = db_to_profile_create(profile_db)
    matches = ScoringEngine.calculate_career_matches(profile_create)
    readiness = ScoringEngine.calculate_overall_readiness(matches, profile_create.preferred_career)

    return ProfileResponse(
        id=profile_db.id,
        name=profile_db.name,
        college=profile_db.college,
        degree=profile_db.degree,
        current_semester=profile_db.current_semester,
        cgpa=profile_db.cgpa,
        preferred_career=profile_db.preferred_career,
        career_readiness_score=readiness,
        skills=profile_create.skills,
        projects=profile_create.projects,
        certifications=profile_create.certifications,
        interests=profile_create.interests,
        created_at=str(profile_db.created_at)
    )


@router.post("/profile/demo", response_model=ProfileResponse)
def load_demo_profile(db: Session = Depends(get_db)):
    """Load or reset the rich demo profile for 'Alex Student'."""
    demo_id = "demo-alex-student"
    demo_data = get_demo_profile_data()
    profile_db = save_profile_to_db(demo_data, db, profile_id=demo_id)
    matches = ScoringEngine.calculate_career_matches(demo_data)
    readiness = ScoringEngine.calculate_overall_readiness(matches, demo_data.preferred_career)
    profile_db.career_readiness_score = readiness
    db.commit()

    return ProfileResponse(
        id=profile_db.id,
        name=profile_db.name,
        college=profile_db.college,
        degree=profile_db.degree,
        current_semester=profile_db.current_semester,
        cgpa=profile_db.cgpa,
        preferred_career=profile_db.preferred_career,
        career_readiness_score=readiness,
        skills=demo_data.skills,
        projects=demo_data.projects,
        certifications=demo_data.certifications,
        interests=demo_data.interests,
        created_at=str(profile_db.created_at)
    )


@router.post("/analyze-career", response_model=AnalysisReport)
def run_career_analysis(profile_data: ProfileCreate, db: Session = Depends(get_db)):
    """
    Run full career intelligence pipeline on given profile.
    Saves profile and returns comprehensive analysis report.
    """
    profile_db = save_profile_to_db(profile_data, db)
    career_matches = ScoringEngine.calculate_career_matches(profile_data)
    
    top_role = career_matches[0].role if career_matches else "Data Scientist"
    target_role = profile_data.preferred_career if profile_data.preferred_career != "Not sure yet" else top_role

    skill_gaps = SkillGapEngine.analyze_skill_gaps(profile_data, target_role=target_role)

    # Fetch completed milestone IDs
    completed_milestones = db.query(MilestoneProgressDB).filter(
        MilestoneProgressDB.profile_id == profile_db.id,
        MilestoneProgressDB.is_completed == True
    ).all()
    completed_ids = [m.milestone_id for m in completed_milestones]

    roadmap = RoadmapEngine.generate_roadmap(profile_data, target_role=target_role, completed_milestone_ids=completed_ids)
    project_recs = ProjectRecommender.recommend_projects(profile_data, skill_gaps)
    readiness = ScoringEngine.calculate_overall_readiness(career_matches, target_role)

    profile_db.career_readiness_score = readiness
    db.commit()

    snapshots_db = db.query(ProgressSnapshotDB).filter(ProgressSnapshotDB.profile_id == profile_db.id).all()
    snapshots = [
        ProgressSnapshot(
            month=s.month_label,
            overall_score=s.overall_score,
            skills_mastered=s.skills_mastered,
            projects_completed=s.projects_completed
        ) for s in snapshots_db
    ]

    completed_stages_count = sum(1 for s in roadmap if s.is_completed)
    total_stages = len(roadmap)
    roadmap_percent = int((completed_stages_count / max(1, total_stages)) * 100)

    progress = ProgressResponse(
        overall_progress=readiness,
        skills_completed=skill_gaps.strong_skills_count,
        total_skills_tracked=len(profile_data.skills),
        roadmap_completion=roadmap_percent,
        completed_milestones=completed_stages_count,
        total_milestones=total_stages,
        projects_completed=len(profile_data.projects),
        skill_growth_timeline=snapshots,
        current_readiness_level="Competitive Candidate" if readiness >= 80 else "Developing Candidate"
    )

    return AnalysisReport(
        profile_id=profile_db.id,
        career_readiness_score=readiness,
        top_career_match=top_role,
        career_matches=career_matches,
        primary_skill_gaps=skill_gaps,
        roadmap=roadmap,
        project_recommendations=project_recs,
        progress=progress
    )


@router.get("/career-matches/{profile_id}", response_model=List[CareerMatch])
def get_career_matches(profile_id: str, db: Session = Depends(get_db)):
    """Get ranked career matches with explainable AI decompositions."""
    profile_db = db.query(ProfileDB).filter(ProfileDB.id == profile_id).first()
    if not profile_db:
        profile_create = get_demo_profile_data()
    else:
        profile_create = db_to_profile_create(profile_db)

    return ScoringEngine.calculate_career_matches(profile_create)


@router.get("/skill-gap/{profile_id}", response_model=SkillGapResponse)
def get_skill_gap(profile_id: str, career: Optional[str] = Query("Data Scientist"), db: Session = Depends(get_db)):
    """Evaluate skill gap matrix for specified career role."""
    profile_db = db.query(ProfileDB).filter(ProfileDB.id == profile_id).first()
    if not profile_db:
        profile_create = get_demo_profile_data()
    else:
        profile_create = db_to_profile_create(profile_db)

    return SkillGapEngine.analyze_skill_gaps(profile_create, target_role=career)


@router.get("/roadmap/{profile_id}", response_model=List[RoadmapStage])
def get_roadmap(profile_id: str, career: Optional[str] = Query("Data Scientist"), db: Session = Depends(get_db)):
    """Get personalized 6-month roadmap with milestone completion status."""
    profile_db = db.query(ProfileDB).filter(ProfileDB.id == profile_id).first()
    if not profile_db:
        profile_create = get_demo_profile_data()
        completed_ids = []
    else:
        profile_create = db_to_profile_create(profile_db)
        completed_milestones = db.query(MilestoneProgressDB).filter(
            MilestoneProgressDB.profile_id == profile_id,
            MilestoneProgressDB.is_completed == True
        ).all()
        completed_ids = [m.milestone_id for m in completed_milestones]

    return RoadmapEngine.generate_roadmap(profile_create, target_role=career, completed_milestone_ids=completed_ids)


@router.post("/roadmap/toggle-milestone")
def toggle_milestone(request: MilestoneToggleRequest, db: Session = Depends(get_db)):
    """Toggle a roadmap milestone's completion state."""
    record = db.query(MilestoneProgressDB).filter(
        MilestoneProgressDB.profile_id == request.profile_id,
        MilestoneProgressDB.milestone_id == request.milestone_id
    ).first()

    if not record:
        record = MilestoneProgressDB(
            profile_id=request.profile_id,
            milestone_id=request.milestone_id,
            is_completed=request.completed
        )
        db.add(record)
    else:
        record.is_completed = request.completed

    db.commit()
    return {"status": "success", "milestone_id": request.milestone_id, "is_completed": request.completed}


@router.get("/projects/recommendations/{profile_id}", response_model=List[ProjectRecommendation])
def get_project_recommendations(profile_id: str, career: Optional[str] = Query("Data Scientist"), db: Session = Depends(get_db)):
    """Get portfolio project recommendations targeting detected skill gaps."""
    profile_db = db.query(ProfileDB).filter(ProfileDB.id == profile_id).first()
    if not profile_db:
        profile_create = get_demo_profile_data()
    else:
        profile_create = db_to_profile_create(profile_db)

    skill_gaps = SkillGapEngine.analyze_skill_gaps(profile_create, target_role=career)
    return ProjectRecommender.recommend_projects(profile_create, skill_gaps)


@router.get("/careers")
def get_all_careers():
    """Retrieve full catalog of 10+ career benchmarks."""
    return CAREERS_DATA


@router.get("/progress/{profile_id}", response_model=ProgressResponse)
def get_progress(profile_id: str, db: Session = Depends(get_db)):
    """Get complete progress statistics and growth timeline."""
    profile_db = db.query(ProfileDB).filter(ProfileDB.id == profile_id).first()
    if not profile_db:
        profile_create = get_demo_profile_data()
        profile_id = "demo-alex-student"
    else:
        profile_create = db_to_profile_create(profile_db)

    matches = ScoringEngine.calculate_career_matches(profile_create)
    target_role = profile_create.preferred_career if profile_create.preferred_career != "Not sure yet" else matches[0].role
    readiness = ScoringEngine.calculate_overall_readiness(matches, target_role)
    skill_gaps = SkillGapEngine.analyze_skill_gaps(profile_create, target_role=target_role)

    completed_milestones = db.query(MilestoneProgressDB).filter(
        MilestoneProgressDB.profile_id == profile_id,
        MilestoneProgressDB.is_completed == True
    ).all()
    completed_ids = [m.milestone_id for m in completed_milestones]
    roadmap = RoadmapEngine.generate_roadmap(profile_create, target_role=target_role, completed_milestone_ids=completed_ids)

    snapshots_db = db.query(ProgressSnapshotDB).filter(ProgressSnapshotDB.profile_id == profile_id).all()
    if not snapshots_db:
        snapshots = [
            ProgressSnapshot(month="Month 1", overall_score=42, skills_mastered=3, projects_completed=1),
            ProgressSnapshot(month="Month 2", overall_score=51, skills_mastered=5, projects_completed=1),
            ProgressSnapshot(month="Month 3", overall_score=63, skills_mastered=6, projects_completed=2),
            ProgressSnapshot(month="Month 4", overall_score=72, skills_mastered=8, projects_completed=3),
            ProgressSnapshot(month="Current", overall_score=readiness, skills_mastered=skill_gaps.strong_skills_count, projects_completed=len(profile_create.projects))
        ]
    else:
        snapshots = [
            ProgressSnapshot(
                month=s.month_label,
                overall_score=s.overall_score,
                skills_mastered=s.skills_mastered,
                projects_completed=s.projects_completed
            ) for s in snapshots_db
        ]

    completed_stages_count = sum(1 for s in roadmap if s.is_completed)
    total_stages = len(roadmap)
    roadmap_percent = int((completed_stages_count / max(1, total_stages)) * 100)

    return ProgressResponse(
        overall_progress=readiness,
        skills_completed=skill_gaps.strong_skills_count,
        total_skills_tracked=len(profile_create.skills),
        roadmap_completion=roadmap_percent,
        completed_milestones=completed_stages_count,
        total_milestones=total_stages,
        projects_completed=len(profile_create.projects),
        skill_growth_timeline=snapshots,
        current_readiness_level="Competitive Candidate" if readiness >= 80 else "Developing Candidate"
    )


@router.post("/ai/chat", response_model=ChatResponse)
def ai_career_chat(request: ChatRequest, db: Session = Depends(get_db)):
    """Context-aware AI career assistant chat endpoint."""
    profile_id = request.profile_id or "demo-alex-student"
    profile_db = db.query(ProfileDB).filter(ProfileDB.id == profile_id).first()
    
    if not profile_db:
        profile_create = get_demo_profile_data()
    else:
        profile_create = db_to_profile_create(profile_db)

    matches = ScoringEngine.calculate_career_matches(profile_create)
    active_role = request.active_role or profile_create.preferred_career or matches[0].role
    if active_role == "Not sure yet":
        active_role = matches[0].role

    target_match = next((m for m in matches if m.role.lower() == active_role.lower()), matches[0])
    skill_gaps = SkillGapEngine.analyze_skill_gaps(profile_create, target_role=active_role)

    return AIAssistantService.generate_response(
        request=request,
        profile=profile_create,
        career_match_role=active_role,
        match_score=target_match.match_percentage,
        skill_gaps=skill_gaps
    )
