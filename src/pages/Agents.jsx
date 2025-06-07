import React, { useEffect, useState } from "react";
import API from "../helpers/APIConnector";
import { toggleAgentVerify, deleteAgentById, fetchAgentsPaged } from "../services/AgentService";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage]         = useState(1);
  const [total, setTotal] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const PAGE_SIZE = 10;
  const history = useNavigate()

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async (p = page) => {
    try {
      setPage(p)
      setLoading(true);
      const data = await fetchAgentsPaged(p, PAGE_SIZE);
      setAgents(data.page_content);
      setTotal(data.total)
    } catch (e) {
      console.error("Error fetching agents:", e);
      setError("Failed to load agents.");
    } finally {
      setLoading(false);
    }
  };

  const onToggleVerify = async (agentId, currentStatus) => {
    try {
      await toggleAgentVerify(agentId, !currentStatus);
      loadAgents();
    } catch (e) {
      console.error("Error toggling verify:", e);
      alert("Could not update verification status.");
    }
  };

  const onDelete = async (agentId) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;

    try {
      await deleteAgentById(agentId);
      setAgents((prev) => prev.filter((a) => a.id !== agentId));
    } catch (e) {
      console.error("Error deleting agent:", e);
      alert("Could not delete agent.");
    }
  };

  const onEdit = (agent) => {
    history.push(`/agents/edit/${agent.id}`);
  };

  if (loading) {
    return <p className="p-4 text-gray-600">Loading agents…</p>;
  }
  if (error) {
    return <p className="p-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agent Verification</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Reference Key</th>
              <th className="text-center">Verified</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No agents found.
                </td>
              </tr>
            ) : (
              agents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.id}</td>
                  <td>{agent.username}</td>
                  <td>{agent.reference_key}</td>
                  <td className="text-center">
                    {agent.verified ? (
                      <span className="badge badge-success">Verified</span>
                    ) : (
                      <span className="badge badge-error">Not Verified</span>
                    )}
                  </td>
                  <td className="text-center space-x-2">
                    <button
                      className="btn btn-xs btn-outline btn-info"
                      onClick={() => onToggleVerify(agent.id, agent.verified)}
                    >
                      {agent.verified ? "Unverify" : "Verify"}
                    </button>

                    <button
                      className="btn btn-xs btn-outline btn-warning"
                      onClick={() => onEdit(agent)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-xs btn-outline btn-error"
                      onClick={() => onDelete(agent.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
            <div className="mt-4 flex justify-end">
              <Pagination
                page={page}
                total={total}
                pageSize={PAGE_SIZE}
                onPageChange={loadAgents}
              />
            </div>
    </div>
  );
}