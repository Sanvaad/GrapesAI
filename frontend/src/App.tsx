import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";

import { PatientsPage } from "./pages/Patients";
import AnalysisPage from "./pages/AnalysisPage";
import { SettingsPage } from "./pages/SettingsPage";
import Appointments from "./pages/Appointments";
import { ReportsPage } from "./pages/ReportsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/analytics" element={<AnalysisPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
