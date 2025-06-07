
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { fetchAgentApprovals, fetchPendingVerifications } from "../services/AgentService";
import { fetchOverduePayments, fetchPaymentTrend, fetchPendingInstallments, fetchRecentPayments, fetchRevenueToday } from "../services/InstallmentService";
import { fetchTopInfluential } from "../services/CentralityService";

const Dashboard = () => {
const algorithms = [
  "Degree Centrality",
  "Betweenness Centrality",
  "Closeness Centrality",
  "Eigenvector Centrality",
  "Pagerank",
];
  // TODO: Replace these hardcoded values with real API data
  const [pendingVerifications, setPendingVerifications] = useState(0);
  const [pendingInstallments, setPendingInstallments] = useState(0);
  const [overduePayments, setOverduePayments] = useState(0);
  const [revenueToday, setRevenueToday] = useState(0);
  const [activeAlgo, setActiveAlgo] = useState(algorithms[0]);

// 2.1 Payment Trend (line chart)
const [paymentTrendData, setPaymentTrendData] = useState([]);
// shape: [{ date: "2025-06-01", amount: 120000 }, …]

// 2.2 New Agents vs Approvals (bar chart)
const [agentApprovalData, setAgentApprovalData] = useState([]);
// shape: [{ week: "Wk1", registered: 15, approved: 10 }, …]

// 3.2 Recent Payments
const [recentPayments, setRecentPayments] = useState([]);
// shape: [{ date: "2025-06-04", agent: "Budi", installmentId: 101, amount: 50000 }, …]
const [topInfluential, setTopInfluential] = useState([]);
// 5. Top-5 Influential Agents
// shape: [ "Agent A (0.45)", "Agent B (0.38)", … ]

  // 4. Quick-Action Buttons (labels and placeholder handlers)
  const quickActions = [
    { label: "Verifikasi Agen", onClick: () => {} },
    { label: "Setujui Cicilan", onClick: () => {} },
    { label: "Kirim Pengingat", onClick: () => {} },
    { label: "Ekspor Pembayaran", onClick: () => {} },
    { label: "Laporan Bulanan", onClick: () => {} },
  ];
  // placeholder ranked agents for each algorithm
  const dummyRankings = {
    "Degree Centrality": [
      "Agent A (12)",
      "Agent B (10)",
      "Agent C (9)",
      "Agent D (8)",
      "Agent E (7)",
    ],
    "Betweenness Centrality": [
      "Agent X (0.45)",
      "Agent Y (0.38)",
      "Agent Z (0.32)",
      "Agent W (0.29)",
      "Agent V (0.25)",
    ],
    "Closeness Centrality": [
      "Agent L (0.76)",
      "Agent M (0.72)",
      "Agent N (0.68)",
      "Agent O (0.65)",
      "Agent P (0.60)",
    ],
    "Eigenvector Centrality": [
      "Agent R (0.50)",
      "Agent S (0.45)",
      "Agent T (0.40)",
      "Agent U (0.35)",
      "Agent Q (0.30)",
    ],
    Pagerank: [
      "Agent J (0.12)",
      "Agent K (0.10)",
      "Agent H (0.08)",
      "Agent I (0.07)",
      "Agent G (0.05)",
    ],
  };
  
  useEffect(() => {
    
  fetchPendingVerifications()
    .then((resp) => setPendingVerifications(resp.count))
    .catch(() => setPendingVerifications(0));

  fetchPendingInstallments()
    .then((resp) => setPendingInstallments(resp.count))
    .catch(() => setPendingInstallments(0));

  fetchOverduePayments()
    .then((resp) => setOverduePayments(resp.count))
    .catch(() => setOverduePayments(0));

  fetchRevenueToday()
    .then((resp) => setRevenueToday(resp.total))
    .catch(() => setRevenueToday(0));

  // 2.1 Payment Trend
  fetchPaymentTrend(7)
    .then((data) => setPaymentTrendData(data))
    .catch(() => setPaymentTrendData([]));

  // 2.2 Agents vs Approvals
  fetchAgentApprovals(4)
    .then((data) => setAgentApprovalData(data))
    .catch(() => setAgentApprovalData([]));

  // 3.2 Recent Payments
  fetchRecentPayments(5)
    .then((data) => setRecentPayments(data))
    .catch(() => setRecentPayments([]));

  // 5. Top Influential
  fetchTopInfluential(activeAlgo, 5)
    .then((data) => setTopInfluential(data))
    .catch(() => setTopInfluential([]));
  }, [activeAlgo]);
  


  // Simple helper to format a number as “Rp XX.XXX”
  const formatRupiah = (amount) => {
    const localeID = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return localeID.format(amount);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Verifikasi Agen */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Verifikasi Agen</h2>
            <div className="text-4xl">{pendingVerifications}</div>
            <div className="text-sm text-gray-500">
              Agen menunggu approval
            </div>
          </div>
        </div>

        {/* 2. Cicilan Pending */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Cicilan dalam Permohonan</h2>
            <div className="text-4xl">{pendingInstallments}</div>
            <div className="text-sm text-gray-500">
              Permohonan cicilan baru
            </div>
          </div>
        </div>

        {/* 3. Pembayaran Terlambat */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Pembayaran Terlambat</h2>
            <div className="text-4xl">{overduePayments}</div>
            <div className="text-sm text-gray-500">
              Cicilan hari ini belum bayar
            </div>
          </div>
        </div>

        {/* 4. Pendapatan Hari Ini */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Pendapatan Hari Ini</h2>
            <div className="text-4xl">
              {formatRupiah(revenueToday)}
            </div>
            <div className="text-sm text-gray-500">Total penerimaan</div>
          </div>
        </div>
      </div>

        {/* 2.1 Payment Trend */}
        <div className="bg-base-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Tren Pembayaran (7 Hari)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={paymentTrendData}>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatRupiah}
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => formatRupiah(value)}
                labelStyle={{ fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 2.2 New Agents & Approvals */}
        <div className="bg-base-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">
            Agen Baru & Disetujui (4 Minggu)
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={agentApprovalData}>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => value}
                labelStyle={{ fontSize: 12 }}
              />
              <Bar
                dataKey="registered"
                name="Registrasi"
                fill="#10B981"
                barSize={20}
              />
              <Bar
                dataKey="approved"
                name="Disetujui"
                fill="#F59E0B"
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 3.2 Recent Payments */}
        <div className="bg-base-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Pembayaran</h2>
          <div className="overflow-auto max-h-48">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Nama Agen</th>
                  <th>ID Cicilan</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.payment_date}</td>
                    <td>{p.installment.agent.name}</td>
                    <td className="text-center">{p.installment_id}</td>
                    <td>{formatRupiah(p.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Quick-Action Buttons */}
        <div className="bg-base-200 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Aksi</h2>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((btn, i) => (
              <button
                key={i}
                className="btn btn-sm btn-primary"
                onClick={btn.onClick}
              >
                {btn.label}
              </button>
            ))}
      </div>

      {/* ───────────── sidebar ───────────── */}
      <aside className="w-full lg:w-80 space-y-8">
        {/* Top 5 Influential Agents */}
        <div className="bg-base-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">
            Ranking Agen yang Paling Berpengaruh
          </h2>

          {/* Algorithm Selection Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {algorithms.map((algo) => (
              <button
                key={algo}
                className={`btn btn-xs ${
                  activeAlgo === algo ? "btn-secondary" : "btn-outline"
                }`}
                onClick={() => setActiveAlgo(algo)}
              >
                {algo}
              </button>
            ))}
          </div>

          {/* Ranked List */}
          <ol className="list-decimal list-inside space-y-1">
            {topInfluential.map((agentName, idx) => (
              <li key={idx} className="text-sm">
                {agentName}
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
      
    </div>
  );
};

export default Dashboard;