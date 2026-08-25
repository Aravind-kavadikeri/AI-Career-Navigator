"""
FastAPI Main Application Entry Point
Mounts API routes, configures CORS, and initializes database with seed data.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.database.models import init_db, SessionLocal, ProfileDB
from app.api.endpoints import router as api_router, get_demo_profile_data, save_profile_to_db

load_dotenv()

# Initialize database schema
init_db()

# Pre-seed demo profile on startup if not present
def seed_demo_profile():
    db = SessionLocal()
    try:
        demo = db.query(ProfileDB).filter(ProfileDB.id == "demo-alex-student").first()
        if not demo:
            demo_data = get_demo_profile_data()
            save_profile_to_db(demo_data, db, profile_id="demo-alex-student")
            print("🚀 Successfully seeded default demo profile for 'Alex Student'.")
    except Exception as e:
        print(f"Demo seed error: {e}")
    finally:
        db.close()

seed_demo_profile()

app = FastAPI(
    title="AI Career Navigator API",
    description="Intelligent career guidance & roadmap engine for students and early-career learners",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins in dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routes
app.include_router(api_router)


@app.get("/")
def root():
    return {
        "status": "online",
        "app": "AI Career Navigator API",
        "version": "1.0.0",
        "tagline": "Know where you are. Discover where you belong. Build your path.",
        "docs_url": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
