import React from 'react';
import { categoryOptions } from '@/lib/helpers';

interface CategorySelectorProps {
    selectedLabel: string;
    isLoading: boolean;
    onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
    selectedLabel,
    isLoading,
    onCategoryChange,
}) => (
    <div className="mb-8 w-full max-w-xs">
        <label htmlFor="quote-category" className="block text-sm font-medium text-gray-300 mb-2">
            Choose Your Muse:
        </label>
        <select
            id="quote-category"
            onChange={onCategoryChange}
            value={selectedLabel}
            className="w-full p-2 border border-gray-600 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500"
            disabled={isLoading}
        >
            {categoryOptions.map(opt => (
                <option key={opt.label} value={opt.label}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);