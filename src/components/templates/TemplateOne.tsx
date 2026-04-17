import Image from 'next/image';
import React from 'react';

interface TemplateOneProps {
  title: string;
  imageSrc: string;
}

const TemplateOne: React.FC<TemplateOneProps> = ({ title, imageSrc }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-3 py-3">
      <h2 className="text-2xl font-bold handwritten text-primary/20 drop-shadow-sm text-center">
        {title}
      </h2>

      <Image
        src={imageSrc}
        width={500}
        height={500}
        alt={title}
        className="object-cover w-full h-full grayscale-20 hover:grayscale-0 transition-all duration-700"
      />
    </div>
  );
};

export default TemplateOne;
