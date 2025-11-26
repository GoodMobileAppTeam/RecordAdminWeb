import { axiosClient } from "./axiosClient";
import type { BaseResponse } from "../types/base/baseResponse";
import type { AdminLoginRequest } from "../types/admin/auth";
import type { NoticeRequest } from "../types/admin/notice";

export async function adminLogin(
  request: AdminLoginRequest
): Promise<BaseResponse<void>> {
  const response = await axiosClient.post("/api/admin/login", request);
  return response.data;
}
