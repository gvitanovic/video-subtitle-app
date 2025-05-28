import { type VideoAsset } from '../types';
import { type VideoAssetAdapter } from './VideoAssetAdapter';

export class NetworkVideoAdapter implements VideoAssetAdapter {
  async getAvailableAssets(): Promise<VideoAsset[]> {
    const response = await fetch('/api/videos');
    if (!response.ok) throw new Error('Failed to fetch videos');
    return await response.json();
  }
}