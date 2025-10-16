'use client';

import React from 'react';
import { Quote } from '@/lib/types';
import { QuoteIcon } from '@/components/icons/QuoteIcon';

interface QuoteCardProps {
    quoteData: Quote;
    isLoading: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quoteData, isLoading }) => {
    
    const cardClasses = `
        relative 
        dark:bg-gray-800
        p-8 md:p-12 
        rounded-2xl 
        shadow-xl 
        max-w-xl 
        w-full 
        transition-opacity 
        duration-500
        ${isLoading ? 'opacity-50 blur-sm pointer-events-none' : 'opacity-100'}
    `;

    if (!quoteData.quote && !isLoading) {
        return (
            <div className={cardClasses}>
              <p className="text-xl text-red-500 text-center">The quote could not be loaded. Please check the log.</p>
            </div>
        );
    }

    return (
        <div className={cardClasses}> 
            <QuoteIcon />
            <div className="relative z-10">
                <p 
                  className="text-white text-2xl md:text-3xl italic font-serif text-center mb-6 leading-relaxed" 
                >
                  {quoteData.quote}
                </p>
                
                <footer className="text-right border-t border-gray-200 pt-4 mt-6">
                    <p className="text-lg font-bold text-teal-600">
                      — {quoteData.author}
                    </p>
                </footer>
            </div>
        </div>
    );
};