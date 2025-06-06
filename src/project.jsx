import React, { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import {
    OrbitControls,
    Text,
    Html,
    Trail,
    Sparkles,
    Sphere,
} from "@react-three/drei";

// Enhanced project data with more attributes
const generateAdvancedProjectData = () => {
    const organizations = [
        "CORPORATE & INVESTMENT BANKING",
        "ASSET & WEALTH MANAGEMENT",
        "CONSUMER & COMMUNITY BANKING",
        "COMMERCIAL BANK",
    ];
    const ragStatuses = ["RED", "AMBER", "GREEN", "BLUE"];
    const executionStates = [
        "In Progress",
        "On Hold",
        "Planning",
        "Completed",
        "Critical",
    ];
    const regions = ["APAC", "EMEA", "Americas"];
    const priorities = ["High", "Medium", "Low", "Critical"];
    const technologies = [
        "AI/ML",
        "Blockchain",
        "Cloud",
        "Analytics",
        "Security",
        "Mobile",
    ];

    const projects = [];

    // Generate 60+ projects with rich attributes
    for (let i = 1; i <= 75; i++) {
        const startYear = 2020 + Math.floor(Math.random() * 5);
        const duration = 1 + Math.floor(Math.random() * 6);
        const teamSize = 5 + Math.floor(Math.random() * 50);
        const budget2024 = Math.floor(Math.random() * 500000) + 10000;
        const budget2025 = Math.floor(Math.random() * 800000) + 20000;

        projects.push({
            id: i.toString(),
            title:
                i <= 3
                    ? [
                          "Jasveer Test",
                          "Test IP Salil Dev",
                          "Non Financial Benefit Test",
                      ][i - 1]
                    : `${
                          technologies[
                              Math.floor(Math.random() * technologies.length)
                          ]
                      } Project ${i}`,
            rag: ragStatuses[Math.floor(Math.random() * ragStatuses.length)],
            executionState:
                executionStates[
                    Math.floor(Math.random() * executionStates.length)
                ],
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            technology:
                technologies[Math.floor(Math.random() * technologies.length)],
            financials: {
                total2024: budget2024,
                total2025: budget2025,
                budgetVariance: Math.random() * 0.4 - 0.2, // -20% to +20%
                costEfficiency: Math.random() * 100,
            },
            organization:
                organizations[Math.floor(Math.random() * organizations.length)],
            startYear,
            endYear: startYear + duration,
            duration,
            teamSize,
            owner: `Owner ${i}`,
            region: regions[Math.floor(Math.random() * regions.length)],
            riskScore: Math.random() * 100,
            innovation: Math.random() * 100,
            businessImpact: Math.random() * 100,
            complexity: Math.random() * 100,
            dependencies: Math.floor(Math.random() * 8),
            completionPercent: Math.random() * 100,
        });
    }

    return projects;
};

// Particle system for project trails
function ProjectParticles({ position, color, intensity, count = 20 }) {
    const meshRef = useRef();
    const particlesRef = useRef();

    const particles = useMemo(() => {
        const positions = [];
        const colors = [];
        const sizes = [];

        for (let i = 0; i < count; i++) {
            positions.push(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            );
            colors.push(color.r, color.g, color.b);
            sizes.push(Math.random() * 3 + 1);
        }

        return { positions, colors, sizes };
    }, [count, color]);

    useFrame((state) => {
        if (particlesRef.current) {
            const positions = particlesRef.current.attributes.position.array;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                positions[i3 + 1] +=
                    Math.sin(state.clock.elapsedTime + i) * 0.01;
                positions[i3] += Math.cos(state.clock.elapsedTime + i) * 0.005;
            }

            particlesRef.current.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points position={position}>
            <bufferGeometry ref={particlesRef}>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={new Float32Array(particles.positions)}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={new Float32Array(particles.colors)}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={new Float32Array(particles.sizes)}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                transparent
                opacity={intensity}
                vertexColors
                blending={THREE.AdditiveBlending}
                sizeAttenuation={false}
            />
        </points>
    );
}

// Enhanced project sphere with multiple visual layers
function AdvancedProjectSphere({
    project,
    position,
    isSelected,
    onSelect,
    onHover,
}) {
    const coreRef = useRef();
    const ringRef = useRef();
    const outerGlowRef = useRef();
    const orbitRef = useRef();
    const [hovered, setHovered] = useState(false);

    const totalValue =
        project.financials.total2024 + project.financials.total2025;
    const coreSize = Math.max(0.15, Math.min(1.2, Math.log(totalValue) / 8));

    // Multi-dimensional color encoding
    const ragColors = {
        RED: new THREE.Color("#ff2040"),
        AMBER: new THREE.Color("#ffaa00"),
        GREEN: new THREE.Color("#00ff80"),
        BLUE: new THREE.Color("#4080ff"),
        CRITICAL: new THREE.Color("#ff0080"),
    };

    const orgColors = {
        "CORPORATE & INVESTMENT BANKING": new THREE.Color("#ff6b6b"),
        "ASSET & WEALTH MANAGEMENT": new THREE.Color("#4ecdc4"),
        "CONSUMER & COMMUNITY BANKING": new THREE.Color("#45b7d1"),
        "COMMERCIAL BANK": new THREE.Color("#f7b731"),
    };

    const priorityColors = {
        Critical: new THREE.Color("#ff0040"),
        High: new THREE.Color("#ff8000"),
        Medium: new THREE.Color("#40ff80"),
        Low: new THREE.Color("#80c0ff"),
    };

    const coreColor = ragColors[project.rag] || ragColors.RED;
    const ringColor =
        orgColors[project.organization] || new THREE.Color("#888888");
    const priorityColor =
        priorityColors[project.priority] || new THREE.Color("#ffffff");

    useFrame((state) => {
        if (coreRef.current && ringRef.current && outerGlowRef.current) {
            const time = state.clock.elapsedTime;

            // Core rotation based on completion
            coreRef.current.rotation.y =
                time * (project.completionPercent / 100) * 0.5;
            coreRef.current.rotation.x = Math.sin(time) * 0.1;

            // Ring rotation based on execution state
            const ringSpeed =
                {
                    "In Progress": 0.02,
                    Critical: 0.05,
                    "On Hold": 0.005,
                    Planning: 0.01,
                    Completed: 0.001,
                }[project.executionState] || 0.01;

            ringRef.current.rotation.z += ringSpeed;

            // Pulsing glow based on risk
            const riskPulse = 0.3 + (project.riskScore / 100) * 0.7;
            const glowIntensity = riskPulse + Math.sin(time * 2) * 0.2;
            outerGlowRef.current.material.emissiveIntensity = glowIntensity;

            // Orbit animation for dependencies
            if (orbitRef.current) {
                orbitRef.current.rotation.y = time * 0.3;
            }

            // Scale animation for selection/hover
            const targetScale =
                (isSelected ? 1.4 : 1.0) * (hovered ? 1.3 : 1.0);
            coreRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.1
            );
        }
    });

    return (
        <group position={position}>
            {/* Outer glow sphere */}
            <mesh ref={outerGlowRef}>
                <sphereGeometry args={[coreSize * 2, 16, 16]} />
                <meshStandardMaterial
                    color={coreColor}
                    emissive={coreColor}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Organization ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[coreSize * 1.2, coreSize * 1.5, 32]} />
                <meshStandardMaterial
                    color={ringColor}
                    emissive={ringColor}
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Priority indicator ring */}
            <mesh rotation={[0, 0, Math.PI / 4]}>
                <ringGeometry args={[coreSize * 1.6, coreSize * 1.7, 8]} />
                <meshBasicMaterial
                    color={priorityColor}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Core project sphere */}
            <mesh
                ref={coreRef}
                onClick={() => onSelect(project)}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    onHover(project);
                }}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[coreSize, 32, 32]} />
                <meshStandardMaterial
                    color={coreColor}
                    emissive={coreColor}
                    emissiveIntensity={hovered || isSelected ? 0.5 : 0.2}
                    metalness={0.3}
                    roughness={0.2}
                />
            </mesh>

            {/* Dependency orbits */}
            <group ref={orbitRef}>
                {Array.from({ length: Math.min(project.dependencies, 5) }).map(
                    (_, i) => (
                        <mesh
                            key={i}
                            position={[
                                Math.cos((i * Math.PI * 2) / 5) *
                                    (coreSize * 2.5),
                                0,
                                Math.sin((i * Math.PI * 2) / 5) *
                                    (coreSize * 2.5),
                            ]}
                        >
                            <sphereGeometry args={[0.05, 8, 8]} />
                            <meshBasicMaterial color={priorityColor} />
                        </mesh>
                    )
                )}
            </group>

            {/* Team size indicators */}
            <Sparkles
                count={Math.min(project.teamSize, 30)}
                scale={coreSize * 3}
                size={2}
                speed={0.3}
                color={ringColor}
                opacity={0.6}
            />

            {/* Particle trail for innovation projects */}
            {project.innovation > 70 && (
                <ProjectParticles
                    position={[0, 0, 0]}
                    color={coreColor}
                    intensity={0.6}
                    count={15}
                />
            )}

            {/* Progress bar above project */}
            {(hovered || isSelected) && (
                <group position={[0, coreSize + 0.5, 0]}>
                    <mesh>
                        <boxGeometry args={[1, 0.1, 0.05]} />
                        <meshBasicMaterial color="#333333" />
                    </mesh>
                    <mesh
                        position={[
                            -(1 - project.completionPercent / 100) / 2,
                            0,
                            0.03,
                        ]}
                    >
                        <boxGeometry
                            args={[project.completionPercent / 100, 0.08, 0.03]}
                        />
                        <meshBasicMaterial color={coreColor} />
                    </mesh>
                </group>
            )}

            {/* Enhanced project label */}
            {(hovered || isSelected) && (
                <Html distanceFactor={15} position={[0, coreSize + 1, 0]}>
                    <div className="bg-gradient-to-r from-black via-gray-900 to-black bg-opacity-90 text-white p-3 rounded-lg shadow-xl border border-cyan-500 min-w-64">
                        <div className="font-bold text-lg text-cyan-300 mb-2">
                            {project.title}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span className="text-red-400">RAG:</span>{" "}
                                <span
                                    className={`font-bold ${
                                        project.rag === "RED"
                                            ? "text-red-500"
                                            : project.rag === "AMBER"
                                            ? "text-yellow-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    {project.rag}
                                </span>
                            </div>
                            <div>
                                <span className="text-blue-400">Priority:</span>{" "}
                                <span className="text-white">
                                    {project.priority}
                                </span>
                            </div>
                            <div>
                                <span className="text-purple-400">State:</span>{" "}
                                <span className="text-white">
                                    {project.executionState}
                                </span>
                            </div>
                            <div>
                                <span className="text-green-400">Tech:</span>{" "}
                                <span className="text-white">
                                    {project.technology}
                                </span>
                            </div>
                            <div>
                                <span className="text-yellow-400">Team:</span>{" "}
                                <span className="text-white">
                                    {project.teamSize}
                                </span>
                            </div>
                            <div>
                                <span className="text-cyan-400">Risk:</span>{" "}
                                <span className="text-white">
                                    {project.riskScore.toFixed(0)}%
                                </span>
                            </div>
                            <div>
                                <span className="text-orange-400">Value:</span>{" "}
                                <span className="text-white">
                                    ${totalValue.toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <span className="text-pink-400">Progress:</span>{" "}
                                <span className="text-white">
                                    {project.completionPercent.toFixed(0)}%
                                </span>
                            </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                            Innovation: {project.innovation.toFixed(0)}% |
                            Impact: {project.businessImpact.toFixed(0)}%
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}

// 3D constellation lines connecting related projects
function ProjectConnections({ projects, selectedProject }) {
    const linesRef = useRef();

    const connections = useMemo(() => {
        if (!selectedProject) return [];

        return projects
            .filter(
                (p) =>
                    p.id !== selectedProject.id &&
                    (p.organization === selectedProject.organization ||
                        p.technology === selectedProject.technology ||
                        Math.abs(p.riskScore - selectedProject.riskScore) < 20)
            )
            .slice(0, 8); // Limit connections for performance
    }, [projects, selectedProject]);

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.material.opacity =
                0.3 + Math.sin(state.clock.elapsedTime) * 0.2;
        }
    });

    if (!selectedProject || connections.length === 0) return null;

    return (
        <group>
            {connections.map((project, i) => {
                const startPos = selectedProject.position || [0, 0, 0];
                const endPos = project.position || [
                    Math.random() * 20 - 10,
                    Math.random() * 10 - 5,
                    Math.random() * 20 - 10,
                ];

                const points = [
                    new THREE.Vector3(...startPos),
                    new THREE.Vector3(...endPos),
                ];

                const geometry = new THREE.BufferGeometry().setFromPoints(
                    points
                );

                return (
                    <line key={i} geometry={geometry}>
                        <lineBasicMaterial
                            ref={linesRef}
                            color="#00ffff"
                            transparent
                            opacity={0.3}
                        />
                    </line>
                );
            })}
        </group>
    );
}

// Main advanced scene
function AdvancedProjectUniverse() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [hoveredProject, setHoveredProject] = useState(null);
    const [filters, setFilters] = useState({
        rag: "all",
        organization: "all",
        priority: "all",
        technology: "all",
        execution: "all",
    });

    const projects = useMemo(() => generateAdvancedProjectData(), []);

    // Enhanced filtering
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            return (
                (filters.rag === "all" || project.rag === filters.rag) &&
                (filters.organization === "all" ||
                    project.organization === filters.organization) &&
                (filters.priority === "all" ||
                    project.priority === filters.priority) &&
                (filters.technology === "all" ||
                    project.technology === filters.technology) &&
                (filters.execution === "all" ||
                    project.executionState === filters.execution)
            );
        });
    }, [projects, filters]);

    // 3D positioning algorithm
    const positionedProjects = useMemo(() => {
        return filteredProjects.map((project, index) => {
            // Multi-dimensional positioning
            const orgIndex = [
                "CORPORATE & INVESTMENT BANKING",
                "ASSET & WEALTH MANAGEMENT",
                "CONSUMER & COMMUNITY BANKING",
                "COMMERCIAL BANK",
            ].indexOf(project.organization);
            const totalValue =
                project.financials.total2024 + project.financials.total2025;

            // Create cluster positions based on multiple attributes
            const baseX = (orgIndex - 1.5) * 12;
            const baseY = Math.log(totalValue) / 10 - 2;
            const baseZ = (project.riskScore - 50) / 10;

            // Add some controlled randomness for spread
            const spreadX =
                Math.cos(index * 0.1) * 3 + (project.innovation / 50 - 1) * 2;
            const spreadY = (project.businessImpact / 100 - 0.5) * 4;
            const spreadZ =
                Math.sin(index * 0.15) * 3 + (project.complexity / 50 - 1) * 2;

            const position = [
                baseX + spreadX,
                baseY + spreadY,
                baseZ + spreadZ,
            ];

            return { ...project, position };
        });
    }, [filteredProjects]);

    return (
        <div
            className="w-full bg-black relative overflow-hidden"
            style={{ minHeight: "100vh" }}
        >
            {/* Advanced control panel */}
            <div className="absolute top-4 left-4 z-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 bg-opacity-95 text-white p-4 rounded-xl border border-cyan-500 shadow-2xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3 text-cyan-300">
                    🌌 Project Universe Control
                </h3>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <label className="block text-cyan-400 mb-1">
                            RAG Status:
                        </label>
                        <select
                            value={filters.rag}
                            onChange={(e) =>
                                setFilters({ ...filters, rag: e.target.value })
                            }
                            className="w-full bg-gray-800 text-white p-1 rounded border border-gray-600"
                        >
                            <option value="all">All</option>
                            <option value="RED">🔴 RED</option>
                            <option value="AMBER">🟡 AMBER</option>
                            <option value="GREEN">🟢 GREEN</option>
                            <option value="BLUE">🔵 BLUE</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-purple-400 mb-1">
                            Priority:
                        </label>
                        <select
                            value={filters.priority}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    priority: e.target.value,
                                })
                            }
                            className="w-full bg-gray-800 text-white p-1 rounded border border-gray-600"
                        >
                            <option value="all">All</option>
                            <option value="Critical">🚨 Critical</option>
                            <option value="High">⚡ High</option>
                            <option value="Medium">⚖️ Medium</option>
                            <option value="Low">📋 Low</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-green-400 mb-1">
                            Technology:
                        </label>
                        <select
                            value={filters.technology}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    technology: e.target.value,
                                })
                            }
                            className="w-full bg-gray-800 text-white p-1 rounded border border-gray-600"
                        >
                            <option value="all">All</option>
                            <option value="AI/ML">🤖 AI/ML</option>
                            <option value="Blockchain">⛓️ Blockchain</option>
                            <option value="Cloud">☁️ Cloud</option>
                            <option value="Analytics">📊 Analytics</option>
                            <option value="Security">🔒 Security</option>
                            <option value="Mobile">📱 Mobile</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-yellow-400 mb-1">
                            Execution:
                        </label>
                        <select
                            value={filters.execution}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    execution: e.target.value,
                                })
                            }
                            className="w-full bg-gray-800 text-white p-1 rounded border border-gray-600"
                        >
                            <option value="all">All</option>
                            <option value="In Progress">🚀 In Progress</option>
                            <option value="Critical">🔥 Critical</option>
                            <option value="On Hold">⏸️ On Hold</option>
                            <option value="Planning">📋 Planning</option>
                            <option value="Completed">✅ Completed</option>
                        </select>
                    </div>
                </div>

                <div className="mt-3 text-xs text-gray-400">
                    <div className="font-bold text-white mb-1">
                        Visual Legend:
                    </div>
                    <div>🔴 Core Color = RAG Status</div>
                    <div>🟣 Ring Color = Organization</div>
                    <div>✨ Sparkles = Team Size</div>
                    <div>🌟 Particles = Innovation Level</div>
                    <div>📊 Progress Bar = Completion</div>
                    <div>🔗 Lines = Related Projects</div>
                </div>
            </div>

            {/* Enhanced stats panel */}
            <div className="absolute top-4 right-4 z-10 bg-gradient-to-bl from-gray-900 via-black to-gray-800 bg-opacity-95 text-white p-4 rounded-xl border border-purple-500 shadow-2xl backdrop-blur-sm">
                <h4 className="font-bold text-lg mb-2 text-purple-300">
                    📊 Portfolio Stats
                </h4>
                <div className="space-y-1 text-sm">
                    <div>
                        <span className="text-cyan-400">Total Projects:</span>{" "}
                        <span className="font-bold">
                            {filteredProjects.length}
                        </span>
                    </div>
                    <div>
                        <span className="text-green-400">Total Value:</span>{" "}
                        <span className="font-bold">
                            $
                            {filteredProjects
                                .reduce(
                                    (sum, p) =>
                                        sum +
                                        p.financials.total2024 +
                                        p.financials.total2025,
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </div>
                    <div>
                        <span className="text-yellow-400">Avg Team Size:</span>{" "}
                        <span className="font-bold">
                            {(
                                filteredProjects.reduce(
                                    (sum, p) => sum + p.teamSize,
                                    0
                                ) / filteredProjects.length
                            ).toFixed(1)}
                        </span>
                    </div>
                    <div>
                        <span className="text-red-400">High Risk:</span>{" "}
                        <span className="font-bold">
                            {
                                filteredProjects.filter((p) => p.riskScore > 70)
                                    .length
                            }
                        </span>
                    </div>
                    <div>
                        <span className="text-purple-400">Innovation:</span>{" "}
                        <span className="font-bold">
                            {
                                filteredProjects.filter(
                                    (p) => p.innovation > 70
                                ).length
                            }
                        </span>
                    </div>
                </div>
            </div>

            <Canvas
                camera={{ position: [0, 5, 20], fov: 75 }}
                style={{ width: "100vw", height: "100vh", display: "block" }}
            >
                {/* Enhanced lighting setup */}
                <ambientLight intensity={0.2} />
                <pointLight
                    position={[10, 10, 10]}
                    intensity={1}
                    color="#ffffff"
                />
                <pointLight
                    position={[-10, -10, -10]}
                    intensity={0.8}
                    color="#4080ff"
                />
                <pointLight
                    position={[0, 20, 0]}
                    intensity={0.6}
                    color="#ff8040"
                />
                <spotLight
                    position={[0, 0, 30]}
                    intensity={0.5}
                    color="#80ff40"
                />

                {/* Render all projects */}
                {positionedProjects.map((project) => (
                    <AdvancedProjectSphere
                        key={project.id}
                        project={project}
                        position={project.position}
                        isSelected={selectedProject?.id === project.id}
                        onSelect={setSelectedProject}
                        onHover={setHoveredProject}
                    />
                ))}

                {/* Project connections */}
                <ProjectConnections
                    projects={positionedProjects}
                    selectedProject={selectedProject}
                />

                {/* Starfield background */}
                <Sparkles
                    count={200}
                    scale={50}
                    size={1}
                    speed={0.1}
                    color="#ffffff"
                    opacity={0.8}
                />

                {/* Enhanced camera controls */}
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    maxDistance={100}
                    minDistance={3}
                    autoRotate={false}
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* Dynamic stats overlay */}
            <div className="absolute bottom-4 left-4 z-10 bg-gradient-to-tr from-gray-900 via-black to-gray-800 bg-opacity-95 text-white p-3 rounded-xl border border-green-500 shadow-2xl backdrop-blur-sm text-xs">
                <div className="font-bold mb-2 text-green-300">
                    🎮 Interactive Legend
                </div>
                <div className="space-y-1">
                    <div>
                        <span className="text-cyan-400">🎯 Click:</span> Select
                        project for connections
                    </div>
                    <div>
                        <span className="text-purple-400">🖱️ Hover:</span> View
                        detailed information
                    </div>
                    <div>
                        <span className="text-yellow-400">🔄 Drag:</span> Rotate
                        universe view
                    </div>
                    <div>
                        <span className="text-green-400">🔍 Scroll:</span> Zoom
                        in/out
                    </div>
                    <div>
                        <span className="text-red-400">⚡ Animation:</span> Live
                        data updates
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdvancedProjectUniverse;
