import { useRef, useState, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Mesh } from "three";
import { Project } from "../../types/project.js";
import { RAG_COLORS, EXECUTION_COLORS, UI_COLORS } from "../../constants/colors.js";
import { calculateCubeSize, calculateProjectDuration } from "../../utils/coordinateUtils.js";

interface ProjectCubeProps {
    project: Project;
    position: [number, number, number];
    isSelected: boolean;
    onSelect: (project: Project) => void;
    onHover: (project: Project) => void;
}

const ProjectCube = memo(function ProjectCube({
    project,
    position,
    isSelected,
    onSelect,
    onHover,
}: ProjectCubeProps) {
    const cubeRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);

    const cubeSize = calculateCubeSize(project);
    const coreColor = (project.executionState && EXECUTION_COLORS[project.executionState]) || "#888888";
    const edgeColor = (project.rag && RAG_COLORS[project.rag]) || "#666666";
    const duration = calculateProjectDuration(project);
    const totalBudget = project.financials.budget2024 || 0;

    useFrame((state) => {
        if (cubeRef.current) {
            const time = state.clock.elapsedTime;

            // Rotation based on execution state
            if (project.executionState === "In Progress") {
                cubeRef.current.rotation.y += 0.01;
                cubeRef.current.rotation.x += 0.005;
            } else if (project.executionState === "On Hold") {
                cubeRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
            }

            // Scale for selection/hover
            const targetScale =
                (isSelected ? 1.3 : 1.0) * (hovered ? 1.2 : 1.0);
            cubeRef.current.scale.setScalar(targetScale);
        }
    });

    return (
        <group position={position}>
            {/* Main project cube */}
            <mesh
                ref={cubeRef}
                onClick={() => onSelect(project)}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    onHover(project);
                }}
                onPointerOut={() => setHovered(false)}
            >
                <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
                <meshStandardMaterial
                    color={coreColor}
                    emissive={coreColor}
                    emissiveIntensity={hovered || isSelected ? 0.4 : 0.1}
                    metalness={0.3}
                    roughness={0.2}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Edge highlight for execution state */}
            <mesh>
                <boxGeometry
                    args={[cubeSize * 1.05, cubeSize * 1.05, cubeSize * 1.05]}
                />
                <meshBasicMaterial
                    color={edgeColor}
                    transparent
                    opacity={0.3}
                    wireframe
                />
            </mesh>

            {/* Benefits reporting level indicator */}
            {project.benefitsReportingLevel === "BC" && (
                <mesh position={[0, cubeSize * 0.7, 0]}>
                    <boxGeometry args={[0.2, 0.2, 0.2]} />
                    <meshBasicMaterial color={UI_COLORS.BENEFITS_INDICATOR} />
                </mesh>
            )}

            {/* In-plan indicator */}
            {project.inPlan === "Yes" && (
                <mesh position={[cubeSize * 0.7, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.3]} />
                    <meshBasicMaterial color={UI_COLORS.IN_PLAN_INDICATOR} />
                </mesh>
            )}

            {/* Project information on hover/select */}
            {(hovered || isSelected) && (
                <Html distanceFactor={15} position={[0, cubeSize + 1, 0]}>
                    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white rounded-xl shadow-2xl border border-cyan-400/40 backdrop-blur-lg p-0 overflow-hidden min-w-80 max-w-96">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-4 border-b border-gray-700/50">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-bold text-base text-cyan-300 leading-tight mb-1">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="bg-gray-700/50 px-2 py-0.5 rounded text-gray-300">
                                            ID: {project.shortId}
                                        </span>
                                        {project.rag && (
                                            <span className={`px-2 py-0.5 rounded font-medium ${
                                                project.rag === 'RED' ? 'bg-red-500/20 text-red-300' :
                                                project.rag === 'AMBER' ? 'bg-yellow-500/20 text-yellow-300' :
                                                project.rag === 'GREEN' ? 'bg-green-500/20 text-green-300' :
                                                'bg-blue-500/20 text-blue-300'
                                            }`}>
                                                {project.rag}
                                            </span>
                                        )}
                                        {project.executionState && (
                                            <span className={`px-2 py-0.5 rounded font-medium ${
                                                project.executionState === 'In Progress' ? 'bg-green-500/20 text-green-300' :
                                                project.executionState === 'On Hold' ? 'bg-red-500/20 text-red-300' :
                                                project.executionState === 'Planning' ? 'bg-yellow-500/20 text-yellow-300' :
                                                'bg-blue-500/20 text-blue-300'
                                            }`}>
                                                {project.executionState}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Sections */}
                        <div className="p-4 space-y-4">
                            {/* Key Info Grid */}
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="bg-gray-800/30 rounded-lg p-2">
                                    <div className="text-gray-400 mb-1">Owner</div>
                                    <div className="text-white font-medium">{project.owner}</div>
                                </div>
                                <div className="bg-gray-800/30 rounded-lg p-2">
                                    <div className="text-gray-400 mb-1">Sponsor</div>
                                    <div className="text-white font-medium">{project.sponsor || 'N/A'}</div>
                                </div>
                                <div className="bg-gray-800/30 rounded-lg p-2">
                                    <div className="text-gray-400 mb-1">Duration</div>
                                    <div className="text-white font-medium">{duration} years</div>
                                </div>
                                <div className="bg-gray-800/30 rounded-lg p-2">
                                    <div className="text-gray-400 mb-1">Benefits</div>
                                    <div className="text-white font-medium">{project.benefitsReportingLevel}</div>
                                </div>
                            </div>

                            {/* Financial Information */}
                            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-3 border border-green-500/20">
                                <div className="text-green-300 font-medium mb-2 text-sm flex items-center gap-1">
                                    💰 Financial Overview
                                </div>
                                <div className="grid grid-cols-1 gap-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">2024 Live:</span>
                                        <span className="text-green-300 font-mono">
                                            ${(project.financials.live2024 || 0).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">2025 Live:</span>
                                        <span className="text-blue-300 font-mono">
                                            ${(project.financials.live2025 || 0).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-600/30 pt-2">
                                        <span className="text-gray-300 font-medium">Total Budget:</span>
                                        <span className="text-cyan-300 font-mono font-bold">
                                            ${totalBudget.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Organization Info */}
                            {project.l1OwningOrganization && (
                                <div className="bg-gray-800/20 rounded-lg p-2 border-l-2 border-blue-400/50">
                                    <div className="text-gray-400 text-xs mb-1">Organization</div>
                                    <div className="text-blue-300 text-xs font-medium">
                                        {project.l1OwningOrganization}
                                    </div>
                                </div>
                            )}

                            {/* Status Indicators */}
                            <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-700/50">
                                <div className="flex items-center gap-2">
                                    {project.inPlan === 'Yes' && (
                                        <span className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-xs">
                                            📋 In Plan
                                        </span>
                                    )}
                                    {project.openForTimeEntry === 'Yes' && (
                                        <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                                            ⏰ Time Entry Open
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
});

export default ProjectCube;