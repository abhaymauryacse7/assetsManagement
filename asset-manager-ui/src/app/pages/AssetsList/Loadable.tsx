/**
 * Asynchronously loads the component for AssetsList
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const AssetsList = lazyLoad(
  () => import('./index'),
  module => module.AssetsList,
  {
    fallback: <div>Loading...</div>,
  },
);
