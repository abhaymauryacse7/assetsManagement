import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { assetsSaga } from './saga';
import {
  AssetsState,
  INewAsset,
  IUpdateAsset,
  PaginationParameters,
} from './types';

export const initialState: AssetsState = {
  assets: [],
  count: 0,
  asset: {},
  showErrorNotification: false,
  showSuccessNotification: false,
  notificationMessage: '',
};

const slice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    getAssets(state, action: PayloadAction<PaginationParameters>) {},
    getAssetsSuccess(state, action: PayloadAction<AssetsState>) {
      state.assets = action.payload.assets;
      state.count = action.payload.count;
    },
    getAssetsFail(state, action: PayloadAction<string>) {
      state.assets = [];
    },

    getAssetById() {},
    getAssetByIdSuccess(state, action: PayloadAction<AssetsState>) {
      state.asset = action.payload.asset;
    },
    getAssetByIdFail(state, action: PayloadAction<string>) {
      state.asset = {};
    },

    addAsset(state, action: PayloadAction<INewAsset>) {},
    addAssetSuccess(state) {
      state.showSuccessNotification = true;
      state.notificationMessage = 'Asset has been added';
    },
    addAssetFail(state, action: PayloadAction<string>) {
      state.showErrorNotification = true;
      state.notificationMessage = action.payload;
    },

    updateAssetById(state, action: PayloadAction<IUpdateAsset>) {},
    updateAssetByIdSuccess(state) {
      state.showSuccessNotification = true;
      state.notificationMessage = 'Asset has been updated';
    },
    updateAssetByIdFail(state, action: PayloadAction<string>) {
      state.showErrorNotification = true;
      state.notificationMessage = action.payload;
    },

    deleteAssetById(state, action: PayloadAction<{ id: number }>) {},
    deleteAssetByIdSuccess(state) {
      state.showSuccessNotification = true;
      state.notificationMessage = 'Asset has been deleted';
    },
    deleteAssetByIdFail(state, action: PayloadAction<string>) {
      state.showErrorNotification = true;
      state.notificationMessage = action.payload;
    },

    removeNotification(state) {
      state.showErrorNotification = false;
      state.showSuccessNotification = false;
      state.notificationMessage = '';
    },
    showErrorNotification(state, action: PayloadAction<string>) {
      state.showErrorNotification = true;
      state.notificationMessage = action.payload;
    },
  },
});

export const { actions: assetsActions } = slice;

export const useAssetsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: assetsSaga });
  return { actions: slice.actions };
};
