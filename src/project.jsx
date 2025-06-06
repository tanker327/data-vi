import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html, Line } from "@react-three/drei";

// Use ONLY original JSON attributes
const generateRealProjectData = () => {
    const realProjects = [
        {
            id: "683dc74015e3794eacb20453",
            title: "Jasveer Test",
            rag: "RED",
            executionState: "On Hold",
            executionOnly: "No",
            openForTimeEntry: "Yes",
            shortId: "066549",
            type: "IP",
            state: "Approved (Edited)",
            benefitsReportingLevel: "BC",
            businessCase: "2404181032 - Varsha-Test-Turing",
            productName: "Archiving | Archiving | ET - CORPORATE TECHNOLOGY",
            financials: {
                live2024: 19884.544058,
                outlook2024: 4250,
                budget2024: 23271,
                live2025: 268,
                outlook2025: 1916.703522,
            },
            startDate: "2022-01-01T00:00:00Z",
            endDate: "2026-12-31T00:00:00Z",
            owner: "Alex Thompson",
            coOwners: "Michael Chen",
            agreementApprovers: "Sarah Rodriguez",
            collaborators: "Emma Wilson | David Martinez",
            cto: "James Anderson",
            sponsor: "Sarah Rodriguez",
            primaryFbm: "David Martinez",
            l1SponsorOrganization: "CORPORATE & INVESTMENT BANKING",
            l2SponsorOrganization: "CIB - GIB & GCB",
            l1OwningOrganization: "CORPORATE & INVESTMENT BANKING",
            l2OwningOrganization: "CIB - MARKETS",
            l3OwningOrganization: "MARKETS OPERATIONS | BUSINESS RESILIENCY",
            inPlan: "Yes",
            labels: "test",
            openCreationDate: "2024-01-19T10:24:39.209Z",
            openCreatorName: "David Martinez",
            overview: "test 123",
            regionalImpact: "APAC (Asia Pacific)",
            lastApprovedDate: "2024-06-24T08:33:11.788Z",
            hasWorkflowReportingInformation: true,
            isCloseable: true,
        },
        {
            id: "683dc76d15e3794eacb20b83",
            title: "Test IP Salil Dev",
            rag: "AMBER",
            executionState: "In Progress",
            executionOnly: "No",
            openForTimeEntry: "Yes",
            shortId: "068813",
            type: "IP",
            state: "Approved (Edited)",
            benefitsReportingLevel: "IP",
            businessCase: "881730373 - ytu",
            productName:
                "J.P. Morgan Wealth Management | WM Servicing | CONSUMER & COMMUNITY BANKING",
            financials: {
                live2024: 1000,
                outlook2024: 200,
                live2025: 2400,
                outlook2025: 1600,
            },
            startDate: "2023-05-01T00:00:00Z",
            endDate: "2029-10-31T00:00:00Z",
            owner: "Robert Johnson",
            agreementApprovers: "Lisa Kim",
            collaborators: "Mark Davis",
            cto: "Jennifer Garcia",
            sponsor: "Kevin Zhang",
            primaryFbm: "Lisa Kim",
            l1SponsorOrganization: "COMMERCIAL BANK",
            l2SponsorOrganization: "CB - ASSET BASED LENDING",
            l1OwningOrganization: "CORPORATE & INVESTMENT BANKING",
            l2OwningOrganization: "CIB - MARKETS",
            l3OwningOrganization:
                "MARKETS OPERATIONS | CPG AND PRINCIPAL COLLATERAL OPERATIONS",
            inPlan: "Yes",
            labels: "testing, development",
            openCreationDate: "2024-03-22T08:18:30.965Z",
            openCreatorName: "Mark Davis",
            overview: "For Dev testing APE events",
            regionalImpact: "APAC (Asia Pacific)",
            lastApprovedDate: "2024-03-22T10:02:26.362Z",
            hasWorkflowReportingInformation: true,
            isCloseable: true,
        },
        {
            id: "683dc97f15e3794eacb22802",
            title: "Non Financial Benefit Test name change test",
            rag: null,
            executionState: null,
            executionOnly: "No",
            openForTimeEntry: "Yes",
            shortId: "069717",
            type: "IP",
            state: "Approved (Edited)",
            benefitsReportingLevel: "IP",
            businessCase: "2503052674 - BC IP Benefit Merge test",
            productName:
                "Payments - Non-Payments | Non-Payments | CORPORATE & INVESTMENT BANKING",
            financials: {
                live2024: 100,
                outlook2024: 100,
                live2025: 802475.698242,
                outlook2025: 722261.804199,
            },
            startDate: "2024-01-01T00:00:00Z",
            endDate: "2025-12-31T00:00:00Z",
            owner: "Amanda Brown",
            agreementApprovers: "Amanda Brown",
            collaborators: "Daniel Lee",
            sponsor: "Amanda Brown",
            primaryFbm: "Daniel Lee",
            l1OwningOrganization: "ASSET & WEALTH MANAGEMENT",
            l2OwningOrganization: "AWM - ASSET MANAGEMENT TECH",
            inPlan: "Yes",
            labels: "none, hello",
            openCreationDate: "2024-06-24T16:07:50.265Z",
            openCreatorName: "Daniel Lee",
            overview: "test",
            regionalImpact: "APAC (Asia Pacific)",
            lastApprovedDate: "2024-08-29T07:50:19.220Z",
            hasWorkflowReportingInformation: true,
            isCloseable: true,
        },
    ];

    // Generate additional sample projects using REAL attributes only
    const additionalProjects = [];
    const ragOptions = ["RED", "AMBER", "GREEN", null];
    const executionOptions = ["In Progress", "On Hold", "Planning", null];
    const orgOptions = [
        "CORPORATE & INVESTMENT BANKING",
        "ASSET & WEALTH MANAGEMENT",
        "CONSUMER & COMMUNITY BANKING",
        "COMMERCIAL BANK",
    ];
    const benefitsOptions = ["BC", "IP"];
    const regions = [
        "APAC (Asia Pacific)",
        "EMEA (Europe, Middle East, Africa)",
        "Americas",
    ];

    for (let i = 4; i <= 50; i++) {
        const startYear = 2020 + Math.floor(Math.random() * 5);
        const endYear = startYear + 1 + Math.floor(Math.random() * 5);
        const live2024 = Math.floor(Math.random() * 200000) + 5000;
        const outlook2024 = Math.floor(Math.random() * 50000) + 1000;
        const live2025 = Math.floor(Math.random() * 300000) + 10000;
        const outlook2025 = Math.floor(Math.random() * 80000) + 2000;

        additionalProjects.push({
            id: `project_${i}`,
            title: `Project ${i}`,
            rag: ragOptions[Math.floor(Math.random() * ragOptions.length)],
            executionState:
                executionOptions[
                    Math.floor(Math.random() * executionOptions.length)
                ],
            executionOnly: Math.random() > 0.5 ? "Yes" : "No",
            openForTimeEntry: Math.random() > 0.3 ? "Yes" : "No",
            shortId: `${String(i).padStart(6, "0")}`,
            type: "IP",
            state: "Approved (Edited)",
            benefitsReportingLevel:
                benefitsOptions[
                    Math.floor(Math.random() * benefitsOptions.length)
                ],
            businessCase: `BC${i} - Sample Business Case ${i}`,
            productName: `Product ${i} | Department | ${
                orgOptions[Math.floor(Math.random() * orgOptions.length)]
            }`,
            financials: {
                live2024,
                outlook2024,
                budget2024:
                    live2024 + outlook2024 + Math.floor(Math.random() * 20000),
                live2025,
                outlook2025,
            },
            startDate: `${startYear}-01-01T00:00:00Z`,
            endDate: `${endYear}-12-31T00:00:00Z`,
            owner: `Owner ${i}`,
            sponsor: `Sponsor ${i}`,
            primaryFbm: `FBM ${i}`,
            l1OwningOrganization:
                orgOptions[Math.floor(Math.random() * orgOptions.length)],
            l2OwningOrganization: `L2 Org ${i}`,
            inPlan: Math.random() > 0.2 ? "Yes" : "No",
            labels: `label${i}, tag${i}`,
            openCreationDate: `2024-0${
                Math.floor(Math.random() * 9) + 1
            }-01T10:00:00.000Z`,
            openCreatorName: `Creator ${i}`,
            overview: `Overview for project ${i}`,
            regionalImpact: regions[Math.floor(Math.random() * regions.length)],
            lastApprovedDate: `2024-0${
                Math.floor(Math.random() * 9) + 1
            }-15T08:00:00.000Z`,
            hasWorkflowReportingInformation: Math.random() > 0.3,
            isCloseable: Math.random() > 0.4,
        });
    }

    return [...realProjects, ...additionalProjects];
};

