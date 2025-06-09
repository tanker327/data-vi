// Main export for the Project3DVisualization super component
export { default as Project3DVisualization } from './Project3DVisualization';
export { default } from './Project3DVisualization';

// Export all types that might be needed by consuming applications
export type { 
    Project, 
    ProjectFilters, 
    PositionedProject, 
    PortfolioStats,
    ProjectFinancials 
} from './types/project';

// Export hooks that might be useful for external customization
export { 
    useProjectData,
    useFilteredProjects, 
    usePositionedProjects, 
    usePortfolioStats 
} from './hooks/useProjectData';

export { useProjectSelection } from './hooks/useProjectSelection';
export { useProjectFilters } from './hooks/useProjectFilters';

// Export utility functions that might be useful
export { 
    calculateTotalFinancials,
    calculateProjectPosition,
    calculateCubeSize,
    calculateProjectDuration,
    convertCoordinateToDateLabel,
    convertCoordinateToFinancialLabel,
    convertCoordinateToOrgLabel
} from './utils/coordinateUtils';

export { filterProjects, calculatePortfolioStats } from './utils/filterUtils';

// Export data generation function
export { generateProjectData } from './data/projectData';

// Export constants that might be needed for customization
export { 
    RAG_COLORS, 
    EXECUTION_COLORS, 
    UI_COLORS, 
    GRID_COLORS 
} from './constants/colors';