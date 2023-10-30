export interface PaginatedResponse<T> {
    page: number;
    lengthPerPage: number;
    total: number;
    data: T[];
}