// 3D Coordinate System Component
function CoordinateSystem({ range = 10 }) {
    const gridRef = useRef();

    // Create grid lines
    const gridLines = useMemo(() => {
        const lines = [];

        // X-axis grid lines (red)
        for (let i = -range; i <= range; i += 2) {
            lines.push({
                points: [
                    [-range, 0, i],
                    [range, 0, i],
                ],
                color: "#ff4444",
                opacity: i === 0 ? 1 : 0.3,
            });
            lines.push({
                points: [
                    [i, 0, -range],
                    [i, 0, range],
                ],
                color: "#ff4444",
                opacity: i === 0 ? 1 : 0.3,
            });
        }

        // Y-axis grid lines (green)
        for (let i = -range; i <= range; i += 2) {
            lines.push({
                points: [
                    [0, i, -range],
                    [0, i, range],
                ],
                color: "#44ff44",
                opacity: i === 0 ? 1 : 0.3,
            });
            lines.push({
                points: [
                    [-range, i, 0],
                    [range, i, 0],
                ],
                color: "#44ff44",
                opacity: i === 0 ? 1 : 0.3,
            });
        }

        // Z-axis grid lines (blue)
        for (let i = -range; i <= range; i += 2) {
            lines.push({
                points: [
                    [-range, i, 0],
                    [range, i, 0],
                ],
                color: "#4444ff",
                opacity: i === 0 ? 1 : 0.3,
            });
            lines.push({
                points: [
                    [0, -range, i],
                    [0, range, i],
                ],
                color: "#4444ff",
                opacity: i === 0 ? 1 : 0.3,
            });
        }

        return lines;
    }, [range]);

    return (
        <group ref={gridRef}>
            {/* Grid lines */}
            {gridLines.map((line, index) => (
                <Line
                    key={index}
                    points={line.points}
                    color={line.color}
                    transparent
                    opacity={line.opacity}
                    lineWidth={line.opacity === 1 ? 3 : 1}
                />
            ))}

            {/* Axis arrows and labels */}
            {/* X-axis (Date Timeline) */}
            <Text
                position={[range + 1, 0, 0]}
                fontSize={0.8}
                color="#ff4444"
                anchorX="center"
                anchorY="middle"
                rotation={[0, 0, 0]}
            >
                Project Timeline →
            </Text>

            {/* Y-axis (Total Financials) */}
            <Text
                position={[0, range + 1, 0]}
                fontSize={0.8}
                color="#44ff44"
                anchorX="center"
                anchorY="middle"
                rotation={[0, 0, Math.PI / 2]}
            >
                Total Financials ↑
            </Text>

            {/* Z-axis (Sponsor Organization) */}
            <Text
                position={[0, 0, range + 1]}
                fontSize={0.8}
                color="#4444ff"
                anchorX="center"
                anchorY="middle"
                rotation={[0, -Math.PI / 2, 0]}
            >
                Sponsor Organization →
            </Text>

            {/* Coordinate value labels */}
            {[-8, -4, 0, 4, 8].map((val) => (
                <React.Fragment key={val}>
                    <Text
                        position={[val, -0.5, 0]}
                        fontSize={0.3}
                        color="#ff8888"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {val}
                    </Text>
                    <Text
                        position={[0, val, -0.5]}
                        fontSize={0.3}
                        color="#88ff88"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {val}
                    </Text>
                    <Text
                        position={[-0.5, 0, val]}
                        fontSize={0.3}
                        color="#8888ff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {val}
                    </Text>
                </React.Fragment>
            ))}
        </group>
    );
}

