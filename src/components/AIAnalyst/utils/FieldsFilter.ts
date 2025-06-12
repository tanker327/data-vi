import { llmService } from "./llmService";

export const promptTemplate = `
You are an AI assistant specialized in analyzing data structures and user queries to determine relevant fields for data retrieval. Your task is to examine a data object structure and a user query, then identify which fields from the data object are necessary to answer the query.

First, review the following Markdown content that defines the structure of our data object:

<markdown_content>
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
| **type** | Proposal category/type - "IP" likely means Investment Proposal or Intellectual Property | String (Enum) | "IP", "MS"|
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
</markdown_content>

Now, consider this user query:

<user_query>
{{USER_QUERY}}
</user_query>

Your goal is to analyze the query and determine which fields from the data object are needed to provide a complete answer. Follow these steps:

1. Carefully read and understand the user query.
2. Identify the key information or data points the user is asking for.
3. Review the fields defined in the Markdown content.
4. Determine which fields are directly relevant to answering the user's query.
5. Consider any fields that might be indirectly relevant or provide context to the answer.
6. Identify any fields that may be necessary for display purposes or to identify the record, even if not directly related to the query.

Before providing your final response, wrap your analysis in <structured_analysis> tags. In this analysis:
1. List all fields from the Markdown content.
2. Categorize each field into one of the following:
   a) Directly Relevant
   b) Indirectly Relevant
   c) Display/Identification
   d) Not Relevant
3. For each category, explain your reasoning for including fields in that category.
4. Consider and note any potential edge cases or assumptions you're making in your categorization.
5. Summarize your findings, discussing the most important fields for answering the query.

It's OK for this section to be quite long.

Your final output must be a JSON array containing only the names of the relevant fields. This should include fields directly relevant to the query, as well as those necessary for display or record identification. If no fields are relevant, the array should be empty.

Here's an example of the expected output format:

```json
["field1", "field2", "field3"]
  ```

Remember to focus only on the fields defined in the Markdown content and their relevance to the specific user query provided. Ensure your response can be directly parsed as a JSON array.
`;

const USER_QUERY_KEY = '{{USER_QUERY}}'


export const dataAnalysis = async (userQuery: string) => {
  const prompt = promptTemplate.replace(USER_QUERY_KEY, userQuery);
  const response = await llmService.sendRequest(prompt);
  console.log(response);

  return response;
}