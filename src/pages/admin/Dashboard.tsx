
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

const AdminDashboard = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-tactflux-dark text-white">
        <header className="p-6 border-b border-tactflux-border">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </header>
        
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-tactflux-card p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Übersicht</h2>
              <p>Willkommen im Admin-Dashboard.</p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
