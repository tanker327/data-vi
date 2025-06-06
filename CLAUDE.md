# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based 3D data visualization application that creates an interactive 3D project portfolio universe. The main component visualizes project data as cubes in a 3D coordinate system using React Three Fiber and Three.js.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint code quality checks
- `npm run preview` - Preview production build locally

## Core Architecture

### Tech Stack
- **Frontend Framework**: React 19 with Vite build tool
- **3D Graphics**: Three.js via @react-three/fiber and @react-three/drei
- **Styling**: CSS-in-JS with inline styles and CSS classes

### Key Components
- `App.jsx` - Root component that renders the main visualization
- `project.jsx` - Contains the main `AdvancedProjectUniverse` component with:
  - `CoordinateSystem` - 3D grid and axis labels
  - `ProjectCube` - Individual project visualization as animated cubes
  - `Project3DVisualization` - Main container with controls and canvas

### Data Structure
Projects are visualized using real financial and organizational data with attributes:
- Financial data (live2024, outlook2024, live2025, outlook2025, budget2024)
- Project metadata (title, RAG status, execution state, owner, sponsor)
- Organizational info (L1/L2/L3 owning organizations, sponsor organizations)
- Timeline data (start/end dates)

### 3D Coordinate Mapping
- **X-axis**: Project timeline (start date converted to decimal years)
- **Y-axis**: Total financials (logarithmic scale)
- **Z-axis**: Sponsor organization clustering
- **Cube size**: Represents project budget
- **Cube color**: Execution state (In Progress=green, On Hold=red, etc.)
- **Edge color**: RAG status (RED, AMBER, GREEN)

### Interaction Features
- Click cubes to select and view detailed project information
- Hover for quick project overview
- OrbitControls for 3D navigation (rotate, zoom, pan)
- Real-time filtering by RAG, execution state, organization, benefits level
- Live statistics panel showing portfolio metrics

## Code Conventions

- Use functional React components with hooks
- Prefer inline styles for 3D positioning and dynamic styling
- Use useMemo for expensive calculations (project positioning, filtering)
- Implement useFrame for Three.js animations
- Follow the existing pattern of separating concerns (data generation, visualization, controls)