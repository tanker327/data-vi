import { useState } from "react";

export function useProjectSelection() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [hoveredProject, setHoveredProject] = useState(null);
    
    return {
        selectedProject,
        hoveredProject,
        setSelectedProject,
        setHoveredProject,
    };
}