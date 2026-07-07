// App.js - TyreChain v3 Routing
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

/** Protected route — redirects to login if no demo session */
function PrivateRoute({ children }) {
  const demoSession = localStorage.getItem('demoSession');
  return demoSession ? children : <Navigate to="/" replace />;
}

/** Public route — redirects to dashboard if already logged in */
function PublicRoute({ children }) {
  const demoSession = localStorage.getItem('demoSession');
  return demoSession ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
