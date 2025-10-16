import { Quote, FetchParams } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_RAPIDAPI_URL;
const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;

export async function fetchRandomQuote(params: FetchParams): Promise<Quote> {

  if (!BASE_URL || !API_KEY || !API_HOST) {
    throw new Error('API configuration is missing. Please set the environment variables.');
  }

  let endpoint: string;

  switch (params.fetchType) {
    case 'anime':
      endpoint = `${BASE_URL}/anime`;
      break;
    case 'quotes':
    default:
      endpoint = `${BASE_URL}`; 
      break;
  }

  const url = endpoint;

  const options: RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST,
    },
    next: { revalidate: 0 }
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText} en ${url}`);
    }

    const data = await response.json();

    const quote: Quote = {
      quote: data.quote,
      author: data.author,
      category: data.category,
      type: data.type
    }
    return quote;
  } catch (error) {
    console.error('FETCH ERROR:', error);
    return {
      quote: 'Oh oh something happened. Please try again later.',
      author: 'Unknown',
      category: params.category || params.fetchType
    };
  }

}