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

// Fonction utilitaire pour ignorer les accents et la casse
// Ex: "Montréal" -> "montreal"
const normalizeText = (text: string) => {
    return text
        .normalize("NFD") // Décompose les caractères (é -> e + ´)
        .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques (accents)
        .toLowerCase()
        .trim();
};

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

        const q = normalizeText(query);
        const results = enrichedPhotos.filter(photo => {
            const titleMatch = normalizeText(photo.title).includes(q);
            const seriesMatch = normalizeText(photo._meta.seriesTitle).includes(q);
            const yearMatch = normalizeText(photo._meta.year).includes(q);
            const locMatch = normalizeText(photo._meta.location).includes(q);
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
