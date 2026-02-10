import { createContext, useContext, useState, type ReactNode, useMemo } from 'react';
import { photos, seriesData, type Photo } from '../data/photos';
import { getSemanticTags } from '../services/gemini';
import Lightbox from '../components/Lightbox';

interface SearchContextType {
    isSearchOpen: boolean;
    isSearching: boolean; // Added
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
const normalizeText = (text: string | null | undefined) => {
    if (!text) return "";
    return String(text)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false); // New loading state
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
                    description: (series?.description?.fr || '') + ' ' + (series?.description?.en || ''),
                    location: (series?.seo_title?.fr || '') + ' ' + (series?.seo_title?.en || '')
                }
            };
        });
    }, []);

    const openSearch = async (query: string) => {
        if (!query.trim()) return;

        setIsSearchOpen(true);
        setSearchQuery(query);
        setSearchResults([]);
        setIsSearching(true); // Start loading

        try {
            // V2: Semantic Search via Gemini
            let semanticTags: string[] = [];

            // WRAPPED TRY-CATCH for Service Call
            try {
                semanticTags = await getSemanticTags(query);
            } catch (err) {
                console.warn("Context: Semantic Search Service Failed (Should satisfy 'never crash' rule)", err);
                semanticTags = []; // Default to empty
            }

            console.debug("Semantic Tags:", semanticTags);

            const q = normalizeText(query);

            const results = enrichedPhotos.filter(photo => {
                // Safeguard against undefined data
                const titleMatch = normalizeText(photo?.title).includes(q);
                const seriesMatch = normalizeText(photo?._meta?.seriesTitle).includes(q);
                const yearMatch = normalizeText(photo?._meta?.year).includes(q);
                const locMatch = normalizeText(photo?._meta?.location).includes(q);

                // Semantic matching
                const isSemanticMatch = Array.isArray(semanticTags) && semanticTags.length > 0 && semanticTags.some(tag => {
                    const normTag = normalizeText(tag);
                    if (!normTag) return false;

                    return (
                        normalizeText(photo.title).includes(normTag) ||
                        normalizeText(photo.category).includes(normTag) ||
                        normalizeText(photo._meta.description).includes(normTag) ||
                        (photo.caption_artistic && normalizeText(photo.caption_artistic?.fr).includes(normTag))
                    );
                });

                return titleMatch || seriesMatch || yearMatch || locMatch || isSemanticMatch;
            });

            if (results.length > 0) {
                setSearchResults(results);
                setCurrentPhotoIndex(0);
            } else {
                // Logic for 0 results handled by UI consuming context or transient alert
                // For now, consistent with legacy behavior
                // alert(`Aucune photo trouvée pour "${query}"`); // Removed to avoid blocking UI thread on "crash" feeling
                console.log(`Aucune photo trouvée pour "${query}"`);
            }
        } catch (e) {
            console.error("Critical Search Context Error:", e);
        } finally {
            setIsSearching(false); // ALWAYS reset loading
        }
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchResults([]);
        setSearchQuery('');
        setIsSearching(false);
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
            isSearching, // Exposed
            openSearch,
            closeSearch,
            nextResult,
            prevResult
        }}>
            {children}
            {isSearchOpen && (
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
