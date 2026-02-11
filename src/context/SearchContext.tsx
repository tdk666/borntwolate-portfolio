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

            const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const normalizedQuery = normalize(query);

            // 0. PRIORITY: Exact Title Match (Surgical Precision)
            // If the user types the exact title, we return ONLY that photo.
            const exactMatch = photos.find(p => normalize(p.title) === normalizedQuery);
            if (exactMatch) {
                console.log(`🎯 Exact Match Found: ${exactMatch.title}`);
                setSearchResults([exactMatch]);
                setIsSearching(true);
                setLastQuery(query);
                return;
            }

            const results = photos.filter((photo) => {
                // Prepare searchable text fields
                const texts = [
                    photo.title,
                    photo.technical_info,
                    photo.category,
                    photo.caption_artistic?.fr,
                    photo.caption_artistic?.en,
                    photo.alt_accessible?.fr,
                    photo.alt_accessible?.en,
                    ...(photo.tags || [])
                ].filter(Boolean).map(t => normalize(t as string));

                // 1. Direct Match (Query inside any text)
                const directMatch = texts.some(text => text.includes(normalizedQuery));

                // 2. Semantic Tag Match (AI Tag inside any text)
                const tagMatch = aiTags.some(aiTag => {
                    const normTag = normalize(aiTag);
                    return texts.some(text => text.includes(normTag));
                });

                return directMatch || tagMatch;
            });

            console.log(`Found ${results.length} results for "${query}"`);
            setSearchResults(results);
        } catch (criticalError) {
            console.error("CRITICAL SEARCH ERROR:", criticalError);
            setSearchResults([]);
        }
        // DO NOT reset isSearching here, otherwise the UI reverts to "All" mode.
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
