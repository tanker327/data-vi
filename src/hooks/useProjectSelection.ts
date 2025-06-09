import { useState } from "react";
import { Project } from "../types/project";

export function useProjectSelection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

    return {
        selectedProject,
        hoveredProject,
        setSelectedProject,
        setHoveredProject,
    };
}