import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.assets || initialState;

export const selectAssets = createSelector([selectSlice], state => state);
