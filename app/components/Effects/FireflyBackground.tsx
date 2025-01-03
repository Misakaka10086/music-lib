import { useEffect, useRef } from 'react';

interface Firefly {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  angle: number;
  angleSpeed: number;
  waveAmplitude: number;
  waveFrequency: number;
  time: number;
  baseSpeed: number;      // Base movement speed
  speedVariation: number; // Random speed variation
  acceleration: number;   // Current acceleration
  maxSpeed: number;      // Maximum speed limit
  minSpeed: number;      // Minimum speed limit
}

interface FireflyBackgroundProps {
  count?: number;          // Number of fireflies
  color?: string;         // Color of fireflies
  minSize?: number;       // Minimum size of fireflies
  maxSize?: number;       // Maximum size of fireflies
  minSpeed?: number;      // Minimum movement speed
  maxSpeed?: number;      // Maximum movement speed
  glowSize?: number;      // Glow size multiplier
  glowIntensity?: number; // Glow intensity (0-1)
  curveIntensity?: number;  // How much the fireflies curve (0-1)
  waveSpeed?: number;       // Speed of the wave motion
  speedVariation?: number;  // Speed variation factor (0-1)
  accelerationFactor?: number; // How much acceleration affects movement
}

const FireflyBackground = ({
  count = 50,
  color = '#ffff00',
  minSize = 2,
  maxSize = 4,
  minSpeed = 0.5,
  maxSpeed = 2,
  glowSize = 4,        // Default glow size is 4x the firefly size
  glowIntensity = 0.4, // Default glow intensity at 40%
  curveIntensity = 0.5,    // Default curve intensity
  waveSpeed = 0.002,       // Default wave speed
  speedVariation = 0.3,      // Default speed variation
  accelerationFactor = 0.02, // Default acceleration factor
}: FireflyBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create fireflies
    const fireflies: Firefly[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: minSize + Math.random() * (maxSize - minSize),
      speedX: (minSpeed + Math.random() * (maxSpeed - minSpeed)) * (Math.random() > 0.5 ? 1 : -1),
      speedY: (minSpeed + Math.random() * (maxSpeed - minSpeed)) * (Math.random() > 0.5 ? 1 : -1),
      opacity: Math.random(),
      fadeSpeed: 0.005 + Math.random() * 0.01,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.02 * curveIntensity,
      waveAmplitude: Math.random() * 2 * curveIntensity,
      waveFrequency: 0.5 + Math.random(),
      time: Math.random() * 1000,
      baseSpeed: minSpeed + Math.random() * (maxSpeed - minSpeed),
      speedVariation: Math.random() * speedVariation,
      acceleration: 0,
      maxSpeed: maxSpeed * 1.5, // Allow slightly higher than base max speed
      minSpeed: minSpeed * 0.5, // Allow slightly lower than base min speed
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach((firefly) => {
        // Update acceleration randomly
        firefly.acceleration += (Math.random() - 0.5) * accelerationFactor;
        firefly.acceleration *= 0.95; // Damping factor

        // Calculate current speed with variation and acceleration
        const currentSpeed = firefly.baseSpeed * 
          (1 + Math.sin(firefly.time * 0.5) * firefly.speedVariation) + 
          firefly.acceleration;

        // Clamp speed between min and max
        const clampedSpeed = Math.max(
          firefly.minSpeed,
          Math.min(firefly.maxSpeed, currentSpeed)
        );

        // Calculate base movement with varying speed
        const baseX = Math.cos(firefly.angle) * clampedSpeed;
        const baseY = Math.sin(firefly.angle) * clampedSpeed;

        // Update time
        firefly.time += waveSpeed;

        // Update angle for curved movement
        firefly.angle += firefly.angleSpeed;

        // Calculate wave offset
        const waveOffsetX = Math.sin(firefly.time * firefly.waveFrequency) * firefly.waveAmplitude;
        const waveOffsetY = Math.cos(firefly.time * firefly.waveFrequency) * firefly.waveAmplitude;

        // Update position with wave motion
        firefly.x += baseX + waveOffsetX;
        firefly.y += baseY + waveOffsetY;

        // Bounce off edges with angle adjustment
        if (firefly.x < 0 || firefly.x > canvas.width) {
          firefly.angle = Math.PI - firefly.angle;
          firefly.x = Math.max(0, Math.min(canvas.width, firefly.x));
        }
        if (firefly.y < 0 || firefly.y > canvas.height) {
          firefly.angle = -firefly.angle;
          firefly.y = Math.max(0, Math.min(canvas.height, firefly.y));
        }

        // Update opacity
        firefly.opacity += firefly.fadeSpeed;
        if (firefly.opacity > 1 || firefly.opacity < 0) firefly.fadeSpeed *= -1;

        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          firefly.x,
          firefly.y,
          0,
          firefly.x,
          firefly.y,
          firefly.size * glowSize
        );

        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${firefly.opacity})`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${firefly.opacity * glowIntensity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        // Draw outer glow
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(firefly.x, firefly.y, firefly.size * glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${firefly.opacity})`;
        ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [count, color, minSize, maxSize, minSpeed, maxSpeed, glowSize, glowIntensity, curveIntensity, waveSpeed, speedVariation, accelerationFactor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    />
  );
};

export default FireflyBackground; 