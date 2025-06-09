export interface ProjectFinancials {
  live2024?: number;
  outlook2024?: number;
  budget2024?: number;
  live2025?: number;
  outlook2025?: number;
}

export interface Project {
  id: string;
  title: string;
  rag: 'RED' | 'AMBER' | 'GREEN' | 'BLUE' | null;
  executionState: 'In Progress' | 'On Hold' | 'Planning' | 'Completed' | null;
  executionOnly: 'Yes' | 'No';
  openForTimeEntry: 'Yes' | 'No';
  shortId: string;
  type: string;
  state: string;
  benefitsReportingLevel: 'BC' | 'IP';
  businessCase: string;
  productName: string;
  financials: ProjectFinancials;
  startDate: string;
  endDate: string;
  owner: string;
  coOwners?: string;
  agreementApprovers?: string;
  collaborators?: string;
  cto?: string;
  sponsor?: string;
  primaryFbm?: string;
  l1SponsorOrganization?: string;
  l2SponsorOrganization?: string;
  l1OwningOrganization?: string;
  l2OwningOrganization?: string;
  l3OwningOrganization?: string;
  inPlan: 'Yes' | 'No';
  labels?: string;
  openCreationDate?: string;
  openCreatorName?: string;
  overview?: string;
  regionalImpact?: string;
  lastApprovedDate?: string;
  hasWorkflowReportingInformation?: boolean;
  isCloseable?: boolean;
}

export interface PositionedProject extends Project {
  position: [number, number, number];
  totalFinancials: number;
}

export interface ProjectFilters {
  rag: string;
  executionState: string;
  organization: string;
  benefitsLevel: string;
  inPlan: string;
}

export interface PortfolioStats {
  totalProjects: number;
  total2024Live: number;
  total2025Live: number;
  redProjects: number;
  inProgressProjects: number;
  inPlanProjects: number;
}