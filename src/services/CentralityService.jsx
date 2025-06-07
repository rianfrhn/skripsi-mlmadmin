export async function fetchTopInfluential(algo, limit = 5) {
  return await API.get(`/agents/centrality?algo=${encodeURIComponent(algo)}&limit=${limit}`);
}