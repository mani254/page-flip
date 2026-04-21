'use client';

import AmanBook from "@/components/AmanBook";



export default function Aman() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* Table Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-110"
        style={{ backgroundImage: 'url("/images/frame-background.jpeg")' }}
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]" />

      {/* Book Container */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center perspective-[3000px]">
        <div className="w-full h-full flex items-center justify-center">
          <AmanBook />
        </div>
      </div>

      {/* Subtle Dust/Texture Overlay */}
      <div className="absolute inset-0 z-15 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dust.png')]" />
    </main>
  );
}
