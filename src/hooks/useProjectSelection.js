import { useState } from "react";

export function useProjectSelection() {
    const [selectedProject, setSelectedProject] = useState(null);

    return {
        selectedProject,
        setSelectedProject,
    };
}