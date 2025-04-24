import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';

// Import page components
import Dashboard from './pages/Dashboard';
import Agent from './pages/Agents';
import Kendaraan from './pages/Kendaraan';
import Cicilan from './pages/Cicilan';
import Komisi from './pages/Komisi';
import Laporan from './pages/Laporan';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
    <Router>
      <div className="drawer drawer-mobile">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <TopNav />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/kendaraan" element={<Kendaraan />} />
              <Route path="/cicilan" element={<Cicilan />} />
              <Route path="/komisi" element={<Komisi />} />
              <Route path="/laporan" element={<Laporan />} />
              <Route path="/settings" element={<AdminSettings />} />
            </Routes>
          </div>
        </div>
        
      <Sidebar />
      </div>
    </Router>
  );
}

export default App;