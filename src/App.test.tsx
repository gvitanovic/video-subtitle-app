import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock LocalVideoAdapter
vi.mock('./adapters/LocalVideoAdapter', () => {
  return {
    LocalVideoAdapter: vi.fn().mockImplementation(() => ({
      getAvailableAssets: vi.fn().mockResolvedValue([
        {
          id: 0,
          title: 'Test Video',
          videoUrl: 'test.mp4',
          subtitleUrl: 'test.srt',
        },
      ]),
    })),
  };
});

// Mock VideoPlayer and Transcript to avoid actual video/subtitle logic
vi.mock('./components/VideoPlayer', () => ({
  VideoPlayer: vi.fn(() => <div data-testid="video-player" />),
}));
vi.mock('./components/Transcript', () => ({
  Transcript: vi.fn(() => <div data-testid="transcript" />),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header and video select', async () => {
    render(<App />);
    expect(screen.getByText(/Movie Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Video/i)).toBeInTheDocument();
    expect(await screen.findByText('Test Video')).toBeInTheDocument();
  });

  it('shows and hides transcript panel', async () => {
    render(<App />);
    // Select the video
    fireEvent.change(screen.getByLabelText(/Select Video/i), { target: { value: '0' } });
    // Transcript should be visible
    expect(await screen.findByTestId('transcript')).toBeInTheDocument();
    // Click hide transcript
    fireEvent.click(screen.getAllByRole('button', { name: /Hide Transcript/i })[0]);
    // Transcript should not be visible
    expect(screen.queryByTestId('transcript')).not.toBeInTheDocument();
    // Click show transcript
    fireEvent.click(screen.getByRole('button', { name: /Show Transcript/i }));
    expect(await screen.findByTestId('transcript')).toBeInTheDocument();
  });
});