import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Video as VideoIcon
} from 'lucide-react';

interface ExerciseVideoPlayerProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  exerciseName: string;
  className?: string;
  autoPlay?: boolean;
  aspectRatio?: '9/16' | '16/9' | 'auto';
}

export function parseExerciseVideoEmbed(url?: string): {
  type: 'youtube' | 'vimeo' | 'loom' | 'gdrive' | 'direct' | 'link' | 'none';
  embedUrl?: string;
  rawUrl?: string;
} {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return { type: 'none' };
  }

  const cleanUrl = url.trim();

  // 1. YouTube
  const ytMatch = cleanUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`,
      rawUrl: cleanUrl
    };
  }

  // 2. Google Drive video links
  const gdriveMatch = cleanUrl.match(/drive\.google\.com\/(?:file\/d\/([a-zA-Z0-9_-]+)|open\?(?:.*&)?id=([a-zA-Z0-9_-]+)|uc\?(?:.*&)?id=([a-zA-Z0-9_-]+))/i);
  if (gdriveMatch) {
    const fileId = gdriveMatch[1] || gdriveMatch[2] || gdriveMatch[3];
    if (fileId) {
      return {
        type: 'gdrive',
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
        rawUrl: cleanUrl
      };
    }
  }

  // 3. Vimeo
  const vimeoMatch = cleanUrl.match(/(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+))/i);
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}?title=0&byline=0&portrait=0&autoplay=1`,
      rawUrl: cleanUrl
    };
  }

  // 4. Loom
  if (cleanUrl.includes('loom.com/share/')) {
    const loomId = cleanUrl.split('loom.com/share/')[1]?.split('?')[0];
    if (loomId) {
      return {
        type: 'loom',
        embedUrl: `https://www.loom.com/embed/${loomId}?autoplay=1`,
        rawUrl: cleanUrl
      };
    }
  }

  // 5. Direct video files (.mp4, .webm, .mov, etc.)
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(cleanUrl)) {
    return {
      type: 'direct',
      embedUrl: cleanUrl,
      rawUrl: cleanUrl
    };
  }

  // 6. Generic Link
  if (/^https?:\/\//i.test(cleanUrl)) {
    return {
      type: 'link',
      rawUrl: cleanUrl
    };
  }

  return { type: 'none' };
}

export const ExerciseVideoPlayer: React.FC<ExerciseVideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  exerciseName,
  className = '',
  autoPlay = false,
  aspectRatio = '9/16'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [isEmbedActivated, setIsEmbedActivated] = useState<boolean>(autoPlay);

  const parsed = parseExerciseVideoEmbed(videoUrl);

  const aspectClass = aspectRatio === '9/16' 
    ? 'aspect-[9/16] max-w-[320px] sm:max-w-[360px] mx-auto w-full' 
    : aspectRatio === '16/9' 
    ? 'aspect-video w-full' 
    : 'w-full';

  // Toggle Play/Pause on click
  const handlePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (parsed.type === 'gdrive' || parsed.type === 'youtube' || parsed.type === 'vimeo' || parsed.type === 'loom') {
      setIsEmbedActivated(true);
      setIsPlaying(true);
      return;
    }

    if (!videoRef.current) return;

    if (isEnded) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsEnded(false);
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  // 1. Placeholder when no video is present
  if (parsed.type === 'none') {
    return (
      <div className={`relative ${aspectClass} bg-[#0c0c0e] border border-white/10 rounded-[6px] overflow-hidden flex flex-col items-center justify-center text-center p-6 ${className}`}>
        {thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={exerciseName}
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-25"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/60 to-transparent" />
          </>
        ) : null}
        <div className="relative z-10 space-y-2">
          <div className="w-10 h-10 mx-auto rounded-full bg-zinc-900/80 border border-white/10 flex items-center justify-center text-zinc-400">
            <VideoIcon size={18} />
          </div>
          <p className="text-xs font-mono-num text-zinc-300">
            Form demo for <span className="text-white font-medium">{exerciseName}</span>
          </p>
        </div>
      </div>
    );
  }

  // 2. Google Drive / YouTube / Vimeo / Loom (9:16 vertical orientation)
  if (parsed.type === 'gdrive' || parsed.type === 'youtube' || parsed.type === 'vimeo' || parsed.type === 'loom') {
    if (!isEmbedActivated) {
      return (
        <div 
          ref={containerRef}
          onClick={handlePlayPause}
          className={`relative ${aspectClass} bg-[#09090b] border border-white/10 rounded-[6px] overflow-hidden cursor-pointer group select-none shadow-lg ${className}`}
        >
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={exerciseName}
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-102 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-[#0e0e11] flex items-center justify-center">
              <VideoIcon size={32} className="text-zinc-600" />
            </div>
          )}

          {/* Bottom-left play button */}
          <div className="absolute bottom-3 left-3 z-20">
            <button
              type="button"
              onClick={handlePlayPause}
              className="w-11 h-11 rounded-full bg-[#d8ff38] hover:bg-[#cbf425] text-black flex items-center justify-center shadow-lg transition-transform active:scale-95"
              aria-label={`Play video for ${exerciseName}`}
            >
              <Play size={18} fill="currentColor" className="ml-0.5" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div 
        ref={containerRef}
        className={`relative ${aspectClass} bg-black border border-white/10 rounded-[6px] overflow-hidden shadow-lg ${className}`}
      >
        <iframe
          src={parsed.embedUrl}
          title={`${exerciseName} form demonstration`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          className="w-full h-full border-0 object-cover"
        />
      </div>
    );
  }

  // 3. HTML5 Native Video Stream (9:16 orientation with bottom-left play/pause button)
  return (
    <div
      ref={containerRef}
      onClick={handlePlayPause}
      className={`relative ${aspectClass} bg-black border border-white/10 rounded-[6px] overflow-hidden select-none group cursor-pointer shadow-lg ${className}`}
    >
      <video
        ref={videoRef}
        src={parsed.embedUrl}
        poster={thumbnailUrl}
        playsInline
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover bg-black"
      />

      {/* Bottom-Left Play / Pause / Replay Button */}
      <div className="absolute bottom-3 left-3 z-20">
        <button
          type="button"
          onClick={handlePlayPause}
          className="w-11 h-11 rounded-full bg-[#d8ff38] hover:bg-[#cbf425] text-black flex items-center justify-center shadow-lg transition-transform active:scale-95"
          aria-label={isEnded ? 'Replay' : isPlaying ? 'Pause' : 'Play'}
        >
          {isEnded ? (
            <RotateCcw size={18} className="stroke-[2.5]" />
          ) : isPlaying ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" className="ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};
