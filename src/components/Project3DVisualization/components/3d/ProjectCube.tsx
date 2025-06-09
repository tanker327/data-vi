import { useRef, useState, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Mesh } from "three";
import { Project } from "../../types/project";
import { RAG_COLORS, EXECUTION_COLORS, UI_COLORS } from "../../constants/colors";
import { calculateCubeSize, calculateProjectDuration } from "../../utils/coordinateUtils";
import styles from "./ProjectCube.module.css";

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
                    <div className={styles.tooltip}>
                        {/* Header Section */}
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerMain}>
                                    <h3 className={styles.title}>
                                        {project.title}
                                    </h3>
                                    <div className={styles.badgeContainer}>
                                        <span className={styles.idBadge}>
                                            ID: {project.shortId}
                                        </span>
                                        {project.rag && (
                                            <span className={`${styles.badge} ${
                                                project.rag === 'RED' ? styles.badgeRed :
                                                project.rag === 'AMBER' ? styles.badgeAmber :
                                                project.rag === 'GREEN' ? styles.badgeGreen :
                                                styles.badgeBlue
                                            }`}>
                                                {project.rag}
                                            </span>
                                        )}
                                        {project.executionState && (
                                            <span className={`${styles.badge} ${
                                                project.executionState === 'In Progress' ? styles.badgeGreen :
                                                project.executionState === 'On Hold' ? styles.badgeRed :
                                                project.executionState === 'Planning' ? styles.badgeAmber :
                                                styles.badgeBlue
                                            }`}>
                                                {project.executionState}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Sections */}
                        <div className={styles.content}>
                            {/* Key Info Grid */}
                            <div className={styles.infoGrid}>
                                <div className={styles.infoCard}>
                                    <div className={styles.infoLabel}>Owner</div>
                                    <div className={styles.infoValue}>{project.owner}</div>
                                </div>
                                <div className={styles.infoCard}>
                                    <div className={styles.infoLabel}>Sponsor</div>
                                    <div className={styles.infoValue}>{project.sponsor || 'N/A'}</div>
                                </div>
                                <div className={styles.infoCard}>
                                    <div className={styles.infoLabel}>Duration</div>
                                    <div className={styles.infoValue}>{duration} years</div>
                                </div>
                                <div className={styles.infoCard}>
                                    <div className={styles.infoLabel}>Benefits</div>
                                    <div className={styles.infoValue}>{project.benefitsReportingLevel}</div>
                                </div>
                            </div>

                            {/* Financial Information */}
                            <div className={styles.financialSection}>
                                <div className={styles.financialHeader}>
                                    💰 Financial Overview
                                </div>
                                <div className={styles.financialGrid}>
                                    <div className={styles.financialRow}>
                                        <span className={styles.financialLabel}>2024 Live:</span>
                                        <span className={`${styles.financialValue} ${styles.financialValueGreen}`}>
                                            ${(project.financials.live2024 || 0).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className={styles.financialRow}>
                                        <span className={styles.financialLabel}>2025 Live:</span>
                                        <span className={`${styles.financialValue} ${styles.financialValueBlue}`}>
                                            ${(project.financials.live2025 || 0).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className={`${styles.financialRow} ${styles.financialRowTotal}`}>
                                        <span className={styles.financialLabelBold}>Total Budget:</span>
                                        <span className={`${styles.financialValue} ${styles.financialValueCyan}`}>
                                            ${totalBudget.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Organization Info */}
                            {project.l1OwningOrganization && (
                                <div className={styles.orgSection}>
                                    <div className={styles.orgLabel}>Organization</div>
                                    <div className={styles.orgValue}>
                                        {project.l1OwningOrganization}
                                    </div>
                                </div>
                            )}

                            {/* Status Indicators */}
                            <div className={styles.statusSection}>
                                <div className={styles.statusBadges}>
                                    {project.inPlan === 'Yes' && (
                                        <span className={`${styles.statusBadge} ${styles.statusBadgeCyan}`}>
                                            📋 In Plan
                                        </span>
                                    )}
                                    {project.openForTimeEntry === 'Yes' && (
                                        <span className={`${styles.statusBadge} ${styles.statusBadgeGreen}`}>
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