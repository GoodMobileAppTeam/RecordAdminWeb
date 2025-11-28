import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@api/auth/adminAuthApi";
import Logo from "@components/common/Logo";

interface AdminLayoutProps {
  title?: string;
  children: ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-6">
          {/* 로고 사용 */}
          <Logo variant="header" to="/" />

          {/* 네비게이션 */}
          <nav className="flex items-center gap-3 text-sm text-gray-600">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-blue-600 ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              대시보드
            </NavLink>

            <NavLink
              to="/notices/new"
              className={({ isActive }) =>
                `hover:text-blue-600 ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              공지 작성
            </NavLink>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
        >
          로그아웃
        </button>
      </header>

      <main className="mx-auto mt-6 w-full max-w-5xl px-4">
        {title && (
          <h1 className="mb-4 text-xl font-semibold text-gray-800">{title}</h1>
        )}
        {children}
      </main>
    </div>
  );
}
