import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { getSemanticTags } from '../services/gemini';
import { photos } from '../data/photos';
import type { Photo } from '../data/photos';

interface SearchContextType {
    isSearching: boolean;
    searchResults: Photo[];
    performSearch: (query: string) => Promise<void>;
    openSearch: (query: string) => void; // Added for Navbar compatibility
    resetSearch: () => void;
    lastQuery: string;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<Photo[]>([]);
    const [lastQuery, setLastQuery] = useState('');

    const performSearch = async (query: string) => {
        if (!query.trim()) {
            resetSearch();
            return;
        }

        setIsSearching(true);
        setLastQuery(query);

        try {
            const aiTags = await getSemanticTags(query);
            console.log(`🤖 AI Tags for "${query}":`, aiTags);

            const results = photos.filter((photo) => {
                const titleMatch = photo.title.toLowerCase().includes(query.toLowerCase());
                const tagMatch = aiTags.some(aiTag =>
                    photo.tags?.some(pTag => pTag.toLowerCase().includes(aiTag))
                );
                return titleMatch || tagMatch;
            });

            setSearchResults(results);
        } catch (criticalError) {
            console.error("CRITICAL SEARCH ERROR:", criticalError);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const resetSearch = () => {
        setSearchResults([]);
        setIsSearching(false);
        setLastQuery('');
    };

    return (
        <SearchContext.Provider value={{
            isSearching,
            searchResults,
            performSearch,
            openSearch: performSearch, // Link openSearch to performSearch
            resetSearch,
            lastQuery
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
