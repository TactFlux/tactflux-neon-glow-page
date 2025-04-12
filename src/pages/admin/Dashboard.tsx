
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-6">Willkommen im Admin-Bereich!</p>
        <p className="mb-8 text-gray-600">
          Dies ist ein Platzhalter für das eigentliche Dashboard.
        </p>
        <Button onClick={() => navigate("/")}>Zurück zur Startseite</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
