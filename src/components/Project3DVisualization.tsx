import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import CoordinateSystem from "./3d/CoordinateSystem.js";
import ProjectCube from "./3d/ProjectCube.js";
import ControlPanel from "./ui/ControlPanel.js";
import StatsPanel from "./ui/StatsPanel.js";
import Legend from "./ui/Legend.js";

import { useProjectData, useFilteredProjects, usePositionedProjects, usePortfolioStats } from "../hooks/useProjectData.js";
import { useProjectSelection } from "../hooks/useProjectSelection.js";
import { useProjectFilters } from "../hooks/useProjectFilters.js";

export default function Project3DVisualization() {
    const { filters, setFilters } = useProjectFilters();
    const { selectedProject, setSelectedProject, setHoveredProject } = useProjectSelection();

    const projects = useProjectData();
    const filteredProjects = useFilteredProjects(projects, filters);
    const positionedProjects = usePositionedProjects(filteredProjects);
    const stats = usePortfolioStats(filteredProjects);

    return (
        <div className="w-full h-screen bg-gray-900 relative">
            <ControlPanel filters={filters} onFiltersChange={setFilters} />
            <StatsPanel stats={stats} />

            <Canvas
                camera={{ position: [15, 10, 15], fov: 60 }}
                style={{ width: "100%", height: "600px" }}
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
                <CoordinateSystem range={10} />

                {/* Render all project cubes */}
                {positionedProjects.map((project) => (
                    <ProjectCube
                        key={project.id}
                        project={project}
                        position={project.position}
                        isSelected={selectedProject?.id === project.id}
                        onSelect={setSelectedProject}
                        onHover={setHoveredProject}
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