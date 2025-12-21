import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface SeriesNavigationProps {
    nextId: string;
    prevId: string;
    isActive: boolean;
}

const SeriesNavigation = ({ nextId, prevId, isActive }: SeriesNavigationProps) => {
    const navigate = useNavigate();

    // KEYBOARD NAVIGATION
    useEffect(() => {
        if (!isActive) return; // Disable if Lightbox is open

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') navigate(`/series/${nextId}`);
            if (e.key === 'ArrowLeft') navigate(`/series/${prevId}`);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextId, prevId, navigate, isActive]);

    // GLOBAL SWIPE NAVIGATION (Mobile)
    // We attach listeners to window to ensure swipe works everywhere, regardless of z-index
    useEffect(() => {
        // Prevent Series Swipe if Lightbox is OPEN (isActive is false when Lightbox is Open - see SeriesDetail.tsx line 109)
        // Wait, let's double check SeriesDetail.tsx logic.
        // Line 109: isActive={selectedPhotoIndex === null}
        // So isActive is TRUE when Lightbox is CLOSED (we are in Overview).
        // So if (!isActive) return; is CORRECT.

        if (!isActive) return;

        let touchStartX = 0;
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;

            const minSwipeDistance = 50;
            const maxVerticalSpread = 100; // Allow some vertical drift but prioritize horizontal

            // Check if horizontal swipe dominates and meets threshold AND isn't a huge vertical scroll
            if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffY) < maxVerticalSpread) {
                if (diffX > 0) navigate(`/series/${nextId}`); // Swipe Left -> Next
                else navigate(`/series/${prevId}`); // Swipe Right -> Prev
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [nextId, prevId, navigate, isActive]);

    return (
        <>
            {/* DESKTOP ARROWS (Hidden by user request - Swipe & Keyword or Footer Link only) */}
            {/* 
            <button
                onClick={() => navigate(`/series/${prevId}`)}
                className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 text-off-white/50 hover:text-off-white hover:scale-110 transition-all duration-300 mix-blend-difference"
                aria-label="Série précédente"
            >
                <ArrowLeft size={48} strokeWidth={1} />
            </button>

            <button
                onClick={() => navigate(`/series/${nextId}`)}
                className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 text-off-white/50 hover:text-off-white hover:scale-110 transition-all duration-300 mix-blend-difference"
                aria-label="Série suivante"
            >
                <ArrowRight size={48} strokeWidth={1} />
            </button>
            */}
        </>
    );
};
export default SeriesNavigation;
