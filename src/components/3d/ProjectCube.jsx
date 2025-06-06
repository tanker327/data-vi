import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { RAG_COLORS, EXECUTION_COLORS, UI_COLORS } from "../../constants/colors.js";
import { calculateCubeSize, calculateProjectDuration } from "../../utils/coordinateUtils.js";

export default function ProjectCube({
    project,
    position,
    isSelected,
    onSelect,
}) {
    const cubeRef = useRef();
    const [hovered, setHovered] = useState(false);

    const cubeSize = calculateCubeSize(project);
    const coreColor = EXECUTION_COLORS[project.executionState] || "#888888";
    const edgeColor = RAG_COLORS[project.rag] || "#666666";
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
                    <div className="bg-black bg-opacity-90 text-white p-3 rounded-lg shadow-xl border border-cyan-500 min-w-72">
                        <div className="font-bold text-lg text-cyan-300 mb-2">
                            {project.title}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span className="text-red-400">RAG:</span>{" "}
                                <span className="text-white">
                                    {project.rag || "N/A"}
                                </span>
                            </div>
                            <div>
                                <span className="text-blue-400">State:</span>{" "}
                                <span className="text-white">
                                    {project.executionState || "N/A"}
                                </span>
                            </div>
                            <div>
                                <span className="text-green-400">Owner:</span>{" "}
                                <span className="text-white">
                                    {project.owner}
                                </span>
                            </div>
                            <div>
                                <span className="text-purple-400">
                                    Sponsor:
                                </span>{" "}
                                <span className="text-white">
                                    {project.sponsor}
                                </span>
                            </div>
                            <div>
                                <span className="text-yellow-400">
                                    Duration:
                                </span>{" "}
                                <span className="text-white">
                                    {duration} years
                                </span>
                            </div>
                            <div>
                                <span className="text-pink-400">Short ID:</span>{" "}
                                <span className="text-white">
                                    {project.shortId}
                                </span>
                            </div>
                            <div>
                                <span className="text-orange-400">
                                    Benefits Level:
                                </span>{" "}
                                <span className="text-white">
                                    {project.benefitsReportingLevel}
                                </span>
                            </div>
                            <div>
                                <span className="text-cyan-400">In Plan:</span>{" "}
                                <span className="text-white">
                                    {project.inPlan}
                                </span>
                            </div>
                        </div>
                        <div className="mt-2 text-xs">
                            <div>
                                <span className="text-green-400">
                                    2024 Live:
                                </span>{" "}
                                $
                                {(
                                    project.financials.live2024 || 0
                                ).toLocaleString()}
                            </div>
                            <div>
                                <span className="text-blue-400">
                                    2025 Live:
                                </span>{" "}
                                $
                                {(
                                    project.financials.live2025 || 0
                                ).toLocaleString()}
                            </div>
                            <div>
                                <span className="text-purple-400">
                                    Budget 2024:
                                </span>{" "}
                                ${totalBudget.toLocaleString()}
                            </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                            {project.l1OwningOrganization}
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}