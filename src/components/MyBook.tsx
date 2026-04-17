'use client';

import { ChevronLeft, ChevronRight, Heart, Lock, Pause, Play, Volume2, VolumeX, Loader2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './Page';

import TemplateOne from './templates/TemplateOne';

interface IFlipEvent {
  data: number;
}

interface IBookRef {
  pageFlip(): {
    flipNext(): void;
    flipPrev(): void;
  };
}

const MyBook: React.FC = () => {
  const bookRef = useRef<IBookRef>(null);
  const audioMusicRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  // New States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const bookImages = [
    '/oil_painting_cover_1776345279108.png',
    '/images/page-1.jpeg',
    '/images/page-2.jpeg',
    '/images/page-3-0.jpeg',
    '/images/page-3.jpeg',
    '/images/page-4.jpeg',
    '/images/page-5.jpeg',
    '/images/page-6.jpeg',
    '/images/page-7.jpeg',
    '/images/page-8.jpeg',
    '/images/raika_heart_bg.png',
    '/images/marriage_rose.png',
    '/images/frame-background.jpeg'
  ];


  const toggleMusic = () => {
    if (audioMusicRef.current) {
      if (isPlaying) {
        audioMusicRef.current.pause();
      } else {
        audioMusicRef.current.play().catch(e => console.log("Audio play deferred", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onFlip = (e: IFlipEvent) => {
    setCurrentPage(e.data);
  };

  const nextPath = () => {
    bookRef.current?.pageFlip().flipNext();
  };

  const prevPath = () => {
    bookRef.current?.pageFlip().flipPrev();
  };

  useEffect(() => {
    const handleResize = () => {
      const h = window.innerHeight * 0.55;
      const w = window.innerHeight * 0.75;
      setDimensions({ width: w, height: h });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Image Preloading Logic
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = bookImages.length;

    bookImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / totalImages) * 100));
        if (loadedCount === totalImages) {
          setTimeout(() => setIsPreloading(false), 800); // Smooth transition
        }
      };
      img.onerror = () => {
        loadedCount++; // Count even if failed to prevent stuck loading
        setLoadingProgress(Math.floor((loadedCount / totalImages) * 100));
        if (loadedCount === totalImages) {
          setTimeout(() => setIsPreloading(false), 800);
        }
      };
    });
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "our-love-story") {
      setIsAuthenticated(true);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  useEffect(() => {
    if (audioMusicRef.current) {
      audioMusicRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (audioMusicRef.current) {
      if (isPlaying) {
        audioMusicRef.current.play().catch(e => {
          console.log("Audio play deferred", e);
          setIsPlaying(false);
        });
      } else {
        audioMusicRef.current.pause();
      }
    }
  }, [isPlaying]);

  if (dimensions.width === 0) return null;

  // 1. Password Protection Gate
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
        <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className={`p-4 rounded-full bg-primary/20 transition-all duration-300 ${passwordError ? 'bg-red-500/20' : ''}`}>
              <Lock className={`w-8 h-8 ${passwordError ? 'text-red-400' : 'text-primary'}`} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold handwritten text-white">Unlock Our Memories</h2>
              <p className="text-white/60 text-sm playful tracking-wider">Enter our secret password to begin</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="w-full space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password..."
                className={`w-full px-6 py-4 bg-white/5 border rounded-xl text-white text-center focus:outline-none focus:ring-2 transition-all placeholder:text-white/20 font-sans tracking-widest ${passwordError ? 'border-red-500 focus:ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/20 focus:ring-primary/50'}`}
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary/80 text-white rounded-xl font-bold playful transition-all active:scale-95 shadow-lg shadow-primary/20"
              >
                Open Book
              </button>
            </form>

            <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.3em]">
              <Heart className="w-3 h-3 fill-white/10" />
              <span>For Our Eyes Only</span>
              <Heart className="w-3 h-3 fill-white/10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Loading Overlay
  if (isPreloading) {
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        <div className="relative z-10 flex flex-col items-center space-y-8 max-w-xs w-full text-center">
          <div className="relative">
             <Loader2 className="w-16 h-16 text-primary animate-spin" />
             <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary fill-primary animate-pulse" />
             </div>
          </div>

          <div className="space-y-3 w-full">
            <p className="text-white/80 font-bold playful tracking-widest text-lg uppercase">
               Preparing Our Memories...
            </p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-primary transition-all duration-300 ease-out" 
                 style={{ width: `${loadingProgress}%` }}
               />
            </div>
            <p className="text-white/40 text-[10px] tracking-widest font-bold uppercase">
              {loadingProgress}% Complete
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full h-screen mx-auto overflow-hidden">
      {/* Audio elements */}
      <audio
        ref={audioMusicRef}
        src="/audio/background-audio.mpeg"
        loop
        preload="auto"
      />

      <div className="relative group">
        <HTMLFlipBook
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={dimensions.width}
          maxWidth={dimensions.width}
          minHeight={dimensions.height}
          maxHeight={dimensions.height}
          maxShadowOpacity={0.4}
          showCover={true}
          mobileScrollSupport={true}
          className="shadow-[0_30px_60px_rgba(0,0,0,0.05)] mx-auto"
          startPage={0}
          drawShadow={true}
          flippingTime={1800}
          usePortrait={false}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          renderOnlyPageLengthChange={true}
          onFlip={onFlip}
          ref={bookRef}
          style={{ margin: '0 auto' }}
        >
          {/* Cover Page */}
          <Page number="0" isCover={true}>
            <div className="absolute inset-0 bg-[url('/oil_painting_cover_1776345279108.png')] bg-cover bg-center brightness-[0.7] opacity-60" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 p-8 flex flex-col items-center justify-center h-full w-full">
              <div className="border-4 border-double border-yellow-600/40 p-12 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px]">
                <h1 className="text-7xl handwritten text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-6">
                  Our Love Story
                </h1>
                <div className="w-32 h-1 bg-yellow-600/50 mb-8" />
                <p className="playful text-white/90 text-2xl italic tracking-[0.2em] uppercase drop-shadow-md">
                  A Lifetime Of Memories
                </p>
              </div>
            </div>
          </Page>

          {/* Chapter I: Visual Memories (Template One Only) */}
          <Page number="1"><TemplateOne title="Where it all began" imageSrc="/images/page-1.jpeg" /></Page>
          <Page number="2"><TemplateOne title="The First Time i Really Saw You" imageSrc="/images/page-2.jpeg" /></Page>
          <Page number="3"><TemplateOne title="I Think My Heart Know Before I Did" imageSrc="/images/page-3-0.jpeg" /></Page>
          <Page number="3"><TemplateOne title="In a crowd, You Chose Me" imageSrc="/images/page-3.jpeg" /></Page>
          <Page number="4"><TemplateOne title="In Every Call, I Found You" imageSrc="/images/page-4.jpeg" /></Page>
          <Page number="5"><TemplateOne title="The Day It All Felt Real" imageSrc="/images/page-5.jpeg" /></Page>
          <Page number="6"><TemplateOne title="In The Little Things, I Found You" imageSrc="/images/page-6.jpeg" /></Page>
          <Page number="7"><TemplateOne title="Kashmir,But With You" imageSrc="/images/page-7.jpeg" /></Page>
          <Page number="8"><TemplateOne title="You are where all my tomorrows begin" imageSrc="/images/page-8.jpeg" /></Page>

          {/* Transition to Chapter II */}
          <Page number="9">
            <div className="relative h-full w-full flex flex-col items-center justify-center p-12 text-center overflow-hidden">
              {/* Heart Background */}
              <div className="absolute inset-0 bg-[url('/images/raika_heart_bg.png')] bg-cover bg-center opacity-40" />
              <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />

              <div className="relative z-10 space-y-8">
                <div className="flex justify-center gap-4">
                  <Heart className="w-8 h-8 text-primary animate-bounce" />
                  <Heart className="w-12 h-12 text-primary/60 animate-pulse delay-75" />
                  <Heart className="w-8 h-8 text-primary animate-bounce delay-150" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-6xl handwritten text-primary drop-shadow-sm">
                    With love
                  </h2>
                  <p className="text-4xl handwritten text-foreground/80 italic">
                    By Raika..
                  </p>
                </div>

                <div className="w-24 h-px bg-primary/20 mx-auto" />

                <p className="playful text-[10px] text-muted tracking-[0.4em] uppercase">
                  A New Beginning
                </p>
              </div>
            </div>
          </Page>

          {/* Inside Back Cover: Marriage Anticipation */}
          <Page number="10">
            <div className="relative h-full w-full flex flex-col items-center justify-center p-12 text-center overflow-hidden">
              {/* Rose Background */}
              <div className="absolute inset-0 bg-[url('/images/marriage_rose.png')] bg-cover bg-center opacity-30 grayscale-[30%]" />
              <div className="absolute inset-0 bg-white/40" />

              <div className="relative z-10 p-8 border border-primary/20 bg-white/30 backdrop-blur-md rounded-sm shadow-xl">
                <div className="mb-6">
                  <div className="w-12 h-12 mx-auto border-t-2 border-primary/40 rounded-full animate-spin-slow mb-4 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                  </div>
                </div>

                <h2 className="text-3xl playful text-primary leading-tight mb-2">
                  Waiting for our
                </h2>
                <h3 className="text-5xl handwritten text-foreground drop-shadow-sm mb-6">
                  marriage date
                </h3>

                <div className="flex items-center justify-center gap-2 text-muted uppercase tracking-[0.2em] text-[10px]">
                  <div className="h-px w-8 bg-muted/30" />
                  <span>The Best is Yet to Come</span>
                  <div className="h-px w-8 bg-muted/30" />
                </div>
              </div>
            </div>
          </Page>

          {/* Absolute Back Cover (Blank) */}
          <Page number="11" isLast={true}>
            <div className="absolute inset-0 bg-[url('/oil_painting_cover_1776345279108.png')] bg-cover bg-center brightness-[0.5] opacity-50 grayscale-50" />
            <div className="absolute inset-0 bg-black/40" />
          </Page>
        </HTMLFlipBook>
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-10 z-40 flex items-center gap-4 px-6 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-2xl transition-all hover:scale-105">
        <button
          onClick={prevPath}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors group"
          title="Previous Page"
        >
          <ChevronLeft className="w-5 h-5 text-white group-active:scale-90 transition-transform" />
        </button>

        <div className="h-6 w-px bg-white/10" />

        <div className="flex items-center gap-3">
          <button
            onClick={toggleMusic}
            className="p-2 bg-primary/20 hover:bg-primary/30 rounded-full transition-colors flex items-center gap-2 group"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white animate-pulse" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
            <span className="text-white text-[10px] font-bold uppercase tracking-widest px-1 hidden md:inline">
              {isPlaying ? 'Pause' : 'Play'}
            </span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-red-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        <div className="h-6 w-px bg-white/10" />

        <button
          onClick={nextPath}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors group"
          title="Next Page"
        >
          <ChevronRight className="w-5 h-5 text-white group-active:scale-90 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default MyBook;