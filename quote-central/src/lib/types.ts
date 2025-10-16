export type FetchType = 'quotes' | 'anime';
export type SpecificCategory = 'inspirational' | 'self-confidence' | 'success'

export interface Quote {
  quote: string;
  author: string;
  category?: string;
  type?: string;
}

export interface FetchParams {
    fetchType: FetchType;
    category?: SpecificCategory;
}