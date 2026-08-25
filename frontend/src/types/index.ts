export interface SkillItem {
  name: string;
  level: number;
  category?: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  project_type?: string;
  difficulty?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

export interface StudentProfile {
  id?: string;
  name: string;
  college: string;
  degree: string;
  current_semester: number;
  cgpa: number;
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  interests: string[];
  preferred_career: string;
  career_readiness_score?: number;
  created_at?: string;
}

export interface XAIFactors {
  technical_skills: number;
  projects: number;
  interests: number;
  academic_performance: number;
  certifications: number;
}

export interface CareerMatch {
  role: string;
  match_percentage: number;
  tagline: string;
  description: string;
  category: string;
  difficulty: string;
  why_it_matches: string[];
  needs_improvement: string[];
  recommended_next_step: string;
  xai_breakdown: XAIFactors;
  required_skills: Record<string, number>;
}

export interface SkillGapItem {
  skill: string;
  user_level: number;
  required_level: number;
  gap: number;
  status: 'Strong' | 'Improve' | 'Major Gap';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  priority_order: number;
  reason: string;
}

export interface SkillGapResponse {
  role: string;
  role_match_score: number;
  strong_skills_count: number;
  improve_skills_count: number;
  major_gaps_count: number;
  skill_gaps: SkillGapItem[];
  top_learning_priority: string;
}

export interface ResourceItem {
  title: string;
  url: string;
  type: string;
  platform: string;
  is_free: boolean;
}

export interface RoadmapStage {
  id: string;
  month: number;
  title: string;
  skills: string[];
  learning_objectives: string[];
  recommended_projects: string[];
  estimated_hours: number;
  difficulty: string;
  resources?: ResourceItem[];
  xp_reward?: number;
  is_completed: boolean;
}


export interface ProjectRecommendation {
  id: string;
  title: string;
  description: string;
  skills_gained: string[];
  difficulty: string;
  portfolio_value: number;
  target_gap_skill: string;
  estimated_days: number;
  implementation_steps: string[];
}

export interface ProgressSnapshot {
  month: string;
  overall_score: number;
  skills_mastered: number;
  projects_completed: number;
}

export interface ProgressResponse {
  overall_progress: number;
  skills_completed: number;
  total_skills_tracked: number;
  roadmap_completion: number;
  completed_milestones: number;
  total_milestones: number;
  projects_completed: number;
  skill_growth_timeline: ProgressSnapshot[];
  current_readiness_level: string;
}

export interface AnalysisReport {
  profile_id: string;
  career_readiness_score: number;
  top_career_match: string;
  career_matches: CareerMatch[];
  primary_skill_gaps: SkillGapResponse;
  roadmap: RoadmapStage[];
  project_recommendations: ProjectRecommendation[];
  progress: ProgressResponse;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
  suggested_prompts: string[];
  context_used: Record<string, any>;
}

export type ActiveTab = 
  | 'dashboard'
  | 'career-profile'
  | 'career-matches'
  | 'skill-gap'
  | 'roadmap'
  | 'projects'
  | 'learning'
  | 'career-explorer'
  | 'progress';

export type ColorTheme = 'obsidian' | 'emerald' | 'indigo' | 'blue' | 'rose' | 'amber';
export type ThemeMode = 'dark' | 'light' | 'system';


