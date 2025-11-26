export interface NoticeRequest {
  title: string;
  content: string;
}

export interface NoticeResponse {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}
