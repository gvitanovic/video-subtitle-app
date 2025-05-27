import type { SubtitleCue } from '../types';

export function parseSRT(srt: string): SubtitleCue[] {
  return srt
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split('\n');
      if (lines.length >= 3) {
        const [start, end] = lines[1].split(' --> ').map(timeToSeconds);
        const text = lines.slice(2).join('\n');
        return { start, end, text };
      }
      return null;
    })
    .filter(Boolean) as SubtitleCue[];
}

function timeToSeconds(time: string): number {
  const [h, m, s] = time.replace(',', '.').split(':');
  const [sec, ms] = s.split('.');
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(sec) + parseInt(ms) / 1000;
}
