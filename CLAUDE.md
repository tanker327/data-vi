# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based 3D data visualization application that creates an interactive 3D project portfolio universe. The main component visualizes project data as cubes in a 3D coordinate system using React Three Fiber and Three.js.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint code quality checks
- `npm run preview` - Preview production build locally

## Modular Architecture

The codebase has been refactored into a well-organized modular structure:

### Tech Stack
- **Frontend Framework**: React 19 with Vite build tool
- **3D Graphics**: Three.js via @react-three/fiber and @react-three/drei
- **Styling**: Tailwind CSS with glassmorphism effects

### Directory Structure
```
src/
├── components/
│   ├── 3d/
│   │   ├── CoordinateSystem.jsx    # 3D grid and axis system
│   │   └── ProjectCube.jsx         # Individual project visualization
│   ├── ui/
│   │   ├── ControlPanel.jsx        # Collapsible filter controls
│   │   ├── StatsPanel.jsx          # Portfolio statistics
│   │   └── Legend.jsx              # Control instructions
│   └── Project3DVisualization.jsx  # Main orchestrator component
├── hooks/
│   ├── useProjectData.js           # Data processing and memoization
│   ├── useProjectSelection.js      # Selection state management
│   └── useProjectFilters.js        # Filter state management
├── utils/
│   ├── coordinateUtils.js          # 3D positioning calculations
│   └── filterUtils.js              # Project filtering logic
├── data/
│   └── projectData.js              # Project data generation
└── constants/
    └── colors.js                   # Color mappings
```

### Data Flow Architecture
1. **Data Layer**: `projectData.js` generates sample project data with real financial attributes
2. **Processing Layer**: Custom hooks (`useProjectData`, `useFilteredProjects`, `usePositionedProjects`) handle data transformation and memoization
3. **State Management**: Separate hooks for filters and selection state with clean separation of concerns
4. **Utility Layer**: Coordinate calculations and filtering logic extracted into pure functions
5. **Component Layer**: Modular 3D and UI components with clear prop interfaces

### 3D Coordinate Mapping
- **X-axis**: Project timeline (start date converted to decimal years)
- **Y-axis**: Total financials (logarithmic scale)
- **Z-axis**: Sponsor organization clustering
- **Cube size**: Represents project budget
- **Cube color**: Execution state (In Progress=green, On Hold=red, etc.)
- **Edge color**: RAG status (RED, AMBER, GREEN)

### UI Design Patterns
- **Glassmorphism**: Control panel uses backdrop-blur and transparency
- **Collapsible Interface**: Control panel expands/collapses to save screen space
- **Color-coded Icons**: Each filter has distinctive icons and color themes
- **Responsive Grid**: 2x2 layout for compact filter controls

## Code Conventions

- Use functional React components with hooks
- Extract complex logic into custom hooks for reusability
- Use useMemo for expensive calculations (project positioning, filtering)
- Implement useFrame for Three.js animations
- Separate concerns: data, state, utilities, and UI components
- Prefer explicit prop interfaces over prop drilling
- Use constants for color mappings and configuration