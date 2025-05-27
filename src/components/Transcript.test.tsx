import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Transcript } from './Transcript';
import { type SubtitleCue } from '../types';

const cues: SubtitleCue[] = [
  { start: 0, end: 2, text: 'First line' },
  { start: 3, end: 5, text: 'Second line' },
];

describe('Transcript', () => {
  it('renders all cues', () => {
    render(<Transcript transcript={cues} currentTime={0} />);
    expect(screen.getByText('First line')).toBeInTheDocument();
    expect(screen.getByText('Second line')).toBeInTheDocument();
  });

  it('highlights the active cue', () => {
    render(<Transcript transcript={cues} currentTime={3.5} />);
    const all = screen.getAllByText('Second line');
    const active = all.find((el) => el.className.includes('transcript-cue-active'));
    expect(active).toBeDefined();
    expect(active).toHaveClass('transcript-cue-active');
  });

  it('calls onSeek when a cue is clicked', () => {
    const onSeek = vi.fn();
    render(<Transcript transcript={cues} currentTime={0} onSeek={onSeek} />);
    const all = screen.getAllByText('Second line');
    const clickable = all.find((el) => el.className.includes('transcript-cue-pointer'));
    expect(clickable).toBeDefined();
    if (clickable) fireEvent.click(clickable);
    expect(onSeek).toHaveBeenCalledWith(3);
  });
});
