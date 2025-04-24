import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Sales</h2>
            <div className="text-4xl">Rp12345678</div>
            <div className="text-sm text-gray-500">Placeholder data</div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Agent Aktif</h2>
            <div className="text-4xl">7</div>
            <div className="text-sm text-gray-500">data</div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Cicilan Tertunda</h2>
            <div className="text-4xl">12</div>
            <div className="text-sm text-gray-500">data</div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Inventori Kendaraan</h2>
            <div className="text-4xl">2</div>
            <div className="text-sm text-gray-500">data</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="bg-base-200 p-6 rounded-md shadow-xl">
          <h2 className="font-bold mb-2">Jaringan</h2>
          <p className="text-gray-600">Placeholder grafik</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;