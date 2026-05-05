import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/features/auth/LoginPage";
import RegisterPage from "@/features/auth/RegisterPage";
import DashboardPage from "@/features/dashboard/DashboardPage";
import OrganizationsPage from "@/features/organizations/OrganizationsPage";
import UsersPage from "@/features/users/UsersPage";
import SettingsPage from "@/features/settings/SettingsPage";
import WorkflowsPage from "@/features/workflows/pages/WorkflowsPage";
import WorkflowFormPage from "@/features/workflows/pages/WorkflowFormPage";
import WorkflowDetailsPage from "@/features/workflows/pages/WorkflowDetailsPage";
import HomePage from "./HomePage";
import AppLayout from "./layouts/AppLayout";

// import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
         {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

         {/* APP SHELL -> NESTED ROUTES*/}
        <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="organizations" element={<OrganizationsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="workflows" element={<WorkflowsPage />} />
            <Route path="workflows/new" element={<WorkflowFormPage />} />
            <Route path="workflows/:id" element={<WorkflowDetailsPage />} />
            <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route
          path="/dashboard"
        />
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}