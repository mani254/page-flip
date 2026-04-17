import Image from 'next/image';
import React from 'react';

interface TemplateTwoProps {
  title: string;
  description: string;
  imageSrc: string;
  details?: {
    date?: string;
    location?: string;
    note?: string;
  };
}

const TemplateTwo: React.FC<TemplateTwoProps> = ({ title, description, imageSrc, details }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 w-full h-full p-8 py-4 items-center overflow-hidden">
      {/* Left Column: Text Content */}
      <div className="flex flex-col gap-4 text-left h-full">
        <h2 className="text-2xl handwritten text-primary border-b border-primary/20 pb-2">
          {title}
        </h2>

        <p className="text-sm handwritten text-foreground/70 leading-relaxed italic border-l-2 border-primary/10 pl-4">
          {description}
        </p>

        {details && (
          <div className="mt-auto pt-4 flex flex-col gap-2 border-t border-black/5">
            {details.date && (
              <span className="playful text-[10px] uppercase tracking-widest text-muted/60">
                &mdash; {details.date} &mdash;
              </span>
            )}
            {details.location && (
              <span className="handwritten text-xs text-accent/70">
                📍 {details.location}
              </span>
            )}
            {details.note && (
              <div className="mt-2 p-2 bg-yellow-50/20 rounded shadow-sm border border-black/5 transform -rotate-1">
                <p className="handwritten text-[10px] text-muted/80">{details.note}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Column: Image */}
      <div className="relative w-full h-full flex items-center justify-center min-h-[300px]">
        <div className="relative w-full h-full bg-white p-2 pb-8 shadow-2xl transform -rotate-2 border border-black/5">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain p-2 grayscale-10 hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Subtle Decorative Tape */}
        <div className="absolute -top-1 right-1/4 w-16 h-6 bg-blue-100/20 backdrop-blur-[0.5px] rotate-45 border-x border-black/5 z-30 shadow-sm" />
      </div>
    </div>
  );
};

export default TemplateTwo;
