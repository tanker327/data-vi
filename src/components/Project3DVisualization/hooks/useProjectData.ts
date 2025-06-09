import { useMemo } from "react";
import { Project, ProjectFilters, PositionedProject, PortfolioStats } from "../types/project";
import { generateProjectData } from "../data/projectData";
import { filterProjects, calculatePortfolioStats } from "../utils/filterUtils";
import { calculateProjectPosition } from "../utils/coordinateUtils";

export function useProjectData(): Project[] {
    const projects = useMemo(() => generateProjectData(), []);
    return projects;
}

export function useFilteredProjects(projects: Project[], filters: ProjectFilters): Project[] {
    const filteredProjects = useMemo(() => {
        return filterProjects(projects, filters);
    }, [projects, filters]);
    
    return filteredProjects;
}

export function usePositionedProjects(filteredProjects: Project[]): PositionedProject[] {
    const positionedProjects = useMemo(() => {
        return filteredProjects.map((project) => {
            const position = calculateProjectPosition(project);
            const totalFinancials = position[1]; // Y coordinate represents total financials
            
            return {
                ...project,
                position,
                totalFinancials,
            };
        });
    }, [filteredProjects]);
    
    return positionedProjects;
}

export function usePortfolioStats(filteredProjects: Project[]): PortfolioStats {
    const stats = useMemo(() => {
        return calculatePortfolioStats(filteredProjects);
    }, [filteredProjects]);
    
    return stats;
}