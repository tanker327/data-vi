# Proposal Object Field Analysis

| Field Name | Best Explanation |
|------------|------------------|
| **id** | Unique system identifier for the proposal (MongoDB ObjectId format) |
| **title** | Human-readable name/title of the proposal |
| **rag** | Risk Assessment Grade using RAG status (Red/Amber/Green) - currently "AMBER" indicates medium risk |
| **executionState** | Current phase of proposal execution (In Progress, Completed, etc.) |
| **executionOnly** | Boolean flag indicating if this is execution-only (no planning phase) |
| **openForTimeEntry** | Whether team members can log time/hours against this proposal |
| **shortId** | Abbreviated identifier for easy reference (6-digit code) |
| **type** | Proposal category/type - "IP" likely means Investment Proposal or Intellectual Property |
| **state** | Current approval status in the workflow (Approved with edits made) |
| **benefitsReportingLevel** | Organizational level at which benefits/ROI are reported |
| **businessCase** | Reference ID and brief description of the business justification |
| **productName** | Full product/service name and organizational hierarchy this proposal affects |
| **financials** | Budget/cost breakdown by year (live = actual, outlook = projected) |
| **startDate** | Project/proposal start date (ISO 8601 format) |
| **endDate** | Project/proposal completion date (ISO 8601 format) |
| **owner** | Primary person responsible for the proposal |
| **agreementApprovers** | Person(s) who can approve agreements related to this proposal |
| **collaborators** | Additional team members working on the proposal |
| **cto** | Chief Technology Officer or technical lead assigned |
| **sponsor** | Executive sponsor providing funding/authority |
| **primaryFbm** | Primary Functional Business Manager overseeing the work |
| **l1SponsorOrganization** | Top-level organizational unit sponsoring the proposal |
| **l2SponsorOrganization** | Second-level organizational unit within sponsor organization |
| **l1OwningOrganization** | Top-level organizational unit that owns/manages the proposal |
| **l2OwningOrganization** | Second-level organizational unit within owning organization |
| **l3OwningOrganization** | Third-level (most specific) organizational unit within owning organization |
| **inPlan** | Whether this proposal is included in formal planning cycles |
| **labels** | Tags/keywords for categorization and searchability |
| **openCreationDate** | Timestamp when the proposal was first created |
| **openCreatorName** | Person who originally created the proposal |
| **overview** | Brief description of the proposal's purpose |
| **regionalImpact** | Geographic region(s) affected by this proposal |
| **lastApprovedDate** | Timestamp of most recent approval action |
| **hasWorkflowReportingInformation** | Boolean indicating if workflow reporting data is available |
| **isCloseable** | Boolean indicating if the proposal can be closed/completed |