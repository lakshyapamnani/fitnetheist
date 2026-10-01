import React, { useState } from 'react';
import { Play, ExternalLink, AlertCircle, Video } from 'lucide-react';

interface ExerciseVideoPlayerProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  exerciseName: string;
  className?: string;
  autoPlay?: boolean;
}

export function parseExerciseVideoEmbed(url?: string): {
  type: 'youtube' | 'vimeo' | 'loom' | 'direct' | 'link' | 'none';
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
      embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`,
      rawUrl: cleanUrl
    };
  }

  // 2. Vimeo
  const vimeoMatch = cleanUrl.match(/(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+))/i);
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}?title=0&byline=0&portrait=0`,
      rawUrl: cleanUrl
    };
  }

  // 3. Loom
  if (cleanUrl.includes('loom.com/share/')) {
    const loomId = cleanUrl.split('loom.com/share/')[1]?.split('?')[0];
    if (loomId) {
      return {
        type: 'loom',
        embedUrl: `https://www.loom.com/embed/${loomId}`,
        rawUrl: cleanUrl
      };
    }
  }

  // 4. Direct video files
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(cleanUrl)) {
    return {
      type: 'direct',
      embedUrl: cleanUrl,
      rawUrl: cleanUrl
    };
  }

  // 5. Generic URL
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
  autoPlay = false
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const parsed = parseExerciseVideoEmbed(videoUrl);

  if (parsed.type === 'none') {
    return (
      <div className={`relative bg-zinc-950 border border-white/10 overflow-hidden flex flex-col items-center justify-center text-center p-6 min-h-[220px] ${className}`}>
        {thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={exerciseName}
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-30"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          </>
        ) : null}
        <div className="relative z-10 space-y-2">
          <div className="w-10 h-10 mx-auto rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500">
            <Video size={18} />
          </div>
          <p className="text-xs font-mono-num text-zinc-400">
            Proper form demonstration for <span className="text-white font-bold">{exerciseName}</span>
          </p>
          <p className="text-[10px] font-mono-num text-zinc-600">
            Coach can add video link in the Exercise Admin
          </p>
        </div>
      </div>
    );
  }

  if (parsed.type === 'link') {
    return (
      <div className={`relative bg-zinc-950 border border-white/10 overflow-hidden ${className}`}>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={exerciseName}
            className="w-full h-48 sm:h-56 object-cover filter grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="h-48 sm:h-56 bg-zinc-900 flex items-center justify-center">
            <Video size={32} className="text-zinc-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
          <a
            href={parsed.rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#d8ff38] hover:bg-[#cbf425] text-black font-mono-num font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
          >
            <Play size={14} fill="currentColor" />
            <span>WATCH PROPER FORM VIDEO</span>
            <ExternalLink size={12} />
          </a>
          <span className="text-[10px] font-mono-num text-zinc-400 mt-2 truncate max-w-xs">
            External demonstration guide
          </span>
        </div>
      </div>
    );
  }

  if (parsed.type === 'direct') {
    return (
      <div className={`relative bg-black border border-white/10 overflow-hidden ${className}`}>
        <video
          src={parsed.embedUrl}
          controls
          playsInline
          poster={thumbnailUrl}
          className="w-full h-full max-h-[360px] object-contain bg-black"
        >
          Your browser does not support HTML5 video.
        </video>
      </div>
    );
  }

  // Embeddable (YouTube, Vimeo, Loom)
  if (!isPlaying && thumbnailUrl) {
    return (
      <div className={`relative bg-zinc-950 border border-white/10 overflow-hidden group cursor-pointer ${className}`} onClick={() => setIsPlaying(true)}>
        <img
          src={thumbnailUrl}
          alt={exerciseName}
          className="w-full h-52 sm:h-64 object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center p-4">
          <button
            type="button"
            className="w-14 h-14 rounded-full bg-[#d8ff38] text-black flex items-center justify-center pl-1 shadow-[0_0_25px_rgba(216,255,56,0.5)] group-hover:scale-110 transition-transform"
            aria-label={`Play proper form video for ${exerciseName}`}
          >
            <Play size={22} fill="currentColor" />
          </button>
          <div className="mt-3 px-3 py-1 bg-black/80 border border-white/10 text-xs font-mono-num font-bold uppercase tracking-wider text-white">
            PROPER FORM VIDEO
          </div>
          <span className="text-[10px] font-mono-num text-zinc-300 mt-1">
            Click to play form demonstration
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-video bg-black border border-white/10 overflow-hidden ${className}`}>
      <iframe
        src={parsed.embedUrl}
        title={`${exerciseName} proper form demonstration video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
};
