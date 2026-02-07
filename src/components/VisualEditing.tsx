'use client';

import { enableVisualEditing } from '@sanity/visual-editing';
import { useEffect } from 'react';

export function VisualEditing() {
  useEffect(() => {
    // Enable visual editing overlays
    const cleanup = enableVisualEditing();

    return () => {
      // Cleanup on unmount
      if (cleanup) cleanup();
    };
  }, []);

  return null;
}