// Project Cube Component (replacing spheres)
function ProjectCube({ project, position, isSelected, onSelect, onHover }) {
    const cubeRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Calculate size based on total budget
    const totalBudget = project.financials.budget2024 || 0;
    const cubeSize = Math.max(
        0.3,
        Math.min(1.5, Math.log(totalBudget + 1) / 8)
    );

    // Color mapping using REAL attributes
    const ragColors = {
        RED: "#ff2040",
        AMBER: "#ffaa00",
        GREEN: "#00ff80",
        BLUE: "#4080ff",
    };

    const executionColors = {
        "In Progress": "#40ff40",
        "On Hold": "#ff4040",
        Planning: "#ffaa40",
        Completed: "#8080ff",
    };

    const coreColor = executionColors[project.executionState] || "#888888";
    const edgeColor = ragColors[project.rag] || "#666666";

    // Calculate project duration
    const startYear = new Date(project.startDate).getFullYear();
    const endYear = new Date(project.endDate).getFullYear();
    const duration = endYear - startYear;

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

            // Only scale for selection/hover - no pulsing
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
                    <meshBasicMaterial color="#ffff00" />
                </mesh>
            )}

            {/* In-plan indicator */}
            {project.inPlan === "Yes" && (
                <mesh position={[cubeSize * 0.7, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.3]} />
                    <meshBasicMaterial color="#00ffff" />
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

// Main 3D Project Visualization
function Project3DVisualization() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [, setHoveredProject] = useState(null);
    const [filters, setFilters] = useState({
        rag: "all",
        executionState: "all",
        organization: "all",
        benefitsLevel: "all",
        inPlan: "all",
    });

    const projects = useMemo(() => generateRealProjectData(), []);

    // Filter projects based on real attributes
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            return (
                (filters.rag === "all" || project.rag === filters.rag) &&
                (filters.executionState === "all" ||
                    project.executionState === filters.executionState) &&
                (filters.organization === "all" ||
                    project.l1OwningOrganization === filters.organization) &&
                (filters.benefitsLevel === "all" ||
                    project.benefitsReportingLevel === filters.benefitsLevel) &&
                (filters.inPlan === "all" || project.inPlan === filters.inPlan)
            );
        });
    }, [projects, filters]);

    // Position projects in 3D space using new coordinate system
    const positionedProjects = useMemo(() => {
        return filteredProjects.map((project) => {
            // Calculate total financials for Y-axis
            const totalFinancials =
                (project.financials.live2024 || 0) +
                (project.financials.outlook2024 || 0) +
                (project.financials.live2025 || 0) +
                (project.financials.outlook2025 || 0) +
                (project.financials.budget2024 || 0);

            // X-axis: Date timeline (year and month from start date)
            const startDate = new Date(project.startDate);
            const startYear = startDate.getFullYear();
            const startMonth = startDate.getMonth(); // 0-11

            // Convert to decimal year (e.g., 2024.5 for June 2024)
            const decimalYear = startYear + startMonth / 12;
            const x = (decimalYear - 2023) * 3; // Scale relative to 2023 as baseline

            // Y-axis: Total financials (logarithmic scale)
            const y = Math.log(totalFinancials + 1) / 2 - 5;

            // Z-axis: Sponsor Organization clustering
            // Create clusters based on sponsor organization
            const sponsorKey =
                project.l1SponsorOrganization || project.sponsor || "Unknown";
            const sponsorIndex = [
                "CORPORATE & INVESTMENT BANKING",
                "ASSET & WEALTH MANAGEMENT",
                "CONSUMER & COMMUNITY BANKING",
                "COMMERCIAL BANK",
            ].indexOf(sponsorKey);

            const z =
                sponsorIndex !== -1
                    ? (sponsorIndex - 1.5) * 4 + (Math.random() - 0.5) * 1.5
                    : (Math.random() - 0.5) * 2;

            return {
                ...project,
                position: [x, y, z],
                totalFinancials,
            };
        });
    }, [filteredProjects]);

    return (
        <div className="w-full h-screen bg-gray-900 relative">
            {/* Control Panel */}
            <div className="absolute top-3 left-3 z-10 bg-black bg-opacity-95 text-white p-3 rounded-lg border border-cyan-400 shadow-2xl backdrop-blur-sm max-w-sm">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <h3 className="text-sm font-bold text-cyan-300">
                        📊 3D Project Controls
                    </h3>
                </div>

                {/* Filters Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    {/* RAG Status */}
                    <div className="space-y-1">
                        <label className="text-red-400 font-medium text-[10px]">
                            RAG
                        </label>
                        <select
                            value={filters.rag}
                            onChange={(e) =>
                                setFilters({ ...filters, rag: e.target.value })
                            }
                            className="w-full bg-gray-800 text-white text-[10px] p-1 rounded border border-gray-600 focus:border-red-400 transition-colors"
                        >
                            <option value="all">All</option>
                            <option value="RED">🔴 RED</option>
                            <option value="AMBER">🟡 AMBER</option>
                            <option value="GREEN">🟢 GREEN</option>
                            <option value="BLUE">🔵 BLUE</option>
                        </select>
                    </div>

                    {/* Execution State */}
                    <div className="space-y-1">
                        <label className="text-green-400 font-medium text-[10px]">
                            State
                        </label>
                        <select
                            value={filters.executionState}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    executionState: e.target.value,
                                })
                            }
                            className="w-full bg-gray-800 text-white text-[10px] p-1 rounded border border-gray-600 focus:border-green-400 transition-colors"
                        >
                            <option value="all">All</option>
                            <option value="In Progress">🚀 Progress</option>
                            <option value="On Hold">⏸️ Hold</option>
                            <option value="Planning">📋 Planning</option>
                            <option value="Completed">✅ Done</option>
                        </select>
                    </div>

                    {/* Organization */}
                    <div className="space-y-1">
                        <label className="text-blue-400 font-medium text-[10px]">
                            Org
                        </label>
                        <select
                            value={filters.organization}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    organization: e.target.value,
                                })
                            }
                            className="w-full bg-gray-800 text-white text-[10px] p-1 rounded border border-gray-600 focus:border-blue-400 transition-colors"
                        >
                            <option value="all">All</option>
                            <option value="CORPORATE & INVESTMENT BANKING">
                                CIB
                            </option>
                            <option value="ASSET & WEALTH MANAGEMENT">
                                AWM
                            </option>
                            <option value="CONSUMER & COMMUNITY BANKING">
                                CCB
                            </option>
                            <option value="COMMERCIAL BANK">CB</option>
                        </select>
                    </div>

                    {/* Benefits Level */}
                    <div className="space-y-1">
                        <label className="text-purple-400 font-medium text-[10px]">
                            Benefits
                        </label>
                        <select
                            value={filters.benefitsLevel}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    benefitsLevel: e.target.value,
                                })
                            }
                            className="w-full bg-gray-800 text-white text-[10px] p-1 rounded border border-gray-600 focus:border-purple-400 transition-colors"
                        >
                            <option value="all">All</option>
                            <option value="BC">BC</option>
                            <option value="IP">IP</option>
                        </select>
                    </div>
                </div>

                {/* Legend Section */}
                <div className="border-t border-gray-700 pt-2">
                    <div className="text-[10px] text-gray-400 space-y-0.5">
                        <div className="flex justify-between">
                            <span>🔴 X: Timeline</span>
                            <span>🟢 Y: Financials</span>
                        </div>
                        <div className="flex justify-between">
                            <span>🔵 Z: Sponsor Org</span>
                            <span>📦 Size: Budget</span>
                        </div>
                        <div className="flex justify-between">
                            <span>🎨 Color: State</span>
                            <span>📏 Edge: RAG</span>
                        </div>
                        <div className="text-center text-gray-500 text-[9px] mt-1">
                            Click cubes • Drag to rotate • Scroll to zoom
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Panel */}
            <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-90 text-white p-4 rounded-xl border border-green-500 shadow-2xl">
                <h4 className="font-bold text-lg mb-2 text-green-300">
                    📈 Portfolio Statistics
                </h4>
                <div className="space-y-1 text-sm">
                    <div>
                        <span className="text-cyan-400">Total Projects:</span>{" "}
                        <span className="font-bold">
                            {filteredProjects.length}
                        </span>
                    </div>
                    <div>
                        <span className="text-green-400">Total 2024 Live:</span>{" "}
                        <span className="font-bold">
                            $
                            {filteredProjects
                                .reduce(
                                    (sum, p) =>
                                        sum + (p.financials.live2024 || 0),
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </div>
                    <div>
                        <span className="text-blue-400">Total 2025 Live:</span>{" "}
                        <span className="font-bold">
                            $
                            {filteredProjects
                                .reduce(
                                    (sum, p) =>
                                        sum + (p.financials.live2025 || 0),
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </div>
                    <div>
                        <span className="text-red-400">RED Projects:</span>{" "}
                        <span className="font-bold">
                            {
                                filteredProjects.filter((p) => p.rag === "RED")
                                    .length
                            }
                        </span>
                    </div>
                    <div>
                        <span className="text-yellow-400">In Progress:</span>{" "}
                        <span className="font-bold">
                            {
                                filteredProjects.filter(
                                    (p) => p.executionState === "In Progress"
                                ).length
                            }
                        </span>
                    </div>
                    <div>
                        <span className="text-purple-400">In Plan:</span>{" "}
                        <span className="font-bold">
                            {
                                filteredProjects.filter(
                                    (p) => p.inPlan === "Yes"
                                ).length
                            }
                        </span>
                    </div>
                </div>
            </div>

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

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-10 bg-black bg-opacity-90 text-white p-3 rounded-xl border border-yellow-500 shadow-2xl text-xs">
                <div className="font-bold mb-2 text-yellow-300">
                    🎮 Controls & Legend
                </div>
                <div className="space-y-1">
                    <div>
                        <span className="text-cyan-400">🖱️ Click:</span> Select
                        project for details
                    </div>
                    <div>
                        <span className="text-purple-400">🖱️ Hover:</span> View
                        project information
                    </div>
                    <div>
                        <span className="text-yellow-400">🔄 Drag:</span> Rotate
                        3D view
                    </div>
                    <div>
                        <span className="text-green-400">🔍 Scroll:</span> Zoom
                        in/out
                    </div>
                    <div>
                        <span className="text-red-400">📦 Rotating:</span> In
                        Progress projects
                    </div>
                    <div>
                        <span className="text-blue-400">💛 Yellow cube:</span>{" "}
                        BC Benefits Level
                    </div>
                    <div>
                        <span className="text-cyan-400">🔵 Cyan cylinder:</span>{" "}
                        In Plan projects
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project3DVisualization;
