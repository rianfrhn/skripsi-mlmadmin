import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/agent">Agent</Link></li>
        <li><Link to="/kendaraan">Kendaraan</Link></li>
        <li><Link to="/cicilan">Pembayaran</Link></li>
        <li><Link to="/laporan">Laporan</Link></li>
        <li><Link to="/settings">Setting Admin</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;