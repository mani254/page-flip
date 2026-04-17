import React from 'react';

interface ChapterTransitionProps {
  chapterNumber: string;
  title: string;
  subtitle?: string;
}

const ChapterTransition: React.FC<ChapterTransitionProps> = ({ chapterNumber, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-12 text-center bg-black/5 backdrop-blur-[1px]">
      <div className="relative">
        {/* Decorative Circle Background */}
        <div className="absolute inset-0 -m-8 border border-primary/10 rounded-full animate-pulse-slow" />
        
        <div className="relative z-10 flex flex-col items-center">
          <span className="handwritten text-6xl text-primary/30 mb-2 select-none">
            {chapterNumber}
          </span>
          
          <div className="w-16 h-1 bg-primary/20 mb-6" />
          
          <h2 className="text-5xl handwritten text-primary drop-shadow-md mb-4">
            {title}
          </h2>
          
          {subtitle && (
            <p className="playful text-sm text-muted/50 tracking-[0.3em] uppercase italic px-8">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Corner Doodles or Accents */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t-2 border-l-2 border-primary/10" />
      <div className="absolute bottom-12 right-12 w-8 h-8 border-b-2 border-r-2 border-primary/10" />
    </div>
  );
};

export default ChapterTransition;
