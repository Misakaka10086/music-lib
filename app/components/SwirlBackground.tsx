'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function SwirlBackground() {
    const allScriptsLoaded = useRef<boolean>(false);
    const scriptCount = useRef<number>(0);

    const handleScriptLoad = () => {
        scriptCount.current += 1;
        if (scriptCount.current === 2) {
            allScriptsLoaded.current = true;
            // Initialize the effect
            try {
                (window as any).initSwirl?.();
            } catch (error) {
                console.error('Failed to initialize swirl effect:', error);
            }
        }
    };

    return (
        <>
            <Script 
                src="/js/noise.min.js" 
                strategy="afterInteractive" 
                onLoad={handleScriptLoad}
                onError={(e) => console.error('Failed to load noise.min.js:', e)}
            />
            <Script 
                src="/js/swirl.js" 
                strategy="afterInteractive" 
                onLoad={handleScriptLoad}
                onError={(e) => console.error('Failed to load swirl.js:', e)}
            />
            <div className="content--canvas fixed top-0 left-0 w-full h-full -z-10"></div>
        </>
    );
} 