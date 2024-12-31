'use client';

import { useEffect, useRef } from 'react';

// Utility functions
const rand = (n: number) => n * Math.random();
const fadeInOut = (t: number, m: number) => {
    let hm = 0.5 * m;
    return Math.abs((t + hm) % m - hm) / hm;
};

export default function AuroraBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasARef = useRef<HTMLCanvasElement>(null);
    const canvasBRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasARef.current || !canvasBRef.current) return;

        const rayCount = 500;
        const rayPropCount = 8;
        const rayPropsLength = rayCount * rayPropCount;
        const baseLength = 200;
        const rangeLength = 200;
        const baseSpeed = 0.05;
        const rangeSpeed = 0.1;
        const baseWidth = 10;
        const rangeWidth = 20;
        const baseHue = 120;
        const rangeHue = 60;
        const baseTTL = 50;
        const rangeTTL = 100;
        const noiseStrength = 100;
        const xOff = 0.0015;
        const yOff = 0.0015;
        const zOff = 0.0015;
        const backgroundColor = 'hsla(220,60%,3%,1)';

        const canvasA = canvasARef.current;
        const canvasB = canvasBRef.current;
        const ctxA = canvasA.getContext('2d')!;
        const ctxB = canvasB.getContext('2d')!;

        let center = [
            0.5 * canvasA.width,
            0.5 * canvasA.height
        ];
        let tick = 0;
        let rayProps: Float32Array;

        const initRay = (i: number) => {
            const length = baseLength + rand(rangeLength);
            const x = rand(canvasA.width);
            const y1 = center[1] + noiseStrength;
            const y2 = center[1] + noiseStrength - length;
            const life = 0;
            const ttl = baseTTL + rand(rangeTTL);
            const width = baseWidth + rand(rangeWidth);
            const speed = baseSpeed + rand(rangeSpeed) * (Math.round(rand(1)) ? 1 : -1);
            const hue = baseHue + rand(rangeHue);

            rayProps.set([x, y1, y2, life, ttl, width, speed, hue], i);
        };

        const drawRay = (x: number, y1: number, y2: number, life: number, ttl: number, width: number, hue: number) => {
            if (!Number.isFinite(x) || !Number.isFinite(y1) || !Number.isFinite(y2)) {
                return;
            }

            const gradient = ctxA.createLinearGradient(x, y1, x, y2);
            gradient.addColorStop(0, `hsla(${hue},100%,65%,0)`);
            gradient.addColorStop(0.5, `hsla(${hue},100%,65%,${fadeInOut(life, ttl)})`);
            gradient.addColorStop(1, `hsla(${hue},100%,65%,0)`);

            ctxA.save();
            ctxA.beginPath();
            ctxA.strokeStyle = gradient;
            ctxA.lineWidth = width;
            ctxA.moveTo(x, y1);
            ctxA.lineTo(x, y2);
            ctxA.stroke();
            ctxA.closePath();
            ctxA.restore();
        };

        const updateRay = (i: number) => {
            const i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i;
            let x = rayProps[i];
            const y1 = rayProps[i2];
            const y2 = rayProps[i3];
            let life = rayProps[i4];
            const ttl = rayProps[i5];
            const width = rayProps[i6];
            const speed = rayProps[i7];
            const hue = rayProps[i8];

            drawRay(x, y1, y2, life, ttl, width, hue);

            x += speed;
            life++;

            rayProps[i] = x;
            rayProps[i4] = life;

            (x < 0 || x > canvasA.width || life > ttl) && initRay(i);
        };

        const drawRays = () => {
            for (let i = 0; i < rayPropsLength; i += rayPropCount) {
                updateRay(i);
            }
        };

        const resize = () => {
            const { innerWidth, innerHeight } = window;

            canvasA.width = innerWidth;
            canvasA.height = innerHeight;

            ctxA.drawImage(canvasB, 0, 0);

            canvasB.width = innerWidth;
            canvasB.height = innerHeight;

            ctxB.drawImage(canvasA, 0, 0);

            center[0] = 0.5 * canvasA.width;
            center[1] = 0.5 * canvasA.height;
        };

        const render = () => {
            ctxB.save();
            ctxB.filter = 'blur(12px)';
            ctxA.globalCompositeOperation = 'lighter';
            ctxB.drawImage(canvasA, 0, 0);
            ctxB.restore();
        };

        const draw = () => {
            tick++;
            ctxA.clearRect(0, 0, canvasA.width, canvasA.height);
            ctxB.fillStyle = backgroundColor;
            ctxB.fillRect(0, 0, canvasB.width, canvasB.height);
            drawRays();
            render();

            window.requestAnimationFrame(draw);
        };

        const setup = () => {
            resize();
            tick = 0;
            rayProps = new Float32Array(rayPropsLength);

            for (let i = 0; i < rayPropsLength; i += rayPropCount) {
                initRay(i);
            }
            draw();
        };

        setup();
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10">
            <canvas ref={canvasARef} className="hidden"></canvas>
            <canvas ref={canvasBRef} className="fixed top-0 left-0 w-full h-full"></canvas>
        </div>
    );
} 