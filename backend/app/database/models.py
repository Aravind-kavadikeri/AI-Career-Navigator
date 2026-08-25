"""
SQLAlchemy Models & Database Initialization
Provides SQLite persistence with an upgrade path to PostgreSQL.
"""

import os
import json
import uuid
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, Float, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./career_navigator.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class ProfileDB(Base):
    __tablename__ = "profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False, default="Alex Student")
    college = Column(String(150), default="Institute of Technology")
    degree = Column(String(100), default="B.Tech Data Science")
    current_semester = Column(Integer, default=6)
    cgpa = Column(Float, default=8.4)
    preferred_career = Column(String(100), default="Data Scientist")
    career_readiness_score = Column(Integer, default=82)
    created_at = Column(DateTime, default=datetime.utcnow)

    skills = relationship("SkillDB", back_populates="profile", cascade="all, delete-orphan")
    projects = relationship("ProjectDB", back_populates="profile", cascade="all, delete-orphan")
    certifications = relationship("CertificationDB", back_populates="profile", cascade="all, delete-orphan")
    interests = relationship("InterestDB", back_populates="profile", cascade="all, delete-orphan")
    milestone_statuses = relationship("MilestoneProgressDB", back_populates="profile", cascade="all, delete-orphan")
    progress_history = relationship("ProgressSnapshotDB", back_populates="profile", cascade="all, delete-orphan")


class SkillDB(Base):
    __tablename__ = "skills"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)
    level = Column(Integer, nullable=False, default=50)
    category = Column(String(50), default="Technical")

    profile = relationship("ProfileDB", back_populates="skills")


class ProjectDB(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(150), nullable=False)
    description = Column(Text, default="")
    technologies_json = Column(Text, default="[]")  # JSON string of list of tech
    project_type = Column(String(100), default="Academic / Portfolio")
    difficulty = Column(String(50), default="Intermediate")

    profile = relationship("ProfileDB", back_populates="projects")

    @property
    def technologies(self):
        try:
            return json.loads(self.technologies_json)
        except Exception:
            return []

    @technologies.setter
    def technologies(self, val):
        self.technologies_json = json.dumps(val if isinstance(val, list) else [])


class CertificationDB(Base):
    __tablename__ = "certifications"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(150), nullable=False)
    issuer = Column(String(150), default="")
    year = Column(String(10), default="2025")

    profile = relationship("ProfileDB", back_populates="certifications")


class InterestDB(Base):
    __tablename__ = "interests"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)

    profile = relationship("ProfileDB", back_populates="interests")


class MilestoneProgressDB(Base):
    __tablename__ = "milestone_progress"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    milestone_id = Column(String(50), nullable=False)
    is_completed = Column(Boolean, default=False)

    profile = relationship("ProfileDB", back_populates="milestone_statuses")


class ProgressSnapshotDB(Base):
    __tablename__ = "progress_snapshots"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    month_label = Column(String(50), nullable=False)
    overall_score = Column(Integer, default=50)
    skills_mastered = Column(Integer, default=4)
    projects_completed = Column(Integer, default=1)

    profile = relationship("ProfileDB", back_populates="progress_history")


def init_db():
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
