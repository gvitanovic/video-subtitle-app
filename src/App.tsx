import { useRef, useState } from 'react';

import { Transcript, VideoSelect, VideoPlayer } from './components';

import { type SubtitleCue, type VideoAsset } from './types';

import './App.css';
import { useVideoAssets } from './adapters/useVideoAssets';

function App() {
  const [selected, setSelected] = useState<VideoAsset | null>(null);
  const [cues, setCues] = useState<SubtitleCue[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(true);

  const { assets } = useVideoAssets('local');

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="app-root">
      <h1>Movie Time</h1>
      <div className="app-header">
        <VideoSelect
          assets={assets}
          selectedId={selected ? assets.findIndex((a) => a.id === selected.id) : null}
          onSelect={(asset) => {
            setSelected(asset);
            setCues([]);
          }}
        />
        <button style={{ marginLeft: '1rem' }} onClick={() => setShowTranscript((prev) => !prev)}>
          {showTranscript ? 'Hide' : 'Show'} Transcript
        </button>
      </div>

      {selected && (
        <div className="app-row">
          <VideoPlayer
            key={selected.videoUrl}
            ref={videoRef}
            asset={selected}
            onCuesLoaded={setCues}
            onTimeUpdate={setCurrentTime}
          />

          <div
            className={
              'app-transcript-panel ' +
              (showTranscript ? 'app-transcript-panel--visible' : 'app-transcript-panel--hidden')
            }
          >
            {showTranscript && (
              <Transcript
                transcript={cues}
                currentTime={currentTime}
                onSeek={(time) => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = time;
                    videoRef.current.play();
                  }
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
