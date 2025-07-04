import { Project } from '../types/project';
import { ORGANIZATION_OPTIONS } from "../data/projectData";

// Simple hash function for deterministic pseudo-random numbers
function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

// Deterministic pseudo-random number between -0.5 and 0.5 based on project ID
function deterministicRandom(projectId: string, seed: number = 0): number {
    const hash = hashCode(projectId + seed.toString());
    return ((hash % 1000) / 1000) - 0.5;
}

export function calculateTotalFinancials(project: Project): number {
    return (
        (project.financials.live2024 || 0) +
        (project.financials.outlook2024 || 0) +
        (project.financials.live2025 || 0) +
        (project.financials.outlook2025 || 0) +
        (project.financials.budget2024 || 0)
    );
}

export function calculateProjectPosition(project: Project): [number, number, number] {
    const totalFinancials = calculateTotalFinancials(project);

    // X-axis: Date timeline (year and month from start date)
    const startDate = new Date(project.startDate);
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth(); // 0-11

    // Convert to decimal year (e.g., 2024.5 for June 2024)
    const decimalYear = startYear + startMonth / 12;
    const x = (decimalYear - 2023) * 3; // Scale relative to 2023 as baseline

    // Y-axis: Total financials (logarithmic scale)
    const y = Math.log(totalFinancials + 1) / 2 - 5;

    // Z-axis: Owning Organization clustering
    const owningOrg = project.l1OwningOrganization || "Unknown";
    const sponsorIndex = ORGANIZATION_OPTIONS.indexOf(owningOrg as typeof ORGANIZATION_OPTIONS[number]);

    const z =
        sponsorIndex !== -1
            ? (sponsorIndex - 1.5) * 4 + deterministicRandom(project.id, 1) * 1.5
            : deterministicRandom(project.id, 2) * 2;

    return [x, y, z];
}

export function calculateCubeSize(project: Project): number {
    const totalBudget = project.financials.budget2024 || 0;
    return Math.max(0.3, Math.min(1.5, Math.log(totalBudget + 1) / 8));
}

export function calculateProjectDuration(project: Project): number {
    const startYear = new Date(project.startDate).getFullYear();
    const endYear = new Date(project.endDate).getFullYear();
    return endYear - startYear;
}

export function convertCoordinateToDateLabel(val: number): string {
    const year = Math.round(val / 3 + 2023);
    const month = Math.round(
        (val / 3 + 2023 - Math.floor(val / 3 + 2023)) * 12
    );
    return month === 0
        ? `${year}`
        : `${year}-${String(month).padStart(2, "0")}`;
}

export function convertCoordinateToFinancialLabel(val: number): string {
    return Math.round(Math.exp((val + 5) * 2) - 1).toLocaleString();
}

export function convertCoordinateToOrgLabel(val: number): string {
    // Based on the positioning logic: (sponsorIndex - 1.5) * 4
    // Index 0: CORPORATE & INVESTMENT BANKING → z = -6
    // Index 1: ASSET & WEALTH MANAGEMENT → z = -2
    // Index 2: CONSUMER & COMMUNITY BANKING → z = 2
    // Index 3: COMMERCIAL BANK → z = 6

    // Find the closest coordinate position
    const positions = [-6, -2, 2, 6];
    const closest = positions.reduce((prev, curr) =>
        Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
    );

    const orgMap: Record<number, string> = {
        [-6]: "CIB",
        [-2]: "AWM",
        [2]: "CCB",
        [6]: "CB",
    };

    return orgMap[closest] || "";
}

export interface CoordinateRanges {
    x: { min: number; max: number };
    y: { min: number; max: number };
    z: { min: number; max: number };
    overall: number;
}

export function calculateCoordinateRanges(projects: Project[]): CoordinateRanges {
    if (projects.length === 0) {
        return {
            x: { min: -5, max: 5 },
            y: { min: -5, max: 5 },
            z: { min: -5, max: 5 },
            overall: 10
        };
    }

    const positions = projects.map(project => calculateProjectPosition(project));
    
    const xValues = positions.map(pos => pos[0]);
    const yValues = positions.map(pos => pos[1]);
    const zValues = positions.map(pos => pos[2]);

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const zMin = Math.min(...zValues);
    const zMax = Math.max(...zValues);

    // Add padding (20% of range) to ensure all projects are visible
    const xRange = Math.max(xMax - xMin, 2);
    const yRange = Math.max(yMax - yMin, 2);
    const zRange = Math.max(zMax - zMin, 2);
    
    const xPadding = xRange * 0.2;
    const yPadding = yRange * 0.2;
    const zPadding = zRange * 0.2;

    const paddedXMin = xMin - xPadding;
    const paddedXMax = xMax + xPadding;
    const paddedYMin = yMin - yPadding;
    const paddedYMax = yMax + yPadding;
    const paddedZMin = zMin - zPadding;
    const paddedZMax = zMax + zPadding;

    // Calculate overall range for grid system
    const maxAbsX = Math.max(Math.abs(paddedXMin), Math.abs(paddedXMax));
    const maxAbsY = Math.max(Math.abs(paddedYMin), Math.abs(paddedYMax));
    const maxAbsZ = Math.max(Math.abs(paddedZMin), Math.abs(paddedZMax));
    
    const overall = Math.ceil(Math.max(maxAbsX, maxAbsY, maxAbsZ));

    return {
        x: { min: paddedXMin, max: paddedXMax },
        y: { min: paddedYMin, max: paddedYMax },
        z: { min: paddedZMin, max: paddedZMax },
        overall
    };
}
