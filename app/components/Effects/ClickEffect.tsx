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

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  life: number;
  velocityX: number;
  velocityY: number;
  iconType: 'filled' | 'border';
}

const DEFAULT_CONFIG = {
  radius: 100,
  minSize: 5,
  maxSize: 15,
  colors: ['#FFCCE1', '#E195AB', '#FFF5D7', '#F2F9FF', '#FFCCE1', '#FFCCE1'],
  speedFactor: 1,
};

const MAX_PARTICLES = 45; // 设置粒子总数上限

const ClickEffect: React.FC<ClickEffectProps> = ({
  radius = DEFAULT_CONFIG.radius,
  minSize = DEFAULT_CONFIG.minSize,
  maxSize = DEFAULT_CONFIG.maxSize,
  colors = DEFAULT_CONFIG.colors,
  speedFactor = DEFAULT_CONFIG.speedFactor,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  const configRef = useRef({ radius, minSize, maxSize, colors, speedFactor });
  useEffect(() => {
    configRef.current = { radius, minSize, maxSize, colors, speedFactor };
  }, [radius, minSize, maxSize, colors, speedFactor]);

  const handleClick = useCallback((event: MouseEvent) => {
    const { radius, minSize, maxSize, colors, speedFactor } = configRef.current;
    const clickX = event.clientX;
    const clickY = event.clientY;
    const numberOfParticles = 15;

    const newParticles = Array.from({ length: numberOfParticles }, () => {
      const size = Math.random() * (maxSize - minSize) + minSize;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.random() * 2 * Math.PI;
      const speed = (2 + Math.random() * 5) * speedFactor;
      return {
        id: nextId.current++,
        x: clickX + (Math.random() * 2 - 1) * radius,
        y: clickY + (Math.random() * 2 - 1) * radius,
        size,
        color,
        life: 1,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed,
        iconType: Math.random() > 0.5 ? 'filled' as 'filled' : 'border' as 'border',
      };
    });

    setParticles((prevParticles) => {
      const combinedParticles = [...prevParticles, ...newParticles];
      if (combinedParticles.length > MAX_PARTICLES) {
        return combinedParticles.slice(combinedParticles.length - MAX_PARTICLES);
      }
      return combinedParticles;
    });
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    const animationFrame = requestAnimationFrame(() => {
      setParticles((prevParticles) =>
        prevParticles
          .filter((particle) => particle.life > 0)
          .map((particle) => ({
            ...particle,
            life: particle.life - 0.02,
            x: particle.x + particle.velocityX,
            y: particle.y + particle.velocityY,
            velocityX: particle.velocityX * 0.95,
            velocityY: particle.velocityY * 0.95,
          }))
      );
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  useEffect(() => {
    const target = document.body;
    target.addEventListener('click', handleClick);
    return () => {
      target.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  const generateIconStyle = (particle: Particle): React.CSSProperties => ({
    position: 'fixed',
    left: `${particle.x - particle.size / 2}px`,
    top: `${particle.y - particle.size / 2}px`,
    fontSize: `${particle.size}px`,
    color: particle.color,
    opacity: particle.life,
    pointerEvents: 'none',
    filter: `blur(${particle.size / 15}px)`,
  });

  return (
    <>
      {particles.map((particle) =>
        particle.iconType === 'filled' ? (
          <FavoriteIcon key={particle.id} style={generateIconStyle(particle)} />
        ) : (
          <FavoriteBorderIcon key={particle.id} style={generateIconStyle(particle)} />
        )
      )}
    </>
  );
};

export default ClickEffect;
