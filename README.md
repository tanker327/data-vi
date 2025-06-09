# 3D Project Portfolio Visualization

An interactive 3D data visualization application built with React, Three.js, and React Three Fiber that displays project portfolios in an immersive 3D environment.

## Features

- 📊 **Interactive 3D Visualization**: Projects displayed as cubes in 3D space
- 🎛️ **Real-time Filtering**: Filter by RAG status, execution state, organization, and benefits level
- 📈 **Portfolio Statistics**: Live statistics panel showing project metrics
- 🎯 **Interactive Selection**: Click on cubes to view detailed project information
- 🌈 **Color-coded States**: Visual representation of project status and health
- 📐 **3D Coordinate System**: Labeled axes showing timeline, financials, and organization
- 🔍 **Responsive Controls**: Zoom, pan, and rotate the 3D view

## 3D Coordinate Mapping

- **X-axis**: Project timeline (start date → decimal years)
- **Y-axis**: Total financials (logarithmic scale)
- **Z-axis**: Organization clustering
- **Cube size**: Represents project budget
- **Cube color**: Execution state (In Progress=green, On Hold=red, etc.)
- **Edge color**: RAG status (RED, AMBER, GREEN, BLUE)

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling and development
- **Three.js** via React Three Fiber for 3D graphics
- **CSS Modules** for styling (no external CSS frameworks)
- **React Three Drei** for additional 3D utilities

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd data-vi
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint code quality checks
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/
│   └── Project3DVisualization/     # Self-contained super component
│       ├── components/
│       │   ├── 3d/                 # 3D visualization components
│       │   └── ui/                 # UI control panels
│       ├── hooks/                  # Custom React hooks
│       ├── utils/                  # Utility functions
│       ├── types/                  # TypeScript type definitions
│       ├── constants/              # Color mappings and constants
│       └── data/                   # Sample data generation
├── App.tsx                         # Main application component
└── main.tsx                        # Application entry point
```

## Super Component

The `Project3DVisualization` component is designed as a self-contained super component that can be easily copied to other React projects. It includes:

- All necessary dependencies and utilities
- CSS Modules for styling (no external CSS frameworks required)
- Complete TypeScript type definitions
- Comprehensive documentation

See `src/components/Project3DVisualization/README.md` for detailed component documentation.

## Interactions

- **🖱️ Click on cube**: Select and view detailed project information
- **🖱️ Click empty space**: Deselect and hide project details
- **🔄 Drag**: Rotate the 3D view
- **🔍 Scroll**: Zoom in/out
- **📦 Rotating cubes**: Indicate "In Progress" projects
- **💛 Yellow indicators**: BC Benefits Level projects
- **🔵 Cyan indicators**: In Plan projects

## Data Structure

Projects follow a comprehensive data structure including:
- Financial information (budgets, live costs for 2024/2025)
- Project metadata (title, owner, sponsor, dates)
- Status indicators (RAG, execution state, benefits level)
- Organizational hierarchy
- Planning and reporting flags

## License

This project is licensed under the MIT License.