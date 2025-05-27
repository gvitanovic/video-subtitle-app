import { useEffect, useRef, useState } from 'react';
import { LocalVideoAdapter } from './adapters/LocalVideoAdapter';
import { VideoPlayer } from './components/VideoPlayer';
import { Transcript } from './components/Transcript';
import { type SubtitleCue, type VideoAsset } from './types';

import './App.css';

function App() {
  const [assets, setAssets] = useState<VideoAsset[]>([]);
  const [selected, setSelected] = useState<VideoAsset | null>(null);
  const [cues, setCues] = useState<SubtitleCue[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const adapter = new LocalVideoAdapter();

    adapter.getAvailableAssets().then(setAssets);
  }, []);

  return (
    <div className="app-root">
      <h1>Movie Time</h1>
      <div className="app-header">
        <label htmlFor="video-select">Select Video: </label>
        <select
          id="video-select"
          onChange={(e) => {
            const index = parseInt(e.target.value);
            setSelected(assets[index]);
            setCues([]);
          }}
        >
          <option value="">-- Choose --</option>
          {assets.map(({ title, id }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
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
