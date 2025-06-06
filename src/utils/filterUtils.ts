import { Project, ProjectFilters, PortfolioStats } from '../types/project.js';

export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
    return projects.filter((project) => {
        return (
            (filters.rag === "all" || project.rag === filters.rag) &&
            (filters.executionState === "all" ||
                project.executionState === filters.executionState) &&
            (filters.organization === "all" ||
                project.l1OwningOrganization === filters.organization) &&
            (filters.benefitsLevel === "all" ||
                project.benefitsReportingLevel === filters.benefitsLevel) &&
            (filters.inPlan === "all" || project.inPlan === filters.inPlan)
        );
    });
}

export function calculatePortfolioStats(projects: Project[]): PortfolioStats {
    return {
        totalProjects: projects.length,
        total2024Live: projects.reduce((sum, p) => sum + (p.financials.live2024 || 0), 0),
        total2025Live: projects.reduce((sum, p) => sum + (p.financials.live2025 || 0), 0),
        redProjects: projects.filter((p) => p.rag === "RED").length,
        inProgressProjects: projects.filter((p) => p.executionState === "In Progress").length,
        inPlanProjects: projects.filter((p) => p.inPlan === "Yes").length,
    };
}