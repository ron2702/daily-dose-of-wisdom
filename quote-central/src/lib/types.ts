export type QuoteCategory = 'quotes' | 'animequotes' | 'developerquotes';

export interface Quote {
  id: number;
  quote: string;
  author: string;
  category: string;
}

export interface ApiResponse {
    quote: string;
    author: string;
    type: string;
}