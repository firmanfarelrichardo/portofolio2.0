"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// --- KOMPONEN METEOR (Malam) ---
// Kita naikkan default number jadi 50 agar terlihat seperti hujan meteor
export const Meteors = ({ number = 50 }: { number?: number }) => {
  const [meteors, setMeteors] = useState<Array<{ 
    left: string; 
    animationDelay: string; 
    animationDuration: string;
    top: string; 
  }>>([]);

  useEffect(() => {
    const newMeteors = new Array(number).fill(true).map(() => ({
      // Posisi horizontal acak 0-100%
      left: Math.floor(Math.random() * 100) + "%",
      // Posisi vertikal acak (agar tidak semua mulai dari garis paling atas)
      top: Math.floor(Math.random() * -20) + "%", // Mulai sedikit di atas layar
      // Delay acak lebar (0s sampai 15s) agar loopingnya tidak barengan
      animationDelay: (Math.random() * 10) + "s",
      // Durasi acak (2s sampai 8s) ada yang cepat ada yang lambat
      animationDuration: Math.floor(Math.random() * 6 + 2) + "s",
    }));
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMeteors(newMeteors);
  }, [number]);

  return (
    <>
      {meteors.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            "animate-meteor absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-100 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-slate-100 before:to-transparent",
             "opacity-0 dark:opacity-100 transition-opacity duration-1000"
          )}
          style={{
              top: style.top,
              left: style.left,
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration,
          }}
        />
      ))}
    </>
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

// --- KOMPONEN Background Siang (Awan Bergerak) ---
export const Clouds = () => {
    // Kita buat state untuk menyimpan data awan acak
    const [clouds, setClouds] = useState<Array<{
        top: string;
        opacity: number;
        duration: string;
        delay: string;
        scale: number;
        color: string;
    }>>([]);

    useEffect(() => {
        // Generate 20 awan dengan properti acak
        const newClouds = new Array(20).fill(true).map(() => {
            const isFrontCloud = Math.random() > 0.7; // 30% awan ada di depan (lebih jelas)
            
            return {
                top: Math.floor(Math.random() * 60) - 10 + "%", // Sebar vertikal (-10% sampai 50%)
                opacity: isFrontCloud ? 0.8 : Math.random() * 0.3 + 0.1, // Opacity variatif
                // Durasi sangat variatif (30s sampai 120s) untuk efek Parallax
                duration: Math.floor(Math.random() * 90 + 30) + "s", 
                // DELAY NEGATIF: Ini kuncinya! Agar awan sudah tersebar saat load, bukan nunggu dari kanan
                delay: Math.floor(Math.random() * -100) + "s", 
                scale: Math.random() * 1.5 + 0.5, // Ukuran variatif
                color: Math.random() > 0.5 ? "#F5ECD5" : "#ffffff", // Warna selang-seling Cream/Putih
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
                    className="absolute animate-cloud"
                    style={{
                        top: cloud.top,
                        left: "-20%", // Mulai dari luar layar kiri (animasi akan handle movement)
                        opacity: cloud.opacity,
                        color: cloud.color,
                        animationDuration: cloud.duration,
                        animationDelay: cloud.delay,
                        transform: `scale(${cloud.scale})`, // Ukuran
                    }}
                 >
                     <CloudSVG className="h-24 w-auto" />
                 </div>
             ))}
        </div>
    )
}