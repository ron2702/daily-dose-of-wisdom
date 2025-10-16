'use client';

import React, { useState, useCallback, useEffect } from 'react'; // <--- Importar useEffect
import { Quote, FetchParams, SpecificCategory, FetchType } from '@/lib/types';
import { fetchRandomQuote } from '@/lib/api';
import { QuoteCard } from './QuoteCard';

const categoryOptions: { label: string, fetchType: FetchType, category?: SpecificCategory }[] = [
    { label: 'Famous Quotes', fetchType: 'quotes' },
    { label: 'Anime Wisdom', fetchType: 'anime' },
];

const getFetchParams = (selectedLabel: string): FetchParams => {
    const option = categoryOptions.find(opt => opt.label === selectedLabel);

    if (!option) return { fetchType: 'quotes' };

    return { 
        fetchType: option.fetchType, 
        category: option.category 
    };
};

export const QuoteGenerator: React.FC = () => {

  const initialLabel = 'Famous Quotes';
  const initialParams = getFetchParams(initialLabel);

  const [quoteData, setQuoteData] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(initialLabel); 
  const [error, setError] = useState<string | null>(null);

  const fetchNewQuote = useCallback(async (paramsToFetch: FetchParams) => {
        setIsLoading(true);
        setError(null);
        setQuoteData(prev => prev ? { ...prev, quote: 'Cargando...' } : null);

        try {
            const newQuote = await fetchRandomQuote(paramsToFetch);
            setQuoteData(newQuote);
        } catch (e) {
            console.error("Error fetching new quote:", e);
            setError('Error al obtener la cita. Inténtalo de nuevo.');
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
    }

  if (!quoteData && isLoading) {
        return <div className="text-center text-gray-700 text-xl">Loading...</div>
  }

  return (
        <section className="flex flex-col items-center w-full max-w-2xl">
            
            <div className="mb-8 w-full">
                <label htmlFor="quote-category" className="block text-lg font-medium text-gray-700 mb-2">
                    Select Quote Category:
                </label>
                <select
                    id="quote-category"
                    onChange={handleCategoryChange}
                    value={selectedLabel}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 text-gray-800"
                    disabled={isLoading}
                >
                    {categoryOptions.map(opt => (
                        <option key={opt.label} value={opt.label}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            
            {error && <p className="text-xl text-red-500 mb-4">{error}</p>}
            
            {quoteData && <QuoteCard quoteData={quoteData} isLoading={isLoading} />}
            
            <button
                onClick={() => handleGenerateClick()}
                disabled={isLoading}
                className={`
                    mt-8 px-8 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition duration-300 ease-in-out
                    ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 transform hover:scale-105'}
                `}
            >
                {isLoading ? 'Loading...' : 'Generate New Quote'}
            </button>

        </section>
    );

}