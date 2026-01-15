"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// --- KOMPONEN METEOR (Malam) ---
export const Meteors = ({ number = 20 }: { number?: number }) => {
  const [meteors, setMeteors] = useState<Array<{ 
    left: string; 
    top: string;
    animationDelay: string; 
    animationDuration: string;
  }>>([]);

  useEffect(() => {
    const newMeteors = new Array(number).fill(true).map(() => ({
      // POSISI HORIZONTAL (X):
      // Muncul dari tengah sampai jauh di kanan layar (-20% s/d 120%)
      // Agar variasi jatuhnya lebar.
      left: Math.floor(Math.random() * 140 - 20) + "%", 
      
      // POSISI VERTIKAL (Y):
      // Muncul dari ATAS layar (-50% s/d 10%)
      // Agar meteor terlihat "turun" masuk ke layar.
      top: Math.floor(Math.random() * 60 - 50) + "%", 
      
      // DELAY & DURASI:
      animationDelay: (Math.random() * 5) + "s",
      animationDuration: Math.floor(Math.random() * 6 + 3) + "s", // 3s - 9s
    }));
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMeteors(newMeteors);
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {meteors.map((style, idx) => (
        <span
          key={idx}
          // Kita HAPUS class opacity-0/dark:opacity-100 dari sini
          // Karena kita sudah mengaturnya di CSS global (.dark .meteor-effect)
          // Ini mencegah konflik style.
          className={cn("meteor-effect")}
          style={{
            top: style.top,
            left: style.left,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

// --- KOMPONEN AWAN SVG (Siang) ---
const CloudSVG = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.00003 15C2.68632 15 0 12.3383 0 9.04982C0 5.76138 2.68632 3.1001 6.00003 3.1001C6.56086 3.1001 7.10359 3.17765 7.61806 3.32293C8.77204 1.29592 10.9261 0 13.3125 0C16.8724 0 19.8402 2.56268 20.4969 5.95878C22.5025 6.48681 24 8.33426 24 10.5499C24 13.0074 22.0074 15 19.5499 15H6.00003Z" />
  </svg>
);

export const Clouds = () => {
    const [clouds, setClouds] = useState<Array<{
        top: string;
        opacity: number;
        duration: string;
        delay: string;
        scale: number;
        color: string;
    }>>([]);

    useEffect(() => {
        const newClouds = new Array(20).fill(true).map(() => {
            const isFrontCloud = Math.random() > 0.6; 
            return {
                top: Math.floor(Math.random() * 70) + "%", 
                opacity: isFrontCloud ? 0.9 : 0.4,
                duration: Math.floor(Math.random() * 40 + 30) + "s", 
                delay: Math.floor(Math.random() * -100) + "s", 
                scale: Math.random() * 1.5 + 0.8,
                color: Math.random() > 0.5 ? "#F5ECD5" : "#ffffff",
            };
        });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setClouds(newClouds);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden opacity-100 dark:opacity-0 transition-opacity duration-1000 pointer-events-none">
             {clouds.map((cloud, idx) => (
                 <div
                    key={idx}
                    className="absolute"
                    style={{
                        top: cloud.top,
                        left: "-150px", 
                        opacity: cloud.opacity,
                        color: cloud.color,
                        animationName: "cloud", 
                        animationTimingFunction: "linear",
                        animationIterationCount: "infinite",
                        animationDuration: cloud.duration,
                        animationDelay: cloud.delay,
                        transform: `scale(${cloud.scale})`,
                    }}
                 >
                     <CloudSVG className="h-32 w-auto" />
                 </div>
             ))}
        </div>
    )
}