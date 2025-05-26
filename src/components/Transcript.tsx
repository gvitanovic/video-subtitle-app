import React, { useEffect, useRef } from 'react';

import { type SubtitleCue } from '../types';

import './Transcript.css';

interface Props {
  transcript: SubtitleCue[];
  currentTime: number;
  onSeek?: (time: number) => void;
}

export const Transcript: React.FC<Props> = ({ transcript, currentTime, onSeek }) => {
  const cueRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = transcript.findIndex(
    cue => currentTime >= cue.start && currentTime <= cue.end
  );

  useEffect(() => {
    const container = containerRef.current;
    const activeCue = cueRefs.current[activeIndex];
    if (container && activeCue && activeIndex !== -1) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeCue.getBoundingClientRect();
      const offset = activeRect.top - containerRect.top;
      const scroll = offset - container.clientHeight / 2 + activeCue.clientHeight / 2;
      container.scrollTop += scroll;
    }
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="transcript-container"
    >
      <h3 className="transcript-heading">Transcript</h3>
      {transcript.map((cue, index) => {
        const isActive = index === activeIndex;
        return (
          <p
            key={index}
            ref={el => {
              cueRefs.current[index] = el;
            }}
            className={[
              'transcript-cue',
              isActive ? 'transcript-cue-active' : '',
              onSeek ? 'transcript-cue-pointer' : '',
            ].join(' ')}
            onClick={() => onSeek && onSeek(cue.start)}
          >
            {cue.text}
          </p>
        );
      })}
    </div>
  );
};
