// src/pages/admin/NoticeDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminGuard } from "@hooks/useAdminGuard";
import AdminLayout from "@layouts/AdminLayout";
import Alert from "@components/common/Alert";
import { getNoticeById } from "@api/notice/adminNoticeApi";
import type { NoticeResponse } from "@/types/admin/notice";

export default function NoticeDetailPage() {
  useAdminGuard();
  const navigate = useNavigate();
  const { noticeId } = useParams<{ noticeId: string }>();

  const [notice, setNotice] = useState<NoticeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!noticeId) return;

    (async () => {
      try {
        setLoading(true);
        setErrorMsg(null);

        const res = await getNoticeById(Number(noticeId));

        if (res.success && res.data) {
          setNotice(res.data);
        } else {
          setErrorMsg(res.message ?? "공지 정보를 불러오지 못했습니다.");
        }
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ??
          "공지 정보를 불러오는 중 오류가 발생했습니다.";
        setErrorMsg(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [noticeId]);

  const handleBack = () => {
    // 나중에 공지 리스트 페이지 생기면 거기로 보내고,
    // 지금은 일단 대시보드로
    navigate("/");
  };

  const formatDate = (iso: string) => {
    // createdAt: "2025-11-25T10:20:30" 이런 형식일 때
    return iso.replace("T", " ").substring(0, 16);
  };

  return (
    <AdminLayout title="공지 상세">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
          >
            ← 뒤로
          </button>
        </div>

        {loading && (
          <p className="text-sm text-gray-500">공지 정보를 불러오는 중...</p>
        )}

        {!loading && errorMsg && <Alert type="error" message={errorMsg} />}

        {!loading && notice && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {notice.title}
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                ID: {notice.id} ·{" "}
                {notice.createdAt ? formatDate(notice.createdAt) : ""}
              </p>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="whitespace-pre-line text-sm text-gray-800">
              {notice.content}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
