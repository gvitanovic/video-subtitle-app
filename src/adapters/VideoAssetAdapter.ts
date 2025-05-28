import { type VideoAsset } from '../types';

export interface VideoAssetAdapter {
  getAvailableAssets(): Promise<VideoAsset[]>;
}