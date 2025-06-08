import React, { useEffect, useMemo, useState } from 'react';
import API from '../helpers/APIConnector';
import GraphComponent from '../components/GraphComponent';
import SegmentedToggle from '../components/SegmentedToggle';
export default function Laporan() {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const centralityOptions = [
    { label: "Tidak ada", value: "" },
    { label: "Sentralitas Derajat", value: "degree_centrality" },
    { label: "Betweenness", value: "betweenness_centrality" },
    { label: "Closeness", value: "closeness_centrality" },
    { label: "Eigenvector", value: "eigenvector_centrality" },
    { label: "Pagerank", value: "pagerank" },
  ];
  
  const [graphData, setGraphData] = useState(null);
  const [centralityMode, setCentralityMode] = useState("");
  const [weights, setWeights] = useState({});

  useEffect(() => {
    API.get("/centrality/get_graph")
      .then(setGraphData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!centralityMode) return setWeights({});
    API.get(`/centrality/${centralityMode}`)
      .then((data) => {
        const vals = Object.values(data);
        const max = vals.length ? Math.max(...vals) : 1;
        const norm = Object.fromEntries(
          Object.entries(data).map(([id, w]) => [id, w / max])
        );
        setWeights(norm);
      })
      .catch(console.error);
  }, [centralityMode]);

  const nodeNameMap = useMemo(() => {
  if (!graphData) return {};
  return Object.fromEntries(
    graphData.nodes.map(n => [n.id, n.agent_name || n.id])
  );
}, [graphData]);

const topFive = useMemo(() => {
  return Object.entries(weights)
    .sort(([, w1], [, w2]) => w2 - w1)
    .slice(0, 10)
    .map(([id, w], idx) => ({
      rank: idx + 1,
      id,
      name: nodeNameMap[id] || id,
      score: w.toFixed(3),
    }));
}, [weights, nodeNameMap]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Laporan & Analisis</h1>

      <div className="bg-base-200 p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-2">Performa Jaringan</h2>
        <SegmentedToggle
          options={centralityOptions}
          selected={centralityMode}
          onChange={setCentralityMode}
        />
      </div>

      {graphData ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graph */}
          <div className="lg:col-span-2 bg-base-100 p-4 rounded-lg shadow">
            
             <GraphComponent
              data={graphData}
              weights={weights}
              selectedNodeId={selectedNodeId}
            />
          </div>

          {/* Top 5 Table */}
          <div className="bg-base-100 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Top Anggota Berpengaruh</h3>
            {topFive.length ? (
              
              <table className="table-auto w-full text-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID Agen</th>
                    <th>Nama Agen</th>
                    <th className="text-right">Skor</th>
                  </tr>
                </thead>
                <tbody>
                  {topFive.map(({ rank, id, name, score }) => (
                    <tr
                      key={id}
                      className={id === selectedNodeId ? "bg-green-100" : ""}
                      onClick={() => setSelectedNodeId(id)}
                    >
                      <td>{rank}</td>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td className="text-right">{score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">Pilih algoritma</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">Loading graph…</div>
      )}
    </div>
  );
}