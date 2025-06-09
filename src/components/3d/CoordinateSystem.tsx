import React, { useRef, useMemo } from "react";
import { Text, Line } from "@react-three/drei";
import { Group } from "three";
import { GRID_COLORS } from "../../constants/colors";
import { 
    convertCoordinateToDateLabel, 
    convertCoordinateToFinancialLabel, 
    convertCoordinateToOrgLabel 
} from "../../utils/coordinateUtils";

interface CoordinateSystemProps {
    range?: number;
}

export default function CoordinateSystem({ range = 10 }: CoordinateSystemProps) {
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

    const coordinateLabels = [-8, -4, 0, 4, 8];

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
            {coordinateLabels.map((val) => (
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
            ))}
        </group>
    );
}