import { useState } from "react";
import { ProjectFilters } from "../types/project";

const DEFAULT_FILTERS: ProjectFilters = {
    rag: "all",
    executionState: "all",
    organization: "all",
    benefitsLevel: "all",
    inPlan: "all",
};

export function useProjectFilters() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    
    const resetFilters = () => setFilters(DEFAULT_FILTERS);
    
    return {
        filters,
        setFilters,
        resetFilters,
    };
}