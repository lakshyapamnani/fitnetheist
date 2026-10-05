import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Maximize, 
  Minimize, 
  Volume2, 
  VolumeX, 
  Video as VideoIcon,
  Check
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

  // 2. Google Drive video links (https://drive.google.com/file/d/ID/view, open?id=ID, uc?id=ID)
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

// Format seconds into m:ss
const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

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
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isEmbedActivated, setIsEmbedActivated] = useState<boolean>(autoPlay);

  const parsed = parseExerciseVideoEmbed(videoUrl);

  const aspectClass = aspectRatio === '9/16' 
    ? 'aspect-[9/16] max-w-[320px] sm:max-w-[360px] mx-auto w-full' 
    : aspectRatio === '16/9' 
    ? 'aspect-video w-full' 
    : 'w-full';

  // Handle autohiding controls during playback
  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSpeedMenu(false);
      }, 2500);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      resetControlsTimer();
    } else {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // HTML5 Video Event Handlers
  const handlePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) {
      setIsEmbedActivated(true);
      setIsPlaying(true);
      return;
    }

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

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSkip = (seconds: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    resetControlsTimer();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleChangeSpeed = (speed: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    setShowControls(true);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : isEnded ? 100 : 0;

  // Placeholder when no video
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
          <span className="text-[10px] font-mono-num text-zinc-500 uppercase">
            9:16 Video Guide
          </span>
        </div>
      </div>
    );
  }

  // Embeddable Players (Google Drive / YouTube / Vimeo / Loom) in 9:16 vertical container
  if (parsed.type === 'gdrive' || parsed.type === 'youtube' || parsed.type === 'vimeo' || parsed.type === 'loom') {
    if (!isEmbedActivated) {
      return (
        <div 
          ref={containerRef}
          onClick={() => { setIsEmbedActivated(true); setIsPlaying(true); }}
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

          {/* Minimal Dim Layer */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
            {/* Single Center Play Button (56px) */}
            <button
              type="button"
              className="w-14 h-14 rounded-full bg-[#d8ff38] text-black flex items-center justify-center pl-1 shadow-lg group-hover:scale-105 active:scale-95 transition-transform"
              aria-label={`Play 9:16 demonstration video for ${exerciseName}`}
            >
              <Play size={22} fill="currentColor" />
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

  // HTML5 Native Video / Direct MP4 Stream with Minimal Custom Controls in 9:16
  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimer}
      onClick={() => {
        if (isPlaying) {
          setShowControls(prev => !prev);
        } else {
          handlePlayPause();
        }
      }}
      className={`relative ${aspectClass} bg-black border border-white/10 rounded-[6px] overflow-hidden select-none group cursor-pointer shadow-lg ${className}`}
    >
      <video
        ref={videoRef}
        src={parsed.embedUrl}
        poster={thumbnailUrl}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover bg-black"
      />

      {/* Center Play / Replay Button Overlay (Shown when Paused or Ended) */}
      {(!isPlaying || isEnded) && (
        <div className="absolute inset-0 bg-black/35 flex items-center justify-center pointer-events-auto">
          <button
            type="button"
            onClick={handlePlayPause}
            className="w-14 h-14 rounded-full bg-[#d8ff38] hover:bg-[#cbf425] text-black flex items-center justify-center pl-0.5 shadow-lg hover:scale-105 active:scale-95 transition-transform"
            aria-label={isEnded ? 'Replay video' : 'Play video'}
          >
            {isEnded ? (
              <RotateCcw size={22} className="stroke-[2.5]" />
            ) : (
              <Play size={22} fill="currentColor" className="ml-0.5" />
            )}
          </button>
        </div>
      )}

      {/* Minimal 10s Skip Buttons (Subtle, Transparent, visible on interaction) */}
      {isPlaying && showControls && (
        <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-none">
          <button
            type="button"
            onClick={(e) => handleSkip(-10, e)}
            className="pointer-events-auto w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-zinc-300 hover:text-white flex items-center justify-center transition-colors opacity-70 hover:opacity-100"
            title="Rewind 10s"
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            onClick={(e) => handleSkip(10, e)}
            className="pointer-events-auto w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-zinc-300 hover:text-white flex items-center justify-center transition-colors opacity-70 hover:opacity-100"
            title="Forward 10s"
          >
            <RotateCw size={15} />
          </button>
        </div>
      )}

      {/* Bottom Minimal Control Bar */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-6 pb-2.5 px-3 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Bar */}
        <div className="relative flex items-center group/scrub mb-2">
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#d8ff38] focus:outline-none"
            style={{
              background: `linear-gradient(to right, #d8ff38 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`
            }}
          />
        </div>

        {/* Control Buttons Row */}
        <div className="flex items-center justify-between text-white font-mono-num text-xs">
          
          {/* Left: Play/Pause & Time */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePlayPause}
              className="text-white hover:text-[#d8ff38] p-1 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
            </button>

            <span className="text-[10px] text-zinc-300 tracking-wider">
              {formatTime(currentTime)} / {formatTime(duration || 0)}
            </span>
          </div>

          {/* Right: Speed, Mute, Fullscreen */}
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowSpeedMenu(!showSpeedMenu); }}
                className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] text-zinc-300 hover:text-white transition-colors"
              >
                {playbackSpeed}x
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-[#121216] border border-white/10 rounded py-1 shadow-xl z-20">
                  {[0.75, 1, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={(e) => handleChangeSpeed(speed, e)}
                      className={`w-full px-3 py-1 text-left text-[11px] flex items-center justify-between gap-2 hover:bg-white/10 ${
                        playbackSpeed === speed ? 'text-[#d8ff38] font-bold' : 'text-zinc-300'
                      }`}
                    >
                      <span>{speed}x</span>
                      {playbackSpeed === speed && <Check size={10} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleToggleMute}
              className="text-zinc-300 hover:text-white p-1 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="text-zinc-300 hover:text-white p-1 transition-colors"
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
