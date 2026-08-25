import axios from 'axios';
import {
  StudentProfile,
  AnalysisReport,
  CareerMatch,
  SkillGapResponse,
  RoadmapStage,
  ProjectRecommendation,
  ProgressResponse,
  ChatResponse,
  ChatMessage
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const api = {
  // 1. Profile Endpoints
  async saveProfile(profile: StudentProfile): Promise<StudentProfile> {
    try {
      const response = await client.post<StudentProfile>('/profile', profile);
      return response.data;
    } catch (error) {
      console.warn('API saveProfile error, returning local profile', error);
      return { ...profile, id: profile.id || 'local-profile', career_readiness_score: 82 };
    }
  },

  async getProfile(id: string): Promise<StudentProfile> {
    try {
      const response = await client.get<StudentProfile>(`/profile/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API getProfile error', error);
      return this.loadDemoProfile();
    }
  },

  async loadDemoProfile(): Promise<StudentProfile> {
    try {
      const response = await client.post<StudentProfile>('/profile/demo');
      return response.data;
    } catch (error) {
      console.warn('API loadDemoProfile fallback', error);
      return {
        id: 'demo-alex-student',
        name: 'Alex Student',
        college: 'National Institute of Technology',
        degree: 'B.Tech Data Science',
        current_semester: 6,
        cgpa: 8.4,
        preferred_career: 'Data Scientist',
        career_readiness_score: 82,
        skills: [
          { name: 'Python', level: 88, category: 'Technical' },
          { name: 'SQL', level: 76, category: 'Technical' },
          { name: 'Statistics', level: 64, category: 'AI/Data' },
          { name: 'Machine Learning', level: 61, category: 'AI/Data' },
          { name: 'Data Visualization', level: 72, category: 'AI/Data' },
          { name: 'Deep Learning', level: 42, category: 'AI/Data' },
          { name: 'Data Analysis', level: 80, category: 'AI/Data' },
          { name: 'Mathematics', level: 70, category: 'AI/Data' },
          { name: 'Excel', level: 75, category: 'Technical' },
          { name: 'Power BI', level: 68, category: 'Technical' },
          { name: 'JavaScript', level: 55, category: 'Technical' },
          { name: 'HTML', level: 70, category: 'Technical' },
          { name: 'CSS', level: 65, category: 'Technical' },
        ],
        projects: [
          {
            name: 'Student Academic Performance Prediction',
            description: 'Built a supervised regression model predicting semester GPA from historical engagement metrics with Scikit-Learn.',
            technologies: ['Python', 'Scikit-Learn', 'Pandas'],
            project_type: 'Academic Capstone',
            difficulty: 'Intermediate'
          },
          {
            name: 'Customer Churn Diagnostic Analyzer',
            description: 'Exploratory data analysis and logistic regression pipeline to identify drivers of telecom subscription cancellations.',
            technologies: ['Python', 'Pandas', 'SQL', 'Seaborn'],
            project_type: 'Portfolio Project',
            difficulty: 'Intermediate'
          },
          {
            name: 'AI Resume Analyzer & Keyword Matcher',
            description: 'Text parsing application extracting key skills from PDF resumes and matching against job description postings.',
            technologies: ['Python', 'NLP', 'FastAPI'],
            project_type: 'Independent Project',
            difficulty: 'Intermediate'
          }
        ],
        certifications: [
          { name: 'Python for Data Science & ML Bootcamp', issuer: 'Udemy / Jose Portilla', year: '2024' },
          { name: 'Data Visualization with Python & Power BI', issuer: 'Coursera / IBM', year: '2025' },
          { name: 'AI Fundamentals & Ethics', issuer: 'Google Cloud', year: '2025' }
        ],
        interests: ['Data Science', 'Artificial Intelligence', 'Machine Learning', 'Data Analytics']
      };
    }
  },

  // 2. Career Intelligence Pipeline
  async analyzeCareer(profile: StudentProfile): Promise<AnalysisReport> {
    try {
      const response = await client.post<AnalysisReport>('/analyze-career', profile);
      return response.data;
    } catch (error) {
      console.warn('API analyzeCareer fallback', error);
      throw error;
    }
  },

  async getCareerMatches(profileId: string): Promise<CareerMatch[]> {
    const response = await client.get<CareerMatch[]>(`/career-matches/${profileId}`);
    return response.data;
  },

  async getSkillGap(profileId: string, career: string = 'Data Scientist'): Promise<SkillGapResponse> {
    const response = await client.get<SkillGapResponse>(`/skill-gap/${profileId}?career=${encodeURIComponent(career)}`);
    return response.data;
  },

  async getRoadmap(profileId: string, career: string = 'Data Scientist'): Promise<RoadmapStage[]> {
    const response = await client.get<RoadmapStage[]>(`/roadmap/${profileId}?career=${encodeURIComponent(career)}`);
    return response.data;
  },

  async toggleMilestone(profileId: string, milestoneId: string, completed: boolean): Promise<any> {
    const response = await client.post('/roadmap/toggle-milestone', {
      profile_id: profileId,
      milestone_id: milestoneId,
      completed
    });
    return response.data;
  },

  async getProjectRecommendations(profileId: string, career: string = 'Data Scientist'): Promise<ProjectRecommendation[]> {
    const response = await client.get<ProjectRecommendation[]>(`/projects/recommendations/${profileId}?career=${encodeURIComponent(career)}`);
    return response.data;
  },

  async getCareersEncyclopedia(): Promise<Record<string, any>> {
    const response = await client.get('/careers');
    return response.data;
  },

  async getProgress(profileId: string): Promise<ProgressResponse> {
    const response = await client.get<ProgressResponse>(`/progress/${profileId}`);
    return response.data;
  },

  // 3. AI Assistant Chat
  async chatWithAssistant(
    profileId: string,
    message: string,
    history: ChatMessage[],
    activeRole: string = 'Data Scientist'
  ): Promise<ChatResponse> {
    try {
      const response = await client.post<ChatResponse>('/ai/chat', {
        profile_id: profileId,
        message,
        history,
        active_role: activeRole
      });
      return response.data;
    } catch (error) {
      console.warn('API chat fallback', error);
      return {
        reply: `### 🎯 AI Career Advisor (Offline Mode)\n\nBased on your profile aiming for **${activeRole}**, focus on strengthening your Machine Learning and Statistics skills, then build a deployed portfolio project!`,
        suggested_prompts: ["What should I learn next?", "Am I ready for an internship?", "Which projects should I build?"],
        context_used: { role: activeRole }
      };
    }
  }
};
