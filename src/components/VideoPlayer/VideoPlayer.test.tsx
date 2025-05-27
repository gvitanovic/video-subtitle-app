import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VideoPlayer } from './VideoPlayer';
import { type VideoAsset, type SubtitleCue } from '../../types';

// Mock parseSRT to return a known cue
vi.mock('../utils/parseSRT', () => ({
  parseSRT: vi.fn(() => [{ start: 0, end: 10, text: 'Hello subtitle!' }] as SubtitleCue[]),
}));

// Mock fetch to resolve with a dummy SRT string
beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    text: () => Promise.resolve('dummy srt'),
  }) as unknown as typeof fetch;
});
afterEach(() => {
  vi.resetAllMocks();
});

const asset: VideoAsset = {
  id: 1,
  title: 'Test Video',
  videoUrl: 'test.mp4',
  subtitleUrl: 'test.srt',
};

describe('VideoPlayer', () => {
  it('renders video element', async () => {
    render(<VideoPlayer asset={asset} onCuesLoaded={() => {}} onTimeUpdate={() => {}} />);
    expect(screen.getByTestId('video-element')).toBeInTheDocument();
  });
});
