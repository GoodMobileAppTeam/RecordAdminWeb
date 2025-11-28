import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@pages/auth/LoginPage";
import DashboardPage from "@pages/dashboard/DashboardPage";
import NoticeFormPage from "@pages/notice/NoticeFormPage";
import NoticeDetailPage from "@pages/notice/NoticeDetailPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="/notices/new" element={<NoticeFormPage />} />
      <Route path="/notices/:noticeId" element={<NoticeDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
