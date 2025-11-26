import { axiosClient } from "../axiosClient";
import type { BaseResponse } from "../../types/base/baseResponse";
import type { NoticeRequest, NoticeResponse } from "../../types/admin/notice";

export async function createNotice(
  request: NoticeRequest
): Promise<BaseResponse<NoticeResponse>> {
  const response = await axiosClient.post("/api/admin/notices", request);
  return response.data;
}
