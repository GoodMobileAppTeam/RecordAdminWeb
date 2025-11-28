import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminGuard } from "@hooks/useAdminGuard";
import AdminLayout from "@layouts/AdminLayout";
import Alert from "@components/common/Alert";
import { createNotice } from "@api/notice/adminNoticeApi";

export default function NoticeFormPage() {
  useAdminGuard();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await createNotice({ title, content });

      if (res.success && res.data) {
        setSuccessMsg("공지 작성이 완료되었습니다.");
        setTitle("");
        setContent("");
        navigate(`/notices/${res.data.id}`);
      } else {
        setErrorMsg(res.message ?? "공지 작성에 실패했습니다.");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ?? "공지 작성 중 오류가 발생했습니다.";
      setErrorMsg(msg);
    }
  };

  return (
    <AdminLayout title="공지 작성">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        {successMsg && <Alert type="success" message={successMsg} />}
        {errorMsg && <Alert type="error" message={errorMsg} />}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              제목
            </label>
            <input
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              내용
            </label>
            <textarea
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            공지 등록
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
