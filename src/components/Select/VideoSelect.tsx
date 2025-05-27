import React from 'react';

import { Select } from './Select';
import { type VideoAsset } from '../../types';

interface VideoSelectProps {
  assets: VideoAsset[];
  selectedId: number | null;
  onSelect: (asset: VideoAsset | null) => void;
}

export const VideoSelect: React.FC<VideoSelectProps> = ({ assets, selectedId, onSelect }) => (
  <Select<VideoAsset>
    id="video-select"
    label="Select Video:"
    options={assets}
    value={selectedId !== null ? assets[selectedId]?.id : ''}
    getOptionLabel={option => option.title}
    getOptionValue={option => option.id}
    onChange={onSelect}
    placeholder="-- Choose --"
  />
);