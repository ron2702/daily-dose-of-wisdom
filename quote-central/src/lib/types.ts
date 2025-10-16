export type FetchType = "quotes" | "anime";
export type SpecificCategory = "inspirational" | "self-confidence" | "success";

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

export interface QuoteAPIPayload {
  quote: string | null | undefined;
  author: string | null | undefined;
  category?: string | null | undefined;
  type?: string | null | undefined;
}

export interface APIError extends Error {
  status?: number;
}
