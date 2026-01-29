import { createContext, useContext, useState, type ReactNode, useMemo } from 'react';
import { photos, seriesData, type Photo } from '../data/photos';
import Lightbox from '../components/Lightbox';

interface SearchContextType {
    isSearchOpen: boolean;
    searchResults: Photo[];
    currentPhotoIndex: number;
    searchQuery: string;
    openSearch: (query: string) => void;
    closeSearch: () => void;
    nextResult: () => void;
    prevResult: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<Photo[]>([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    // Pre-process photos with their series metadata for faster search
    const enrichedPhotos = useMemo(() => {
        return photos.map(photo => {
            const series = seriesData.find(s => s.id === photo.seriesId);
            return {
                ...photo,
                _meta: {
                    seriesTitle: series?.title || '',
                    year: series?.year || '',
                    description: series?.description ? (series.description.fr + ' ' + series.description.en) : '',
                    location: series?.seo_title ? (series.seo_title.fr + ' ' + series.seo_title.en) : ''
                }
            };
        });
    }, []);

    const openSearch = (query: string) => {
        if (!query.trim()) return;

        const q = query.toLowerCase().trim();
        const results = enrichedPhotos.filter(photo => {
            const titleMatch = photo.title.toLowerCase().includes(q);
            const seriesMatch = photo._meta.seriesTitle.toLowerCase().includes(q);
            const yearMatch = photo._meta.year.toLowerCase().includes(q);
            const locMatch = photo._meta.location.toLowerCase().includes(q);
            // Optional: Search in description/captions if needed, keeping it focused for now

            return titleMatch || seriesMatch || yearMatch || locMatch;
        });

        if (results.length > 0) {
            setSearchResults(results);
            setSearchQuery(query);
            setCurrentPhotoIndex(0);
            setIsSearchOpen(true);
        } else {
            // Should be handled by UI (Toast), but here we reset
            alert(`Aucune photo trouvée pour "${query}"`); // Simple fallback
            setSearchResults([]);
            setIsSearchOpen(false);
        }
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchResults([]);
        setSearchQuery('');
    };

    const nextResult = () => {
        if (searchResults.length === 0) return;
        setCurrentPhotoIndex((prev) => (prev + 1) % searchResults.length);
    };

    const prevResult = () => {
        if (searchResults.length === 0) return;
        setCurrentPhotoIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    };

    const currentPhoto = searchResults[currentPhotoIndex];

    return (
        <SearchContext.Provider value={{
            isSearchOpen,
            searchResults,
            currentPhotoIndex,
            searchQuery,
            openSearch,
            closeSearch,
            nextResult,
            prevResult
        }}>
            {children}
            {isSearchOpen && currentPhoto && (
                <Lightbox
                    photo={currentPhoto}
                    onClose={closeSearch}
                    onNext={nextResult}
                    onPrev={prevResult}
                />
            )}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) throw new Error('useSearch must be used within a SearchProvider');
    return context;
};
