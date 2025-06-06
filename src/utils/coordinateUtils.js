import { ORGANIZATION_OPTIONS } from "../data/projectData.js";

export function calculateTotalFinancials(project) {
    return (
        (project.financials.live2024 || 0) +
        (project.financials.outlook2024 || 0) +
        (project.financials.live2025 || 0) +
        (project.financials.outlook2025 || 0) +
        (project.financials.budget2024 || 0)
    );
}

export function calculateProjectPosition(project) {
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

    // Z-axis: Sponsor Organization clustering
    const sponsorKey =
        project.l1SponsorOrganization || project.sponsor || "Unknown";
    const sponsorIndex = ORGANIZATION_OPTIONS.indexOf(sponsorKey);

    const z =
        sponsorIndex !== -1
            ? (sponsorIndex - 1.5) * 4 + (Math.random() - 0.5) * 1.5
            : (Math.random() - 0.5) * 2;

    return [x, y, z];
}

export function calculateCubeSize(project) {
    const totalBudget = project.financials.budget2024 || 0;
    return Math.max(0.3, Math.min(1.5, Math.log(totalBudget + 1) / 8));
}

export function calculateProjectDuration(project) {
    const startYear = new Date(project.startDate).getFullYear();
    const endYear = new Date(project.endDate).getFullYear();
    return endYear - startYear;
}

export function convertCoordinateToDateLabel(val) {
    const year = Math.round(val / 3 + 2023);
    const month = Math.round(
        (val / 3 + 2023 - Math.floor(val / 3 + 2023)) * 12
    );
    return month === 0
        ? `${year}`
        : `${year}-${String(month).padStart(2, "0")}`;
}

export function convertCoordinateToFinancialLabel(val) {
    return Math.round(Math.exp((val + 5) * 2) - 1).toLocaleString();
}

export function convertCoordinateToOrgLabel(val) {
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

    const orgMap = {
        [-6]: "CIB",
        [-2]: "AWM",
        [2]: "CCB",
        [6]: "CB",
    };

    return orgMap[closest] || "";
}
