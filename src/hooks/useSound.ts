import { useState, useMemo, useCallback, useEffect } from 'react';

interface UseSoundOptions {
    loop?: boolean;
    volume?: number;
}

export const useSound = (soundFile: string, { loop = false, volume = 0.5 }: UseSoundOptions = {}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const audio = useMemo(() => {
        const a = new Audio(soundFile);
        a.loop = loop;
        a.volume = volume;
        return a;
    }, [soundFile, loop, volume]);

    useEffect(() => {
        return () => {
            audio.pause();
        };
    }, [audio]);

    const play = useCallback(() => {
        if (!loop) {
            // eslint-disable-next-line react-hooks/immutability
            audio.currentTime = 0;
        }
        audio.play().catch(e => console.debug("Audio autoplay blocked (normal behavior until interaction):", e));
        if (loop) setIsPlaying(true);
    }, [audio, loop]);

    const stop = useCallback(() => {
        audio.pause();
        if (loop) setIsPlaying(false);
    }, [audio, loop]);

    const toggle = useCallback(() => {
        if (isPlaying) stop();
        else play();
    }, [isPlaying, play, stop]);

    return { play, stop, toggle, isPlaying };
};
