import { useMemo } from "react";
import { generateProjectData } from "../data/projectData.js";
import { filterProjects, calculatePortfolioStats } from "../utils/filterUtils.js";
import { calculateProjectPosition } from "../utils/coordinateUtils.js";

export function useProjectData() {
    // Remove caching to see changes immediately during development
    const projects = generateProjectData();

    return projects;
}

export function useFilteredProjects(projects, filters) {
    const filteredProjects = useMemo(() => {
        return filterProjects(projects, filters);
    }, [projects, filters]);
    
    return filteredProjects;
}

export function usePositionedProjects(filteredProjects) {
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

export function usePortfolioStats(filteredProjects) {
    const stats = useMemo(() => {
        return calculatePortfolioStats(filteredProjects);
    }, [filteredProjects]);
    
    return stats;
}