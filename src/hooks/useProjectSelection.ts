import { useState } from "react";
import { Project } from "../types/project.js";

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