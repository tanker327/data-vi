import { useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "./Project3DVisualization.module.css";

import CoordinateSystem from "./components/3d/CoordinateSystem";
import ProjectCube from "./components/3d/ProjectCube";
import ControlPanel from "./components/ui/ControlPanel";
import StatsPanel from "./components/ui/StatsPanel";
import Legend from "./components/ui/Legend";

import { useFilteredProjects, usePositionedProjects, usePortfolioStats, useCoordinateRanges } from "./hooks/useProjectData";
import { useProjectSelection } from "./hooks/useProjectSelection";
import { useProjectFilters } from "./hooks/useProjectFilters";
import { Project } from "./types/project";

interface Project3DVisualizationProps {
    projects: Project[];
}

export default function Project3DVisualization({ projects }: Project3DVisualizationProps) {
    const { filters, setFilters } = useProjectFilters();
    const { selectedProject, setSelectedProject, setHoveredProject } = useProjectSelection();

    const filteredProjects = useFilteredProjects(projects, filters);
    const positionedProjects = usePositionedProjects(filteredProjects);
    const stats = usePortfolioStats(filteredProjects);
    const coordinateRanges = useCoordinateRanges(filteredProjects);

    // Memoize callbacks to prevent unnecessary re-renders
    const handleProjectSelect = useCallback((project: any) => {
        setSelectedProject(project);
    }, [setSelectedProject]);

    const handleProjectHover = useCallback((project: any) => {
        setHoveredProject(project);
    }, [setHoveredProject]);

    const handleBackgroundClick = useCallback(() => {
        setSelectedProject(null);
    }, [setSelectedProject]);

    return (
        <div className={styles.container}>
            <ControlPanel filters={filters} onFiltersChange={setFilters} />
            <StatsPanel stats={stats} />

            <Canvas
                camera={{ position: [15, 10, 15], fov: 80 }}
                style={{ width: "100%", height: "100%" }}
                onPointerMissed={handleBackgroundClick}
            >
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight
                    position={[-10, -10, -10]}
                    intensity={0.8}
                    color="#4080ff"
                />
                <directionalLight position={[0, 20, 0]} intensity={0.6} />

                {/* 3D Coordinate System */}
                <CoordinateSystem range={coordinateRanges.overall} ranges={coordinateRanges} />

                {/* Render all project cubes */}
                {positionedProjects.map((project) => (
                    <ProjectCube
                        key={project.id}
                        project={project}
                        position={project.position}
                        isSelected={selectedProject?.id === project.id}
                        onSelect={handleProjectSelect}
                        onHover={handleProjectHover}
                    />
                ))}

                {/* Camera controls */}
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    maxDistance={50}
                    minDistance={5}
                />
            </Canvas>

            <Legend />
        </div>
    );
}