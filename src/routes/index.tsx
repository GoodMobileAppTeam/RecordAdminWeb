import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import NoticeFormPage from "../pages/notice/NoticeFormPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="/notices/new" element={<NoticeFormPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
