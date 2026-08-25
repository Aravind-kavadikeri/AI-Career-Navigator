"""
Explainable Multi-Factor Career Scoring Engine
Calculates normalized match scores (0-100%) and decomposes the score
into 5 transparent factors for Explainable AI (XAI):
- Technical & AI Skills (35%)
- Practical Projects (25%)
- Domain Interests (20%)
- Academic Performance (10%)
- Verified Certifications (10%)
"""

from typing import List, Dict, Any
from app.data.career_taxonomy import CAREERS_DATA
from app.schemas.schemas import CareerMatch, XAIFactors, ProfileCreate


class ScoringEngine:
    @staticmethod
    def calculate_career_matches(profile: ProfileCreate) -> List[CareerMatch]:
        """
        Evaluate student profile against all industry benchmarks and return
        ranked career matches with full explainability breakdowns.
        """
        user_skills_dict = {s.name.lower(): s.level for s in profile.skills}
        user_interests_set = {i.lower() for i in profile.interests}
        user_projects = profile.projects
        user_certs = profile.certifications
        cgpa = profile.cgpa

        matches: List[CareerMatch] = []

        for role_name, role_data in CAREERS_DATA.items():
            req_skills = role_data["required_skills"]
            core_techs = [t.lower() for t in role_data["core_technologies"]]
            interest_keywords = [k.lower() for k in role_data["interest_keywords"]]

            # 1. Technical & AI Skills Match (Max 35 points)
            skill_score_sum = 0.0
            total_req_weight = 0.0
            matched_strengths: List[str] = []
            growth_areas: List[str] = []

            for req_skill, req_level in req_skills.items():
                user_lvl = user_skills_dict.get(req_skill.lower(), 0)
                total_req_weight += req_level

                # Ratio of user proficiency to benchmark required level
                ratio = min(1.0, user_lvl / max(1, req_level))
                skill_score_sum += (ratio * req_level)

                if user_lvl >= req_level - 5 and user_lvl > 50:
                    matched_strengths.append(f"Strong proficiency in {req_skill} ({user_lvl}%)")
                elif user_lvl < req_level - 15:
                    growth_areas.append(f"{req_skill} gap: current {user_lvl}%, required {req_level}%")

            tech_ratio = (skill_score_sum / max(1.0, total_req_weight)) if total_req_weight > 0 else 0.5
            tech_points = round(tech_ratio * 35.0, 1)

            # 2. Practical Projects Match (Max 25 points)
            project_points = 0.0
            if user_projects:
                project_relevance_hits = 0
                for proj in user_projects:
                    proj_techs = [t.lower() for t in proj.technologies]
                    overlap = any(ct in " ".join(proj_techs) or any(pt in ct for pt in proj_techs) for ct in core_techs)
                    if overlap or any(role_kw in proj.name.lower() or role_kw in proj.description.lower() for role_kw in interest_keywords):
                        project_relevance_hits += 1

                # Factor in count and relevance
                base_proj_score = min(3, len(user_projects)) / 3.0  # Up to 3 projects
                relevance_multiplier = 0.7 + 0.3 * (project_relevance_hits / max(1, len(user_projects)))
                project_points = round(base_proj_score * relevance_multiplier * 25.0, 1)
                
                if project_relevance_hits > 0:
                    matched_strengths.append(f"Completed {project_relevance_hits} directly relevant portfolio project(s)")
            else:
                growth_areas.append("No active portfolio projects matching this domain")

            # 3. Domain Interests Match (Max 20 points)
            interest_overlap = sum(1 for ik in interest_keywords if ik in user_interests_set or any(ui in ik for ui in user_interests_set))
            interest_ratio = min(1.0, interest_overlap / max(1, min(3, len(interest_keywords))))
            interest_points = round(interest_ratio * 20.0, 1)

            if interest_overlap > 0:
                matched_strengths.append(f"Strong interest alignment in {', '.join(role_data['interest_keywords'][:2])}")

            # 4. Academic Performance Match (Max 10 points)
            # CGPA scaled on 10.0 scale (or 4.0 scale if <= 4.0)
            normalized_cgpa = (cgpa / 10.0) if cgpa > 4.0 else (cgpa / 4.0)
            academic_points = round(min(1.0, max(0.4, normalized_cgpa)) * 10.0, 1)

            # 5. Certifications Match (Max 10 points)
            cert_points = 0.0
            if user_certs:
                cert_relevance = 0
                for cert in user_certs:
                    if any(kw in cert.name.lower() for kw in interest_keywords) or any(ct in cert.name.lower() for ct in core_techs):
                        cert_relevance += 1
                cert_ratio = min(1.0, (len(user_certs) * 0.4) + (cert_relevance * 0.6))
                cert_points = round(cert_ratio * 10.0, 1)
                if cert_relevance > 0:
                    matched_strengths.append("Verified relevant industry/academic certifications")

            # Total Composite Match (0 to 100)
            total_score = int(round(tech_points + project_points + interest_points + academic_points + cert_points))
            total_score = max(15, min(99, total_score))  # realistic SaaS boundaries

            # Recommended Next Step
            if growth_areas:
                recommended_next_step = f"Focus on closing gaps in {growth_areas[0].split(' gap')[0]} and build a targeted portfolio project."
            else:
                recommended_next_step = f"Advance to full-scale portfolio deployment and start interview preparation for {role_name}."

            xai = XAIFactors(
                technical_skills=tech_points,
                projects=project_points,
                interests=interest_points,
                academic_performance=academic_points,
                certifications=cert_points
            )

            # Fallbacks for strengths if none triggered
            if not matched_strengths:
                matched_strengths = ["Foundational technical competencies established", "Demonstrated problem-solving aptitude"]

            matches.append(CareerMatch(
                role=role_name,
                match_percentage=total_score,
                tagline=role_data["tagline"],
                description=role_data["description"],
                category=role_data["category"],
                difficulty=role_data["difficulty"],
                why_it_matches=matched_strengths[:4],
                needs_improvement=growth_areas[:4] if growth_areas else ["Advanced production optimization", "System scaling"],
                recommended_next_step=recommended_next_step,
                xai_breakdown=xai,
                required_skills=req_skills
            ))

        # Sort matches by match_percentage descending
        matches.sort(key=lambda x: x.match_percentage, reverse=True)
        return matches

    @staticmethod
    def calculate_overall_readiness(matches: List[CareerMatch], preferred_role: str) -> int:
        """Calculate overall readiness score for the student's target or top match."""
        target_match = next((m for m in matches if m.role.lower() == preferred_role.lower()), None)
        if target_match:
            return target_match.match_percentage
        return matches[0].match_percentage if matches else 75
