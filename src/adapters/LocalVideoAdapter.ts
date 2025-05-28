import { type VideoAsset } from '../types';
import { type VideoAssetAdapter } from './VideoAssetAdapter';

export class LocalVideoAdapter implements VideoAssetAdapter {
  async getAvailableAssets(): Promise<VideoAsset[]> {
    return [
      {
        id: 0,
        title: 'Sample Video 1',
        videoUrl: '/video_1/clip.mp4',
        videoType: 'video/mp4',
        subtitleUrl: '/video_1/captions.srt',
        subtitleFormat: 'srt',
      },
      {
        id: 1,
        title: 'Sample Video 2',
        videoUrl: '/video_2/clip.mp4',
        videoType: 'video/mp4',
        subtitleUrl: '/video_2/captions.srt',
        subtitleFormat: 'srt',
      },
    ];
  }
}
