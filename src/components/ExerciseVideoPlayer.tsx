import React from 'react';
import { Video as VideoIcon } from 'lucide-react';

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
  aspectRatio = '9/16'
}) => {
  const parsed = parseExerciseVideoEmbed(videoUrl);

  const aspectClass = aspectRatio === '9/16' 
    ? 'aspect-[9/16] max-w-[320px] sm:max-w-[360px] mx-auto w-full' 
    : aspectRatio === '16/9' 
    ? 'aspect-video w-full' 
    : 'w-full';

  // 1. Placeholder when no video
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

  // 2. Google Drive & Embedded Video Player (Native Drive Controls only)
  if (parsed.type === 'gdrive' || parsed.type === 'youtube' || parsed.type === 'vimeo' || parsed.type === 'loom') {
    return (
      <div 
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

  // 3. Direct HTML5 Video File with Native browser controls
  if (parsed.type === 'direct') {
    return (
      <div
        className={`relative ${aspectClass} bg-black border border-white/10 rounded-[6px] overflow-hidden shadow-lg ${className}`}
      >
        <video
          src={parsed.embedUrl}
          poster={thumbnailUrl}
          controls
          playsInline
          className="w-full h-full object-cover bg-black"
        >
          Your browser does not support HTML5 video.
        </video>
      </div>
    );
  }

  // 4. External link fallback
  return (
    <div className={`relative ${aspectClass} bg-black border border-white/10 rounded-[6px] overflow-hidden ${className}`}>
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={exerciseName}
          className="w-full h-full object-cover opacity-60"
        />
      )}
    </div>
  );
};
