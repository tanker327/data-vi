import { Project } from '../types/project';

export const REAL_PROJECTS: Project[] = [
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

export const RAG_OPTIONS = ["RED", "AMBER", "GREEN", null] as const;
export const EXECUTION_OPTIONS = ["In Progress", "On Hold", "Planning", null] as const;
export const ORGANIZATION_OPTIONS = [
    "CORPORATE & INVESTMENT BANKING",
    "ASSET & WEALTH MANAGEMENT",
    "CONSUMER & COMMUNITY BANKING",
    "COMMERCIAL BANK",
] as const;
export const BENEFITS_OPTIONS = ["BC", "IP"] as const;
export const REGIONS = [
    "APAC (Asia Pacific)",
    "EMEA (Europe, Middle East, Africa)",
    "Americas",
] as const;

function generateAdditionalProjects(): Project[] {
    const additionalProjects: Project[] = [];
    // 47 projects (4-50) will be evenly distributed across organizations

    for (let i = 4; i <= 50; i++) {
        const startYear = 2020 + Math.floor(Math.random() * 5);
        const endYear = startYear + 1 + Math.floor(Math.random() * 5);

        // Create more diverse financial ranges with exponential distribution
        const finScale = Math.random();
        let baseMultiplier: number;
        
        if (finScale < 0.1) {
            // Very small projects: 1K - 50K
            baseMultiplier = 0.01 + Math.random() * 0.05;
        } else if (finScale < 0.3) {
            // Small projects: 50K - 500K
            baseMultiplier = 0.05 + Math.random() * 0.45;
        } else if (finScale < 0.6) {
            // Medium projects: 500K - 5M
            baseMultiplier = 0.5 + Math.random() * 4.5;
        } else if (finScale < 0.85) {
            // Large projects: 5M - 50M
            baseMultiplier = 5 + Math.random() * 45;
        } else {
            // Very large projects: 50M - 500M
            baseMultiplier = 50 + Math.random() * 450;
        }

        const live2024 =
            Math.floor(
                (Math.random() * 800000 + Math.random() * 1200000) *
                    baseMultiplier
            ) + 1000;
        const outlook2024 =
            Math.floor(
                (Math.random() * 300000 + Math.random() * 500000) *
                    baseMultiplier
            ) + 500;
        const live2025 =
            Math.floor(
                (Math.random() * 900000 + Math.random() * 1800000) *
                    baseMultiplier
            ) + 2000;
        const outlook2025 =
            Math.floor(
                (Math.random() * 400000 + Math.random() * 700000) *
                    baseMultiplier
            ) + 1000;

        // Ensure each organization gets equal distribution of projects
        const orgIndex = (i - 4) % ORGANIZATION_OPTIONS.length;
        const finalOrganization = ORGANIZATION_OPTIONS[orgIndex];

        additionalProjects.push({
            id: `project_${i}`,
            title: `Project ${i}`,
            rag: RAG_OPTIONS[Math.floor(Math.random() * RAG_OPTIONS.length)],
            executionState:
                EXECUTION_OPTIONS[
                    Math.floor(Math.random() * EXECUTION_OPTIONS.length)
                ],
            executionOnly: Math.random() > 0.5 ? "Yes" : "No",
            openForTimeEntry: Math.random() > 0.3 ? "Yes" : "No",
            shortId: `${String(i).padStart(6, "0")}`,
            type: "IP",
            state: "Approved (Edited)",
            benefitsReportingLevel:
                BENEFITS_OPTIONS[
                    Math.floor(Math.random() * BENEFITS_OPTIONS.length)
                ],
            businessCase: `BC${i} - Sample Business Case ${i}`,
            productName: `Product ${i} | Department | ${finalOrganization}`,
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
            l1OwningOrganization: finalOrganization,
            l2OwningOrganization: `${
                finalOrganization.split(" ")[0]
            } - Subdivision ${i}`,
            inPlan: Math.random() > 0.2 ? "Yes" : "No",
            labels: `label${i}, tag${i}`,
            openCreationDate: `2024-0${
                Math.floor(Math.random() * 9) + 1
            }-01T10:00:00.000Z`,
            openCreatorName: `Creator ${i}`,
            overview: `Overview for project ${i}`,
            regionalImpact: REGIONS[Math.floor(Math.random() * REGIONS.length)],
            lastApprovedDate: `2024-0${
                Math.floor(Math.random() * 9) + 1
            }-15T08:00:00.000Z`,
            hasWorkflowReportingInformation: Math.random() > 0.3,
            isCloseable: Math.random() > 0.4,
        });
    }

    return additionalProjects;
}

export function generateProjectData(): Project[] {
    return [...REAL_PROJECTS, ...generateAdditionalProjects()];
}