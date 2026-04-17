import React, { forwardRef, memo } from 'react';

interface PageProps {
  children?: React.ReactNode;
  number: string | number;
  isCover?: boolean;
  isLast?: boolean;
}

const Page = memo(forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const isLeftPage = Number(props.number) % 2 === 0;

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${props.isCover || props.isLast ? 'bg-[#2c1810]' : 'bg-[#fcfaf2]'} paper-shadow oil-paint-texture transition-shadow duration-500 ${isLeftPage ? 'page-stack-effect-reverse' : 'page-stack-effect'}`}
      ref={ref}
    >
      {/* Base Solid Overlay */}
      <div className={`absolute inset-0 z-0 ${props.isCover || props.isLast ? 'bg-[#2c1810]' : 'bg-[#fcfaf2]'}`} />

      {/* Content Container */}
      <div className={`relative z-10 w-full h-full flex flex-col ${props.isCover || props.isLast ? 'items-center justify-center p-0' : 'p-4'}`}>

        {/* Main Content Slot */}
        <div className="flex-grow w-full h-full relative z-20 overflow-hidden">
          {props.children}
        </div>

        {/* Page Footer (Only for interior pages) */}
        {!props.isCover && !props.isLast && (
          <div className="w-full h-8 flex justify-center items-center mt-auto relative z-30">
            <span className="playful text-xs text-muted/40 italic tracking-widest uppercase pointer-events-none select-none">
              &mdash; Page {props.number} &mdash;
            </span>
          </div>
        )}
      </div>

      {/* Premium Border Overlay */}
      <div className="absolute inset-0 pointer-events-none rough-edge border-12 border-black/5 z-50 shadow-inner" />
    </div>
  );
}));

Page.displayName = 'Page';

export default Page;