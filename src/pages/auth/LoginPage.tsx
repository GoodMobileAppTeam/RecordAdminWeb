import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@api/auth/adminAuthApi";
import Alert from "@components/common/Alert";
import TextInput from "@components/common/TextInput";
import RecordLoginBackground from "@components/common/RecordLoginBackground";
import Logo from "@components/common/Logo";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login({ username, password });
      if (res.success) {
        navigate("/");
      } else {
        setError(res.message || "로그인에 실패했습니다.");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "로그인 중 오류가 발생했습니다.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page relative flex min-h-screen flex-col overflow-hidden">
      {/* 배경 */}
      <RecordLoginBackground />

      {/* 상단 로고 */}
      <header className="relative z-10 flex justify-start px-6 pt-6">
        <Logo variant="login" to="/" />
      </header>

      {/* 🔥 form 태그 적용 */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="login-card w-full max-w-md rounded-xl bg-white pt-10 px-8 pb-16 shadow-sm"
        >
          {/* 제목 영역 */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
          </div>

          {error && <Alert type="error" message={error} />}

          <div className="space-y-4">
            {/* 아이디 */}
            <div className="input-group">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                아이디
              </label>
              <input
                className="login-input w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="아이디를 입력하세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* 비밀번호 */}
            <div className="input-group">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div className="relative">
                <input
                  className="login-input w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="비밀번호를 입력하세요"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {/* 비밀번호 보기 버튼 */}
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={handleShowPassword}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="login-button mt-6 w-full cursor-pointer rounded-md bg-blue-600 py-2.5 text-white font-medium shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-blue-300 pointer-events-auto"
            >
              {loading ? "로그인 중..." : "Login"}
            </button>
          </div>
        </form>
      </main>

      {/* 하단 푸터 */}
      <footer className="relative z-10 flex items-center justify-between px-6 pb-6 text-sm text-gray-500">
        <div>© Made with bikooju</div>
        <span className="hover:text-gray-300">Record Admin Web</span>
      </footer>
    </div>
  );
}
