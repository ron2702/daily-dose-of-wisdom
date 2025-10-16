"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Quote, FetchParams } from "@/lib/types";
import { fetchRandomQuote } from "@/lib/api";
import { QuoteCard } from "@/components/QuoteCard";
import { getFetchParams, INITIAL_QUOTE_LABEL } from "@/lib/helpers";
import { CategorySelector } from "@/components/CategorySelector";

export const QuoteGenerator: React.FC = () => {
  const initialLabel = INITIAL_QUOTE_LABEL;
  const initialParams = getFetchParams(initialLabel);

  const [quoteData, setQuoteData] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(initialLabel);
  const [error, setError] = useState<string | null>(null);

  const fetchNewQuote = useCallback(async (paramsToFetch: FetchParams) => {
    setIsLoading(true);
    setError(null);
    setQuoteData((prev) => (prev ? { ...prev, quote: "Cargando..." } : null));

    try {
      const newQuote = await fetchRandomQuote(paramsToFetch);
      setQuoteData(newQuote);
    } catch (e) {
      console.error("Error fetching new quote:", e);

      let userMessage =
        "An unexpected error occurred while fetching the quote.";
      if (e instanceof Error) {
        if (
          e.message.includes("DAILY quota") ||
          e.message.includes("Status 429")
        ) {
          userMessage = "API rate limit exceeded. Please try again tomorrow.";
        } else if (e.message) {
          userMessage = `API error: ${e.message.substring(0, 100)}...`;
        }
      }

      setError(userMessage);
      setQuoteData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewQuote(initialParams);
  }, [fetchNewQuote]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedLabel = e.target.value;
    setSelectedLabel(newSelectedLabel);
  };

  const handleGenerateClick = () => {
    const paramsToFetch = getFetchParams(selectedLabel);
    fetchNewQuote(paramsToFetch);
  };

  if (!quoteData && isLoading) {
    return <div className="text-center text-gray-700 text-xl">Loading...</div>;
  }

  return (
    <section className="flex flex-col items-center w-full max-w-2xl">
      <CategorySelector
        selectedLabel={selectedLabel}
        isLoading={isLoading}
        onCategoryChange={handleCategoryChange}
      />

      {error && <p className="text-xl text-red-400 mb-4">{error}</p>}

      {quoteData && <QuoteCard quoteData={quoteData} isLoading={isLoading} />}

      <button
        onClick={() => handleGenerateClick()}
        disabled={isLoading}
        className={`
                    mt-8 px-8 py-3 rounded-full text-white text-lg font-semibold shadow-xl transition duration-300 ease-in-out
                    ${
                      isLoading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-500 transform hover:scale-105"
                    }
                `}
      >
        {isLoading ? "Loading..." : "Generate New Quote"}
      </button>
    </section>
  );
};
