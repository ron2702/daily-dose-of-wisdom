'use client';

import React from 'react';
import { Quote } from '@/lib/types'; 

const QuoteIcon = () => (
    <svg 
        className="w-8 h-8 text-teal-500 absolute top-4 left-4 opacity-70" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M13.882 12.012c0-3.376 2.502-6.195 5.753-6.195V2.5C14.47 2.5 10.5 6.94 10.5 12.012v4.234c0 1.25.962 2.254 2.146 2.254h4.312c1.183 0 2.146-1.004 2.146-2.254v-1.956h-5.253zm-9.317 0c0-3.376 2.503-6.195 5.754-6.195V2.5C5.153 2.5 1.17 6.94 1.17 12.012v4.234c0 1.25.962 2.254 2.146 2.254h4.312c1.183 0 2.146-1.004 2.146-2.254v-1.956H4.565z"/>
    </svg>
);

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
                <p className="text-xl text-red-500 text-center">No se pudo cargar la cita. Revisa el log.</p>
            </div>
        );
    }

    return (
        <div className={cardClasses}> 
            <QuoteIcon />
            <div className="relative z-10">
                <p 
                    // Texto principal más grande y centrado
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