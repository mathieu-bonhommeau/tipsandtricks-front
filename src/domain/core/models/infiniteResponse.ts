export interface InfiniteResponse<T> {
    start: number;
    length: number;
    data: T[];
}
