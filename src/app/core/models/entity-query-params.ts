export interface EntityQueryParams {
  limit?: number;
  skip?: number;
  select?: string[];
  sortBy?: string;
  order?: 'asc' | 'desc'
}