import { useState, useMemo, useCallback, useEffect } from 'react';

interface UseSoundOptions {
    loop?: boolean;
    volume?: number;
}

export const useSound = (soundFile: string, { loop = false, volume = 0.5 }: UseSoundOptions = {}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const audio = useMemo(() => {
        if (typeof window === 'undefined') return null;
        const a = new Audio();
        a.src = soundFile;
        a.loop = loop;
        a.volume = volume;
        a.preload = 'none'; // PERFORMANCE: Do not preload automatically to avoid 404s on missing assets
        return a;
    }, [soundFile, loop, volume]);

    useEffect(() => {
        return () => {
            audio?.pause();
        };
    }, [audio]);

    const play = useCallback(() => {
        if (!audio) return;
        if (!loop) {
            // eslint-disable-next-line react-hooks/immutability
            audio.currentTime = 0;
        }
        audio.play().catch(e => console.debug("Audio autoplay blocked (normal behavior until interaction):", e));
        if (loop) setIsPlaying(true);
    }, [audio, loop]);

    const stop = useCallback(() => {
        audio?.pause();
        if (loop) setIsPlaying(false);
    }, [audio, loop]);

    const toggle = useCallback(() => {
        if (isPlaying) stop();
        else play();
    }, [isPlaying, play, stop]);

    return { play, stop, toggle, isPlaying };
};
