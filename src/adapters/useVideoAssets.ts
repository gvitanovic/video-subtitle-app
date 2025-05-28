import { useEffect, useState } from 'react';
import { LocalVideoAdapter } from './LocalVideoAdapter';
import { NetworkVideoAdapter } from './NetworkVideoAdapter';
import { type VideoAsset } from '../types';
import { type VideoAssetAdapter } from './VideoAssetAdapter';

type Source = 'local' | 'network';

export function useVideoAssets(source: Source = 'local') {
  const [assets, setAssets] = useState<VideoAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let adapter: VideoAssetAdapter;
    if (source === 'network') {
      adapter = new NetworkVideoAdapter();
    } else {
      adapter = new LocalVideoAdapter();
    }

    setLoading(true);
    adapter
      .getAvailableAssets()
      .then(setAssets)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [source]);

  return { assets, loading, error };
}