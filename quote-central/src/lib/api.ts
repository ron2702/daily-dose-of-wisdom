import { Quote, FetchParams, QuoteAPIPayload, APIError } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_RAPIDAPI_URL;
const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;

const ENDPOINT_MAP: Record<FetchParams["fetchType"], string> = {
  anime: "anime",
  quotes: "",
};

/**
 * Convert the data from the API into our Quote interface.
 */
function normalizeQuoteData(data: QuoteAPIPayload): Quote {
  if (!data || !data.quote || !data.author) {
    throw new Error("API returned malformed data (missing quote or author).");
  }

  return {
    quote: data.quote,
    author: data.author,
    category: data.category || "unknown",
    type: data.type || "random",
  };
}

/**
 * Fetch a random quote from the API.
 * @param params
 * @returns
 */
export async function fetchRandomQuote(params: FetchParams): Promise<Quote> {
  if (!BASE_URL || !API_KEY || !API_HOST) {
    throw new Error(
      "CONFIG ERROR: RAPIDAPI environment variables are missing (NEXT_PUBLIC_...)."
    );
  }

  const path = ENDPOINT_MAP[params.fetchType] || "";
  const url = `${BASE_URL}/${path}`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST,
    },
    next: { revalidate: 0 },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = `API Fetch failed: Status ${response.status}. URL: ${url}.`;
      let errorDetails = "";

      try {
        const errorJson = await response.json();

        // Si existe el mensaje de cuota, lo usamos
        if (errorJson.message) {
          errorDetails = errorJson.message;
        } else {
          errorDetails = JSON.stringify(errorJson);
        }
      } catch (e) {
        errorDetails = await response.text();
      }

      const fullError: APIError = new Error(
        `${errorMessage} Details: ${errorDetails}`
      );
      fullError.status = response.status;

      throw fullError;
    }

    const data = await response.json();
    return normalizeQuoteData(data);
  } catch (error) {
    console.error("FETCH ERROR in api.ts:", error);

    if (error instanceof Error) {
      throw new Error(`Failed to fetch quote: ${error.message}`);
    }
    throw new Error("An unknown network error occurred.");
  }
}
