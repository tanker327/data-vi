import React, { useRef, useMemo } from "react";
import { Text, Line } from "@react-three/drei";
import { Group } from "three";
import { GRID_COLORS } from "../../constants/colors";
import { 
    convertCoordinateToDateLabel, 
    convertCoordinateToFinancialLabel, 
    convertCoordinateToOrgLabel,
    CoordinateRanges
} from "../../utils/coordinateUtils";

interface CoordinateSystemProps {
    range?: number;
    ranges?: CoordinateRanges;
}

export default function CoordinateSystem({ range = 10, ranges }: CoordinateSystemProps) {
    const gridRef = useRef<Group>(null);

    interface GridLine {
        points: [number, number, number][];
        color: string;
        opacity: number;
    }

    const gridLines = useMemo(() => {
        const lines: GridLine[] = [];

        // X-axis grid lines (red)
        for (let i = -range; i <= range; i += 2) {
            lines.push({
                points: [
                    [-range, 0, i],
                    [range, 0, i],
                ],
                color: GRID_COLORS.X_AXIS,
                opacity: i === 0 ? 1 : 0.3,
            });
            lines.push({
                points: [
                    [i, 0, -range],
                    [i, 0, range],
                ],
                color: GRID_COLORS.X_AXIS,
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
                color: GRID_COLORS.Y_AXIS,
                opacity: i === 0 ? 1 : 0.3,
            });
            lines.push({
                points: [
                    [-range, i, 0],
                    [range, i, 0],
                ],
                color: GRID_COLORS.Y_AXIS,
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
                color: GRID_COLORS.Z_AXIS,
                opacity: i === 0 ? 1 : 0.3,
            });
            lines.push({
                points: [
                    [0, -range, i],
                    [0, range, i],
                ],
                color: GRID_COLORS.Z_AXIS,
                opacity: i === 0 ? 1 : 0.3,
            });
        }

        return lines;
    }, [range]);

    const coordinateLabels = useMemo(() => {
        if (!ranges) {
            return [-8, -4, 0, 4, 8];
        }
        
        // Generate labels at meaningful positions based on actual data ranges
        const xLabels: number[] = [];
        const yLabels: number[] = [];
        
        // For X-axis (timeline), use evenly spaced intervals
        const xRange = ranges.x.max - ranges.x.min;
        const xStep = Math.max(1, Math.ceil(xRange / 5));
        for (let i = Math.ceil(ranges.x.min); i <= Math.floor(ranges.x.max); i += xStep) {
            xLabels.push(i);
        }
        
        // For Y-axis (financials), use logarithmic scale
        const yRange = ranges.y.max - ranges.y.min;
        const yStep = Math.max(1, Math.ceil(yRange / 5));
        for (let i = Math.ceil(ranges.y.min); i <= Math.floor(ranges.y.max); i += yStep) {
            yLabels.push(i);
        }
        
        // For Z-axis (organizations), use fixed positions since they're categorical
        const zLabels = [-6, -2, 2, 6].filter(z => z >= ranges.z.min - 1 && z <= ranges.z.max + 1);
        
        return { x: xLabels, y: yLabels, z: zLabels };
    }, [ranges]);

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

            {/* Axis labels */}
            <Text
                position={[range + 1, 0, 0]}
                fontSize={0.8}
                color={GRID_COLORS.X_AXIS}
                anchorX="center"
                anchorY="middle"
                rotation={[0, 0, 0]}
            >
                Project Timeline →
            </Text>

            <Text
                position={[0, range + 1, 0]}
                fontSize={0.8}
                color={GRID_COLORS.Y_AXIS}
                anchorX="center"
                anchorY="middle"
                rotation={[0, 0, Math.PI / 2]}
            >
                Total Financials ↑
            </Text>

            <Text
                position={[0, 0, range + 1]}
                fontSize={0.8}
                color={GRID_COLORS.Z_AXIS}
                anchorX="center"
                anchorY="middle"
                rotation={[0, -Math.PI / 2, 0]}
            >
                Sponsor Organization →
            </Text>

            {/* Coordinate value labels */}
            {typeof coordinateLabels === 'object' && 'x' in coordinateLabels ? (
                <>
                    {/* X-axis labels */}
                    {coordinateLabels.x.map((val) => (
                        <Text
                            key={`x-${val}`}
                            position={[val, -0.5, 0]}
                            fontSize={0.3}
                            color="#ff8888"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {convertCoordinateToDateLabel(val)}
                        </Text>
                    ))}
                    {/* Y-axis labels */}
                    {coordinateLabels.y.map((val) => (
                        <Text
                            key={`y-${val}`}
                            position={[0, val, -0.5]}
                            fontSize={0.3}
                            color="#88ff88"
                            anchorX="center"
                            anchorY="middle"
                        >
                            ${convertCoordinateToFinancialLabel(val)}
                        </Text>
                    ))}
                    {/* Z-axis labels */}
                    {coordinateLabels.z.map((val) => (
                        <Text
                            key={`z-${val}`}
                            position={[-0.5, 0, val]}
                            fontSize={0.3}
                            color="#8888ff"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {convertCoordinateToOrgLabel(val)}
                        </Text>
                    ))}
                </>
            ) : (
                // Fallback for old format
                coordinateLabels.map((val) => (
                    <React.Fragment key={val}>
                        <Text
                            position={[val, -0.5, 0]}
                            fontSize={0.3}
                            color="#ff8888"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {convertCoordinateToDateLabel(val)}
                        </Text>
                        <Text
                            position={[0, val, -0.5]}
                            fontSize={0.3}
                            color="#88ff88"
                            anchorX="center"
                            anchorY="middle"
                        >
                            ${convertCoordinateToFinancialLabel(val)}
                        </Text>
                        <Text
                            position={[-0.5, 0, val]}
                            fontSize={0.3}
                            color="#8888ff"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {convertCoordinateToOrgLabel(val)}
                        </Text>
                    </React.Fragment>
                ))
            )}
        </group>
    );
}