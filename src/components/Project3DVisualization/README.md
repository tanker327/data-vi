# Project3DVisualization Super Component

A self-contained React component for 3D project portfolio visualization using Three.js and React Three Fiber.

## Features

- 📊 Interactive 3D project visualization
- 🎛️ Real-time filtering controls (RAG status, execution state, organization, benefits level)
- 📈 Portfolio statistics panel
- 🎯 Project selection and hover interactions
- 🌈 Color-coded project states and statuses
- 📐 3D coordinate system with labeled axes
- 🔍 Detailed project information tooltips

## Dependencies

This component requires the following peer dependencies:

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@react-three/fiber": "^8.0.0",
  "@react-three/drei": "^9.0.0",
  "three": "^0.150.0"
}
```

## Installation

Copy the entire `Project3DVisualization` folder to your project's components directory.

## Styling

This component uses CSS Modules for styling and does not require any external CSS frameworks. All styles are self-contained within `.module.css` files.

## Usage

```tsx
import { Project3DVisualization } from './components/Project3DVisualization';

// Your project data
const projects = [
  {
    id: "1",
    title: "Sample Project",
    rag: "GREEN",
    executionState: "In Progress",
    // ... other project properties
  }
];

function App() {
  return (
    <div>
      <Project3DVisualization projects={projects} />
    </div>
  );
}
```

## Project Data Structure

Each project should conform to the `Project` interface:

```typescript
interface Project {
  id: string;
  title: string;
  rag: 'RED' | 'AMBER' | 'GREEN' | 'BLUE' | null;
  executionState: 'In Progress' | 'On Hold' | 'Planning' | 'Completed' | null;
  financials: {
    live2024?: number;
    outlook2024?: number;
    budget2024?: number;
    live2025?: number;
    outlook2025?: number;
  };
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  owner: string;
  sponsor?: string;
  l1OwningOrganization?: string;
  benefitsReportingLevel: 'BC' | 'IP';
  inPlan: 'Yes' | 'No';
  openForTimeEntry: 'Yes' | 'No';
  // ... see types/project.ts for complete interface
}
```

## 3D Coordinate Mapping

- **X-axis**: Project timeline (start date → decimal years)
- **Y-axis**: Total financials (logarithmic scale)
- **Z-axis**: Organization clustering
- **Cube size**: Project budget
- **Cube color**: Execution state
- **Edge color**: RAG status

## Customization

The component exports various utilities and hooks that can be used for customization:

- `useProjectFilters` - Filter state management
- `useProjectSelection` - Selection state management
- `calculateProjectPosition` - 3D positioning logic
- Color constants from `constants/colors`

## File Structure

```
Project3DVisualization/
├── README.md
├── index.ts                    # Main exports
├── Project3DVisualization.tsx  # Main component
├── components/
│   ├── 3d/
│   │   ├── CoordinateSystem.tsx
│   │   └── ProjectCube.tsx
│   └── ui/
│       ├── ControlPanel.tsx
│       ├── StatsPanel.tsx
│       └── Legend.tsx
├── hooks/
│   ├── useProjectData.ts
│   ├── useProjectFilters.ts
│   └── useProjectSelection.ts
├── utils/
│   ├── coordinateUtils.ts
│   └── filterUtils.ts
├── types/
│   └── project.ts
├── constants/
│   └── colors.ts
└── data/
    └── projectData.ts
```

## License

This component is part of the data visualization project and follows the same license terms.