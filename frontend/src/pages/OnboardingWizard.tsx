import React, { useState } from 'react';
import {
  User,
  Code2,
  FolderGit2,
  Sparkles,
  Target,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Check,
  HelpCircle
} from 'lucide-react';
import { StudentProfile, SkillItem, ProjectItem, CertificationItem } from '../types';

interface OnboardingWizardProps {
  initialProfile: StudentProfile;
  onComplete: (profile: StudentProfile) => void;
  onCancel: () => void;
}

const DEFAULT_TECH_SKILLS = [
  'Python', 'SQL', 'Java', 'C', 'C++', 'JavaScript', 'HTML', 'CSS', 'Excel', 'Power BI', 'Tableau'
];

const DEFAULT_AI_SKILLS = [
  'Statistics', 'Mathematics', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Visualization', 'Data Analysis'
];

const ALL_INTERESTS_LIST = [
  'Data Science', 'Artificial Intelligence', 'Machine Learning', 'Data Analytics',
  'Software Development', 'Cybersecurity', 'Cloud Computing', 'Product Management', 'Research'
];

const CAREER_OPTIONS = [
  'Data Scientist', 'Data Analyst', 'ML Engineer', 'AI Engineer',
  'Data Engineer', 'Software Engineer', 'Business Analyst', 'AI Researcher', 'Not sure yet'
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ initialProfile, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);

  // Helper for personal info
  const handlePersonalInfoChange = (field: keyof StudentProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Helper for skills
  const handleSkillLevelChange = (skillName: string, level: number, category: string) => {
    setProfile(prev => {
      const existing = prev.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
      let updatedSkills: SkillItem[];
      if (existing) {
        updatedSkills = prev.skills.map(s =>
          s.name.toLowerCase() === skillName.toLowerCase() ? { ...s, level } : s
        );
      } else {
        updatedSkills = [...prev.skills, { name: skillName, level, category }];
      }
      return { ...prev, skills: updatedSkills };
    });
  };

  const getSkillLevel = (skillName: string) => {
    const found = profile.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    return found ? found.level : 0;
  };

  // Helper for projects
  const addProject = () => {
    const newProj: ProjectItem = {
      name: '',
      description: '',
      technologies: ['Python'],
      project_type: 'Portfolio Project',
      difficulty: 'Intermediate'
    };
    setProfile(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const removeProject = (index: number) => {
    setProfile(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const updateProject = (index: number, field: keyof ProjectItem, value: any) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.map((p, i) => i === index ? { ...p, [field]: value } : p)
    }));
  };

  // Helper for certs
  const addCertification = () => {
    const newCert: CertificationItem = {
      name: '',
      issuer: '',
      year: '2025'
    };
    setProfile(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const removeCertification = (index: number) => {
    setProfile(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }));
  };

  const updateCertification = (index: number, field: keyof CertificationItem, value: string) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.map((c, i) => i === index ? { ...c, [field]: value } : c)
    }));
  };

  // Helper for interests
  const toggleInterest = (interest: string) => {
    setProfile(prev => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
      };
    });
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(prev => prev + 1);
    } else {
      onComplete(profile);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="glass-card p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl">
        
        {/* Wizard Header & Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400">
                AI Career Profile Setup
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {step === 1 && "Step 1 — About You"}
                {step === 2 && "Step 2 — Your Skills & Proficiencies"}
                {step === 3 && "Step 3 — Your Practical Projects"}
                {step === 4 && "Step 4 — Interests & Certifications"}
                {step === 5 && "Step 5 — Target Career Goal"}
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Step {step} of 5
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Tell us about your academic standing. This feeds into our normalization and readiness algorithms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  placeholder="e.g. Alex Student"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">College / University</label>
                <input
                  type="text"
                  value={profile.college}
                  onChange={(e) => handlePersonalInfoChange('college', e.target.value)}
                  placeholder="e.g. National Institute of Technology"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Degree Program</label>
                <input
                  type="text"
                  value={profile.degree}
                  onChange={(e) => handlePersonalInfoChange('degree', e.target.value)}
                  placeholder="e.g. B.Tech Data Science / Computer Science"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Current Semester</label>
                  <select
                    value={profile.current_semester}
                    onChange={(e) => handlePersonalInfoChange('current_semester', parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">CGPA / GPA (10.0 scale)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={profile.cgpa}
                    onChange={(e) => handlePersonalInfoChange('cgpa', parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Skills with Interactive Sliders */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Rate your proficiency level (0% = Novice, 100% = Production Master). Our AI uses these to compute cosine distance against role benchmarks.
            </p>

            {/* Technical Skills Section */}
            <div>
              <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">
                Core Programming & Technical Tools
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DEFAULT_TECH_SKILLS.map(skill => {
                  const level = getSkillLevel(skill);
                  return (
                    <div key={skill} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{skill}</span>
                        <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400">{level}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={level}
                        onChange={(e) => handleSkillLevelChange(skill, parseInt(e.target.value), 'Technical')}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI / Data Science Skills Section */}
            <div>
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
                Data Science & AI Specializations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DEFAULT_AI_SKILLS.map(skill => {
                  const level = getSkillLevel(skill);
                  return (
                    <div key={skill} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{skill}</span>
                        <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">{level}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={level}
                        onChange={(e) => handleSkillLevelChange(skill, parseInt(e.target.value), 'AI/Data')}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Projects */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Add projects you have built. Real projects dramatically boost your practical match score.
              </p>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            {profile.projects.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 text-center">
                <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No projects added yet</p>
                <p className="text-xs text-slate-500 mt-1">Click 'Add Project' to list your coursework or independent builds.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {profile.projects.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">Project #{idx + 1}</span>
                      <button
                        onClick={() => removeProject(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => updateProject(idx, 'name', e.target.value)}
                          placeholder="e.g. Customer Churn Prediction System"
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Technologies Used (comma separated)</label>
                        <input
                          type="text"
                          value={proj.technologies.join(', ')}
                          onChange={(e) => updateProject(idx, 'technologies', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                          placeholder="e.g. Python, Scikit-Learn, Pandas"
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Short Description</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => updateProject(idx, 'description', e.target.value)}
                        placeholder="Brief summary of problem solved, algorithm used, and result achieved..."
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Interests & Certifications */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Interests Chips */}
            <div>
              <label className="block text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">
                Domain Interests (Select all that excite you)
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_INTERESTS_LIST.map(interest => {
                  const isSelected = profile.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Certifications Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Certifications (Optional)
                </label>
                <button
                  type="button"
                  onClick={addCertification}
                  className="flex items-center space-x-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Cert</span>
                </button>
              </div>

              {profile.certifications.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">No certifications added yet.</p>
              ) : (
                <div className="space-y-2">
                  {profile.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <input
                        type="text"
                        placeholder="Certificate Title (e.g. IBM Data Science)"
                        value={cert.name}
                        onChange={(e) => updateCertification(idx, 'name', e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Issuer (Coursera/Google)"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(idx, 'issuer', e.target.value)}
                        className="w-36 px-2.5 py-1.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <button
                        onClick={() => removeCertification(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: Target Career */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Select your dream role, or pick <strong>"Not sure yet"</strong> and let our recommendation engine calculate your highest statistical fit.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CAREER_OPTIONS.map(role => {
                const isSelected = profile.preferred_career === role;
                return (
                  <div
                    key={role}
                    onClick={() => handlePersonalInfoChange('preferred_career', role)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-teal-500/15 border-teal-500 ring-2 ring-teal-500 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{role}</h4>
                      {isSelected && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 font-bold" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {role === 'Not sure yet'
                        ? 'Allow AI to recommend the most compatible career path.'
                        : `Evaluate profile against industry benchmarks for ${role}.`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Cancel' : 'Back'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 transition hover:scale-105 active:scale-95"
          >
            <span>{step === 5 ? 'Run AI Career Analysis' : 'Save & Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
