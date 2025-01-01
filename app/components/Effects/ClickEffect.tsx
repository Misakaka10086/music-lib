import React, { useState, useEffect, useRef, useCallback } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface ClickEffectProps {
  radius?: number;
  minSize?: number;
  maxSize?: number;
  speedFactor?: number;
  colors?: string[];
  
}

const ClickEffect: React.FC<ClickEffectProps> = ({
  radius = 100,
  minSize = 5,
  maxSize = 15,
  colors = ['#FFCCE1', '#E195AB', '#FFF5D7', '#F2F9FF', '#FFCCE1', '#FFCCE1'],
  speedFactor = 1,
}) => {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; color: string; life: number; velocityX: number; velocityY: number; iconType: 'filled' | 'border' }[]
  >([]);
  const nextId = useRef(0);

  const handleClick = useCallback((event: MouseEvent) => {
    const clickX = event.clientX;
    const clickY = event.clientY;
    const numberOfParticles = 15; // Reduce the number of particles

    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;
      const color = colors[Math.floor(Math.random() * colors.length)];
      // Generate a random offset between -radius and radius
      const particleX = clickX + (Math.random() * 2 - 1) * radius;
      const particleY = clickY + (Math.random() * 2 - 1) * radius;

      // Calculate a random direction (angle) and speed
      const angle = Math.random() * 2 * Math.PI; // 0 to 360 degrees
      const speed = (2 + Math.random() * 5) * speedFactor; // Random speed
      const velocityX = Math.cos(angle) * speed;
      const velocityY = Math.sin(angle) * speed;

      setParticles((prevParticles) => [
        ...prevParticles,
        {
          id: nextId.current++,
          x: particleX,
          y: particleY,
          size,
          color,
          life: 1, // Initial life cycle
          velocityX,
          velocityY,
          iconType: Math.random() > 0.5 ? 'filled' : 'border', // Randomly select Icon type
        },
      ]);
    }
  }, [radius, minSize, maxSize, colors, speedFactor]);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick]); // 依赖 handleClick

  useEffect(() => {
    if (particles.length > 0) {
      const animationFrame = requestAnimationFrame(() => {
        setParticles((prevParticles) =>
          prevParticles.filter((particle) => particle.life > 0).map((particle) => ({
            ...particle,
            // Gradually fade out the particle
            life: particle.life - 0.02,
            // Update particle position based on velocity
            x: particle.x + particle.velocityX * speedFactor,
            y: particle.y + particle.velocityY * speedFactor,
            // Reduce particle velocity to simulate friction
            velocityX: particle.velocityX * 0.95,
            velocityY: particle.velocityY * 0.95,
          }))
        );
      });

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [particles]);

  return (
    <>
      {particles.map((particle) => (
        particle.iconType === 'filled' ? (
          <FavoriteIcon
            key={particle.id}
            style={{
              position: 'fixed',
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              fontSize: particle.size,
              color: particle.color,
              opacity: particle.life,
              pointerEvents: 'none',
              filter: `blur(${particle.size / 15}px)`,
            }}
          />
        ) : (
          <FavoriteBorderIcon
            key={particle.id}
            style={{
              position: 'fixed',
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              fontSize: particle.size,
              color: particle.color,
              opacity: particle.life,
              pointerEvents: 'none',
              filter: `blur(${particle.size / 15}px)`,
            }}
          />
        )
      ))}
    </>
  );
};

export default ClickEffect; 