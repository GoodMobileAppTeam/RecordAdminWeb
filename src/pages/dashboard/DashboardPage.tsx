import { Link } from "react-router-dom";
import { useAdminGuard } from "@hooks/useAdminGuard";
import AdminLayout from "@layouts/AdminLayout";

export default function DashboardPage() {
  useAdminGuard();

  return (
    <AdminLayout title="대시보드">
      <div className="grid gap-6 md:grid-cols-2">
        {/* 공지 관리 카드 */}
        <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">공지 관리</h2>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-gray-600">
            서비스 사용자에게 전달할 공지를 작성하고 관리할 수 있습니다.
          </p>
          <Link
            to="/notices/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            공지 작성하기
          </Link>
        </div>

        {/* 관리자 안내 카드 */}
        <div className="group relative overflow-hidden rounded-xl bg-linear-to-br from-gray-50 to-white p-6 shadow-md transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">관리자 안내</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            Record 서비스 운영을 위한 관리자 전용 대시보드입니다.
         </p>
        </div>
      </div>
    </AdminLayout>
  );
}
