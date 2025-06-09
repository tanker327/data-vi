# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based 3D data visualization application that creates an interactive 3D project portfolio universe. The main component visualizes project data as cubes in a 3D coordinate system using React Three Fiber and Three.js. The project has been restructured into a self-contained super component architecture.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint code quality checks
- `npm run preview` - Preview production build locally

## Super Component Architecture

The codebase has been refactored into a self-contained super component that can be easily copied to other projects:

### Tech Stack
- **Frontend Framework**: React 18 with TypeScript and Vite build tool
- **3D Graphics**: Three.js via @react-three/fiber and @react-three/drei
- **Styling**: CSS Modules (no external CSS frameworks)
- **Type Safety**: Full TypeScript implementation

### Directory Structure
```
src/
├── components/
│   └── Project3DVisualization/          # Self-contained super component
│       ├── Project3DVisualization.tsx   # Main orchestrator component
│       ├── Project3DVisualization.module.css
│       ├── index.ts                     # Barrel exports
│       ├── README.md                    # Component documentation
│       ├── components/
│       │   ├── 3d/
│       │   │   ├── CoordinateSystem.tsx    # 3D grid and axis system
│       │   │   ├── ProjectCube.tsx         # Individual project visualization
│       │   │   └── ProjectCube.module.css
│       │   └── ui/
│       │       ├── ControlPanel.tsx        # Filter controls
│       │       ├── ControlPanel.module.css
│       │       ├── StatsPanel.tsx          # Portfolio statistics
│       │       ├── StatsPanel.module.css
│       │       ├── Legend.tsx              # Control instructions
│       │       └── Legend.module.css
│       ├── hooks/
│       │   ├── useProjectData.ts           # Data processing and memoization
│       │   ├── useProjectSelection.ts      # Selection state management
│       │   └── useProjectFilters.ts        # Filter state management
│       ├── utils/
│       │   ├── coordinateUtils.ts          # 3D positioning calculations
│       │   └── filterUtils.ts              # Project filtering logic
│       ├── types/
│       │   └── project.ts                  # TypeScript type definitions
│       ├── constants/
│       │   └── colors.ts                   # Color mappings
│       └── data/
│           └── projectData.ts              # Project data generation
├── App.tsx                              # Main application entry
└── main.tsx                             # React DOM entry point
```

### Data Flow Architecture
1. **Data Layer**: `projectData.ts` generates sample project data with exponentially distributed financial ranges (5 tiers from 1K to 500M) for diverse Y-axis visualization
2. **Processing Layer**: Custom hooks (`useProjectData`, `useFilteredProjects`, `usePositionedProjects`) handle data transformation and memoization
3. **State Management**: Separate hooks for filters and selection state with clean separation of concerns
4. **Utility Layer**: Coordinate calculations and filtering logic extracted into pure functions
5. **Component Layer**: Modular 3D and UI components with clear prop interfaces
6. **Styling Layer**: CSS Modules for scoped, maintainable styles

### 3D Coordinate Mapping
- **X-axis**: Project timeline (start date converted to decimal years)
- **Y-axis**: Total financials (logarithmic scale)
- **Z-axis**: Sponsor organization clustering
- **Cube size**: Represents project budget
- **Cube color**: Execution state (In Progress=green, On Hold=red, etc.)
- **Edge color**: RAG status (RED, AMBER, GREEN, BLUE)

### UI Design Patterns
- **CSS Modules**: Scoped styling with hashed class names
- **Glassmorphism Effects**: Backdrop blur and transparency via CSS
- **Color-coded Components**: Each UI element has distinctive color themes
- **Responsive Positioning**: Absolute positioning for overlay panels
- **Interactive States**: Hover and selection states with visual feedback

### Interaction Model
- **Click-to-Select**: Click on cubes to view detailed project information
- **Click-to-Dismiss**: Click on empty space to hide project details
- **Hover Effects**: Visual feedback on cube hover (scaling, glow)
- **3D Navigation**: Drag to rotate, scroll to zoom, full 3D camera controls
- **Real-time Filtering**: Live updates with filter controls

## Code Conventions

- Use functional React components with hooks
- Extract complex logic into custom hooks for reusability
- Use useMemo for expensive calculations (project positioning, filtering)
- Implement useFrame for Three.js animations
- Separate concerns: data, state, utilities, and UI components
- Prefer explicit prop interfaces over prop drilling
- Use CSS Modules for all styling (no external CSS frameworks)
- Use constants for color mappings and configuration
- Implement proper TypeScript types for all data structures
- Use `stopPropagation()` for nested 3D interaction events
- Use `onPointerMissed` for Canvas background click handling

## Super Component Benefits

1. **Self-Contained**: All dependencies and utilities included within the component folder
2. **Portable**: Can be copied to any React project without missing dependencies
3. **Type Safe**: Complete TypeScript implementation with exported types
4. **No External CSS**: Uses CSS Modules, no framework dependencies
5. **Well Documented**: Includes comprehensive README and inline documentation
6. **Modular**: Clear separation of concerns with barrel exports

## Performance Considerations

- Use `memo()` for expensive 3D components
- Implement `useCallback()` for event handlers to prevent re-renders
- Use `useMemo()` for complex calculations and data transformations
- Optimize Three.js materials and geometries
- Implement proper event propagation for nested 3D interactions

## Testing and Validation

- Ensure build passes: `npm run build`
- Verify linting: `npm run lint`
- Test all interactive features (click, hover, filtering)
- Validate 3D performance across different data sizes
- Check responsive behavior on different screen sizes

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.