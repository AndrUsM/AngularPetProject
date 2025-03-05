export type EntitySort = 'asc' | 'desc';

export interface EntityQueryParams {
  limit?: number;
  skip?: number;
  select?: string[];
  sortBy?: string;
  order?: EntitySort;
  q?: string;
}