import { describe, it, expect } from 'vitest';
import { parseSRT } from './parseSRT';

describe('parseSRT', () => {
  it('parses a simple SRT file', () => {
    const srt = `1
00:00:01,000 --> 00:00:03,000
Hello world!

2
00:00:04,000 --> 00:00:06,000
Second line.`;
    const cues = parseSRT(srt);
    expect(cues).toHaveLength(2);
    expect(cues[0].text).toBe('Hello world!');
    expect(cues[1].start).toBe(4);
    expect(cues[1].end).toBe(6);
  });
});