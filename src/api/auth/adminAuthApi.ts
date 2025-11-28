import { axiosClient } from "@api/axiosClient";
import type { BaseResponse } from "@/types/base/baseResponse";
import type { AdminLoginRequest } from "@/types/admin/auth";

// 로그인
export async function login(
  request: AdminLoginRequest
): Promise<BaseResponse<void>> {
  const response = await axiosClient.post("/api/admin/login", request);
  return response.data;
}

// 관리자 로그인 상태 확인(세션 방식이라 확인 필요)
export async function checkAdminAuth(): Promise<BaseResponse<boolean>> {
  const response = await axiosClient.get("/api/admin/auth/check");
  return response.data;
}

// 로그아웃
export async function logout(): Promise<BaseResponse<void>> {
  const response = await axiosClient.post("/api/admin/logout");
  return response.data;
}
