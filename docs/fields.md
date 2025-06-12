# Proposal Object Field Analysis

| Field Name | Best Explanation | Data Type | Possible Range/Values |
|------------|------------------|-----------|----------------------|
| **id** | Unique system identifier for the proposal (MongoDB ObjectId format) | String | 24-character hexadecimal string |
| **title** | Human-readable name/title of the proposal | String | Variable length, typically 1-200 characters |
| **rag** | Risk Assessment Grade using RAG status (Red/Amber/Green) - currently "AMBER" indicates medium risk | String (Enum) | "RED", "AMBER", "GREEN" |
| **executionState** | Current phase of proposal execution (In Progress, Completed, etc.) | String (Enum) | "In Progress", "Completed", "Not Started", "On Hold", "Cancelled" |
| **executionOnly** | Boolean flag indicating if this is execution-only (no planning phase) | String (Boolean) | "Yes", "No" |
| **openForTimeEntry** | Whether team members can log time/hours against this proposal | String (Boolean) | "Yes", "No" |
| **shortId** | Abbreviated identifier for easy reference (6-digit code) | String | 6-digit alphanumeric code |
| **type** | Proposal category/type - "IP" likely means Investment Proposal or Intellectual Property | String (Enum) | "IP", "OP", "CP", etc. (business-defined codes) |
| **state** | Current approval status in the workflow (Approved with edits made) | String (Enum) | "Draft", "Submitted", "Approved", "Approved (Edited)", "Rejected" |
| **benefitsReportingLevel** | Organizational level at which benefits/ROI are reported | String (Enum) | "IP", "Portfolio", "Division", "Enterprise" |
| **businessCase** | Reference ID and brief description of the business justification | String | Format: "ID - Description" (variable length) |
| **productName** | Full product/service name and organizational hierarchy this proposal affects | String | Variable length, pipe-separated hierarchy |
| **financials** | Budget/cost breakdown by year (live = actual, outlook = projected) | Object | Contains numeric values for live/outlook by year |
| **financials.live2024** | Actual financial figures for 2024 | Number | Positive decimal values (currency amounts) |
| **financials.outlook2024** | Projected financial outlook for 2024 | Number | Positive decimal values (currency amounts) |
| **financials.budget2024** | Budgeted amount for 2024 | Number | Positive decimal values (currency amounts) |
| **financials.live2025** | Actual financial figures for 2025 | Number | Positive decimal values (currency amounts) |
| **financials.outlook2025** | Projected financial outlook for 2025 | Number | Positive decimal values (currency amounts) |
| **startDate** | Project/proposal start date (ISO 8601 format) | String (ISO Date) | ISO 8601 datetime format |
| **endDate** | Project/proposal completion date (ISO 8601 format) | String (ISO Date) | ISO 8601 datetime format |
| **owner** | Primary person responsible for the proposal | String | Full name (typically 2-50 characters) |
| **agreementApprovers** | Person(s) who can approve agreements related to this proposal | String | Full name or comma-separated names |
| **collaborators** | Additional team members working on the proposal | String | Full name or comma-separated names |
| **cto** | Chief Technology Officer or technical lead assigned | String | Full name (typically 2-50 characters) |
| **sponsor** | Executive sponsor providing funding/authority | String | Full name (typically 2-50 characters) |
| **primaryFbm** | Primary Functional Business Manager overseeing the work | String | Full name (typically 2-50 characters) |
| **l1SponsorOrganization** | Top-level organizational unit sponsoring the proposal | String | Organizational unit name (uppercase) |
| **l2SponsorOrganization** | Second-level organizational unit within sponsor organization | String | Organizational unit name with prefix |
| **l1OwningOrganization** | Top-level organizational unit that owns/manages the proposal | String | Organizational unit name (uppercase) |
| **l2OwningOrganization** | Second-level organizational unit within owning organization | String | Organizational unit name with prefix |
| **l3OwningOrganization** | Third-level (most specific) organizational unit within owning organization | String | Detailed organizational unit with pipe separators |
| **inPlan** | Whether this proposal is included in formal planning cycles | String (Boolean) | "Yes", "No" |
| **labels** | Tags/keywords for categorization and searchability | String | Comma-separated values |
| **openCreationDate** | Timestamp when the proposal was first created | String (ISO Date) | ISO 8601 datetime format with milliseconds |
| **openCreatorName** | Person who originally created the proposal | String | Full name (typically 2-50 characters) |
| **overview** | Brief description of the proposal's purpose | String | Variable length text (typically 10-500 characters) |
| **regionalImpact** | Geographic region(s) affected by this proposal | String (Enum) | "APAC (Asia Pacific)", "EMEA", "Americas", "Global" |
| **lastApprovedDate** | Timestamp of most recent approval action | String (ISO Date) | ISO 8601 datetime format with milliseconds |
| **hasWorkflowReportingInformation** | Boolean indicating if workflow reporting data is available | Boolean | true, false |
| **isCloseable** | Boolean indicating if the proposal can be closed/completed | Boolean | true, false |