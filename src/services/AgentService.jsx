import API from "../helpers/APIConnector";

// 1) GET /agents/  (list all)
export async function fetchAgents() {
  // If you need pagination, you can add query params: ?skip=0&limit=100
  return await API.get("/agents/");
}
export async function fetchAgentsPaged(page = 1, pageSize = 10) {
  // If you need pagination, you can add query params: ?skip=0&limit=100
  return await API.get(`/agents/paged?page=${page}&page_size=${pageSize}`);
}

export async function toggleAgentVerify(agentId, newStatus) {
  // bkl { "verified": true/false }.
  return await API.patch(`/agents/${agentId}`, { 'verified': newStatus , 
    "verified_at": newStatus ? new Date().toISOString() : null,});
}

export async function deleteAgentById(agentId) {
  return await API.delete(`/agents/${agentId}`);
}
export async function fetchPendingVerifications() {
  // returns array of agents where verified=false
  return await API.get("/agents/pending");
}
// 2.2 New Agents & Approvals
export async function fetchAgentApprovals(weeks = 4) {
  // e.g. GET /agents/approvals?weeks=4
  return await API.get(`/agents/approvals?weeks=${weeks}`);
}

// 4) (Optional) If you want a dedicated “verify” sub‐route, you could add it here—
//     but as long as PATCH /agents/{id} correctly updates `verified`, you’re fine.