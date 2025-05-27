import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { parseSRT } from '../../utils/parseSRT';
import { type SubtitleCue, type VideoAsset } from '../../types';
import './VideoPlayer.css';

interface Props {
  asset: VideoAsset;
  onCuesLoaded: (cues: SubtitleCue[]) => void;
  onTimeUpdate: (time: number) => void;
}

export const VideoPlayer = forwardRef<HTMLVideoElement, Props>(
  ({ asset, onCuesLoaded, onTimeUpdate }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentCue, setCurrentCue] = useState<SubtitleCue | null>(null);
    const [subtitles, setSubtitles] = useState<SubtitleCue[]>([]);
    const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
    const [fontSize, setFontSize] = useState(100); // percent

    useImperativeHandle(ref, () => videoRef.current!);

    useEffect(() => {
      fetch(asset.subtitleUrl)
        .then((res) => res.text())
        .then(parseSRT)
        .then((data) => {
          setSubtitles(data);
          onCuesLoaded(data);
        });
    }, [asset, onCuesLoaded]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const updateCue = () => {
        const time = video.currentTime;
        const cue = subtitles.find((c) => time >= c.start && time <= c.end);
        setCurrentCue(cue || null);
        onTimeUpdate(time);
      };

      video.addEventListener('timeupdate', updateCue);
      return () => {
        video.removeEventListener('timeupdate', updateCue);
      };
    }, [subtitles, onTimeUpdate]);

    const handleFullScreen = () => {
      if (!document.fullscreenElement && containerRef.current) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    };

    const sizeFactor = 10;

    useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        if (
          (e.key === 'f' || e.key === 'F') &&
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          handleFullScreen();
        }
        if (
          (e.key === 's' || e.key === 'S') &&
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          setSubtitlesEnabled((prev) => !prev);
        }
        if (
          (e.key === 'o' || e.key === 'O') &&
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          setFontSize((prev) => Math.max(50, prev - sizeFactor)); // min 50%
        }
        if (
          (e.key === 'p' || e.key === 'P') &&
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          setFontSize((prev) => Math.min(300, prev + sizeFactor)); // max 300%
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
      const handleFullscreenChange = () => {
        if (document.fullscreenElement) {
          setFontSize((prev) => Math.max(prev, 120)); // bump to at least 120% in fullscreen
        } else {
          setFontSize((prev) => Math.min(prev, 100)); // revert to at most 100% when not fullscreen
        }
        setSubtitlesEnabled((prev) => prev); // force re-render to re-apply overlay
      };
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
      };
    }, []);

    return (
      <div ref={containerRef} onDoubleClick={handleFullScreen} className="video-player-container">
        <video
          ref={videoRef}
          data-testid="video-element"
          width="100%"
          height="100%"
          controls
          controlsList="nofullscreen"
          className="video-player-element"
        >
          <source src={asset.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {currentCue && subtitlesEnabled && (
          <div className="video-player-subtitles" style={{ fontSize: `${fontSize}%` }}>
            <span className="video-player-subtitles-text">{currentCue.text}</span>
          </div>
        )}
      </div>
    );
  },
);
