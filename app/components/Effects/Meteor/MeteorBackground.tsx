'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './MeteorBackground.module.css';

interface MeteorBackgroundProps {
    // Meteor size in pixels
    meteorSize?: number;
    // Meteor tail length range in pixels
    minTailLength?: number;
    maxTailLength?: number;
    // Meteor tail thickness in pixels
    tailThickness?: number;
    // Meteors per minute
    frequency?: number;
}

interface Meteor {
    id: number;
    startX: number;
    startY: number;
    size: number;
    tailLength: number;
    tailThickness: number;
    duration: number;
}

export default function MeteorBackground({
    meteorSize = 2,
    minTailLength = 50,
    maxTailLength = 200,
    tailThickness = 1,
    frequency = 10
}: MeteorBackgroundProps) {
    const [meteors, setMeteors] = useState<Meteor[]>([]);
    const nextId = useRef(0);

    // Create a new meteor with random properties
    const createMeteor = () => {
        // Calculate random position for the meteor
        const maxTail = Math.max(minTailLength, maxTailLength);
        
        // Random start position along an imaginary line above and to the right of the viewport
        // This line extends from (viewport_width/2, -50) to (viewport_width + maxTail, viewport_height/2)
        const randomFactor = Math.random();
        const startX = (window.innerWidth * 0.5) + (randomFactor * (maxTail + window.innerWidth * 0.5));
        const startY = -50 + (randomFactor * (window.innerHeight * 0.6));
        
        const tailLength = Math.random() * (maxTailLength - minTailLength) + minTailLength;
        const duration = Math.random() * 2000 + 2000; // Random duration between 2-4 seconds

        const meteor: Meteor = {
            id: nextId.current++,
            startX,
            startY,
            size: meteorSize,
            tailLength,
            tailThickness,
            duration,
        };

        setMeteors(prev => [...prev, meteor]);

        // Remove meteor after animation completes
        setTimeout(() => {
            setMeteors(prev => prev.filter(m => m.id !== meteor.id));
        }, duration);
    };

    useEffect(() => {
        // Convert frequency from meteors/minute to interval in milliseconds
        const interval = (60 * 1000) / frequency;
        
        const timer = setInterval(createMeteor, interval);
        
        return () => clearInterval(timer);
    }, [frequency]);

    return (
        <div className={styles.container}>
            {meteors.map(meteor => (
                <div
                    key={meteor.id}
                    className={styles.meteor}
                    style={{
                        left: `${meteor.startX}px`,
                        top: `${meteor.startY}px`,
                        width: `${meteor.tailLength}px`,
                        height: `${meteor.tailThickness}px`,
                        animationDuration: `${meteor.duration}ms`,
                    }}
                />
            ))}
        </div>
    );
} 