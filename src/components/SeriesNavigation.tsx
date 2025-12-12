import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SeriesNavigationProps {
    nextId: string;
    prevId: string;
}

const SeriesNavigation = ({ nextId, prevId }: SeriesNavigationProps) => {
    const navigate = useNavigate();

    // KEYBOARD NAVIGATION
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') navigate(`/series/${nextId}`);
            if (e.key === 'ArrowLeft') navigate(`/series/${prevId}`);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextId, prevId, navigate]);

    // SWIPE NAVIGATION (Mobile)
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) navigate(`/series/${nextId}`);
        if (isRightSwipe) navigate(`/series/${prevId}`);
    };

    return (
        <>
            {/* SWIPE ZONE (Invisible layer for mobile) */}
            <div
                className="fixed inset-0 z-0 md:hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            />

            {/* DESKTOP ARROWS (Fixed) */}
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
        </>
    );
};

export default SeriesNavigation;
