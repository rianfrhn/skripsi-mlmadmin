import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from './pages/Dashboard';
import Kendaraan from './pages/Kendaraan';
import Cicilan from './pages/Cicilan';
import Komisi from './pages/Komisi';
import Laporan from './pages/Laporan';
import AdminSettings from './pages/AdminSettings';
import LoginPage from './pages/LoginPage';
import Agents from './pages/Agents';

function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen">
      {isAuthPage ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* Optionally: <Route path="/register" element={<RegisterPage />} /> */}
        </Routes>
      ) : (
        <div className="drawer drawer-mobile">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <TopNav />
            <div className="p-6">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/agent"
                  element={
                    <PrivateRoute>
                      <Agents />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cicilan"
                  element={
                    <PrivateRoute>
                      <Cicilan />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/kendaraan"
                  element={
                    <PrivateRoute>
                      <Kendaraan />
                    </PrivateRoute>
                  }
                />
                
                <Route
                  path="/laporan"
                  element={
                    <PrivateRoute>
                      <Laporan />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
          <Sidebar />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}