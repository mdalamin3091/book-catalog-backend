export type IGenericResponseType<T> = {
  meta: {
    page: number;
    size: number;
    total: number;
    totalPages?: number;
    previousPage?: number | null;
    nextPage?: number | null;
  };
  data: T;
};
