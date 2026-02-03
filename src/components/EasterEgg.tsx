import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const EasterEgg = () => {
    const [searchParams] = useSearchParams();
    const hasTriggered = useRef(false);

    useEffect(() => {
        const source = searchParams.get('utm_source');

        if (source === 'moltbook' && !hasTriggered.current) {
            hasTriggered.current = true; // Prevent double-fire in Strict Mode

            setTimeout(() => {
                console.log('Easter Egg Triggered! 🐰');
                toast("👋 Bienvenue, visiteur du futur.", {
                    icon: '🤖',
                    style: {
                        borderRadius: '10px',
                        background: '#1A1A1A',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)', // Matrix glow
                        fontFamily: 'monospace',
                        zIndex: 99999,
                    },
                    duration: 6000,
                });
            }, 1500);
        }
    }, [searchParams]);

    return null;
};
