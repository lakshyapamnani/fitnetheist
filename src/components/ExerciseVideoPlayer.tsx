import React, { useState } from 'react';
import { Play, ExternalLink, AlertCircle, Video } from 'lucide-react';

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
      embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`,
      rawUrl: cleanUrl
    };
  }

  // 2. Google Drive video links (e.g., https://drive.google.com/file/d/ID/view, https://drive.google.com/open?id=ID)
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
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}?title=0&byline=0&portrait=0`,
      rawUrl: cleanUrl
    };
  }

  // 4. Loom
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
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const parsed = parseExerciseVideoEmbed(videoUrl);

  const aspectClass = aspectRatio === '9/16' 
    ? 'aspect-[9/16] max-w-[340px] sm:max-w-[380px] mx-auto w-full' 
    : aspectRatio === '16/9' 
    ? 'aspect-video w-full' 
    : 'w-full';

  if (parsed.type === 'none') {
    return (
      <div className={`relative bg-zinc-950 border border-white/10 overflow-hidden flex flex-col items-center justify-center text-center p-6 ${aspectClass} ${className}`}>
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
        <div className="relative z-10 space-y-2 p-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[#d8ff38]">
            <Video size={20} />
          </div>
          <p className="text-xs font-mono-num text-zinc-300">
            Form demo for <span className="text-white font-bold block mt-0.5">{exerciseName}</span>
          </p>
          <span className="inline-block text-[10px] font-mono-num text-zinc-500 uppercase tracking-wider bg-black/60 px-2 py-0.5 border border-white/5">
            9:16 VERTICAL COACHING
          </span>
        </div>
      </div>
    );
  }

  if (parsed.type === 'link') {
    return (
      <div className={`relative bg-zinc-950 border border-white/10 overflow-hidden ${aspectClass} ${className}`}>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={exerciseName}
            className="w-full h-full object-cover filter grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <Video size={36} className="text-zinc-600" />
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
            <span>WATCH 9:16 VIDEO</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    );
  }

  if (parsed.type === 'direct') {
    return (
      <div className={`relative bg-black border border-white/10 overflow-hidden ${aspectClass} ${className}`}>
        <video
          src={parsed.embedUrl}
          controls
          playsInline
          poster={thumbnailUrl}
          className="w-full h-full object-contain bg-black"
        >
          Your browser does not support HTML5 video.
        </video>
      </div>
    );
  }

  // Embeddable preview before playing (YouTube, Google Drive, Vimeo, Loom)
  if (!isPlaying && thumbnailUrl) {
    return (
      <div 
        className={`relative bg-zinc-950 border border-white/10 overflow-hidden group cursor-pointer ${aspectClass} ${className}`} 
        onClick={() => setIsPlaying(true)}
      >
        <img
          src={thumbnailUrl}
          alt={exerciseName}
          className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center p-4 text-center">
          <button
            type="button"
            className="w-14 h-14 rounded-full bg-[#d8ff38] text-black flex items-center justify-center pl-1 shadow-[0_0_25px_rgba(216,255,56,0.6)] group-hover:scale-110 transition-transform"
            aria-label={`Play 9:16 video for ${exerciseName}`}
          >
            <Play size={22} fill="currentColor" />
          </button>
          <div className="mt-4 px-3 py-1 bg-black/80 border border-white/10 text-[11px] font-mono-num font-bold uppercase tracking-wider text-white">
            {parsed.type === 'gdrive' ? 'GOOGLE DRIVE 9:16 VIDEO' : 'PROPER FORM VIDEO'}
          </div>
          <span className="text-[10px] font-mono-num text-zinc-400 mt-1">
            Click to play form demonstration
          </span>
        </div>
      </div>
    );
  }

  // Embed Frame (Google Drive preview, YouTube, Vimeo, Loom in 9:16 orientation)
  return (
    <div className={`relative bg-black border border-white/10 overflow-hidden shadow-2xl ${aspectClass} ${className}`}>
      <iframe
        src={parsed.embedUrl}
        title={`${exerciseName} proper form demonstration video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        className="w-full h-full border-0 object-cover"
      />
    </div>
  );
};
