export interface ApiError {
  field: string;
  message: string;
}

export interface MetaData {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PagedData<T> {
  items: T[];
  metaData: MetaData;
}

export interface ApiResponse<T = void> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  errors?: ApiError[];
}

export type PaginatedResponse<T> = ApiResponse<PagedData<T>>;
