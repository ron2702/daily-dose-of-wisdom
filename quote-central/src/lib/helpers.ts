import { FetchParams, SpecificCategory, FetchType } from './types';

/**
 * Category options and helper functions for fetching quotes.
 */
export const categoryOptions: { label: string, fetchType: FetchType, category?: SpecificCategory }[] = [
    { label: 'Wisdom of Legends', fetchType: 'quotes' },
    { label: 'Shonen Philosophy', fetchType: 'anime' },
];

export const getFetchParams = (selectedLabel: string): FetchParams => {
    const option = categoryOptions.find(opt => opt.label === selectedLabel);

    if (!option) return { fetchType: 'quotes' }; 

    return { 
        fetchType: option.fetchType, 
        category: option.category 
    };
};

export const INITIAL_QUOTE_LABEL = 'Wisdom of Legends';