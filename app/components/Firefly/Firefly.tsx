"use client";

import React from 'react';
import './firefly.scss';

interface FireflyProps {
  count?: number;
  color?: string;
}

const Firefly: React.FC<FireflyProps> = ({ 
  count = 15,
  color = '#d99df1'
}) => {
  // 将颜色转换为CSS变量
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--firefly-color', color);
    root.style.setProperty('--firefly-glow-color', color);
  }, [color]);

  return (
    <div className="firefly-container">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="firefly"></div>
      ))}
    </div>
  );
};

export default Firefly; 