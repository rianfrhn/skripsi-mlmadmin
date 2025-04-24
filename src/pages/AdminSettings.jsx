import React from 'react';

const AdminSettings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Setting Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-base-200 shadow-xl p-6 rounded-md">
          <h2 className="font-bold mb-2">Setting Admin</h2>
          <p>[Placeholder: Settingan Admin]</p>
        </div>
        <div className="bg-base-200 shadow-xl p-6 rounded-md">
          <h2 className="font-bold mb-2">User & Role</h2>
          <p>[Placeholder: User & Role Situs Admin]</p>
        </div>
        <div className="bg-base-200 shadow-xl p-6 rounded-md">
          <h2 className="font-bold mb-2">Pembayaran & Transaksi</h2>
          <p>[Placeholder: Konfigurasi Transaksi]</p>
        </div>
        <div className="bg-base-200 shadow-xl p-6 rounded-md">
          <h2 className="font-bold mb-2">Audit</h2>
          <p>[Placeholder: Audit Log]</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;