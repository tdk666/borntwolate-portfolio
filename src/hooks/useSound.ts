import { useState, useMemo, useCallback } from 'react';

export const useSound = (soundFile: string) => {
    const [isPlaying, setIsPlaying] = useState(false);

    // useMemo to create Audio instance only once
    const audio = useMemo(() => {
        const a = new Audio(soundFile);
        a.loop = true;
        return a;
    }, [soundFile]);

    const toggleSound = useCallback(() => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(e => console.error("La lecture automatique a été bloquée par le navigateur.", e));
        }
        setIsPlaying(prev => !prev);
    }, [isPlaying, audio]);

    return { isPlaying, toggleSound };
};
