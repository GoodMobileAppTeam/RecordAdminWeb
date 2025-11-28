import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdminAuth } from "@api/auth/adminAuthApi";

export function useAdminGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdminAuth = async () => {
      try {
        const response = await checkAdminAuth();

        if (!response.success || !response.data) {
          navigate("/login");
        }
      } catch {
        // api에 문제가 있는경우도 로그인 페이지로 이동
        navigate("/login");
      }
    };

    verifyAdminAuth();
  }, [navigate]);
}
