import { apiClient } from "../lib/axios";
import type { ApiResponse } from "../types/api";

export const mediaApi = {
  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return apiClient.post<ApiResponse<string>, ApiResponse<string>>("/api/Media/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
