export interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}

export interface VideoAsset {
  id: number;
  title: string;
  videoUrl: string;
  videoType?: string;
  subtitleUrl: string;
  subtitleFormat?: 'srt' | 'vtt';
}
