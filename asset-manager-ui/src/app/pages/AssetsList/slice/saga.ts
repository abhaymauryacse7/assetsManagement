import { takeLatest, call, put, all } from 'redux-saga/effects';
import { assetsActions as actions } from '.';
import * as Api from './api';

let apiErrorMessage = 'Something went wrong';
function* getAssets(action) {
  try {
    const response = yield call(Api.getAssets, action.payload);
    if (!response || !response.data || !response.data.assets) {
      yield put({ type: actions.getAssetsFail.type, payload: apiErrorMessage });
      return;
    }
    yield put({
      type: actions.getAssetsSuccess.type,
      payload: response.data,
    });
  } catch (e: any) {
    yield put({ type: actions.getAssetsFail.type, payload: e.message });
  }
}
function* getAssetById(action) {
  try {
    const response = yield call(Api.getAssetById, action.payload.id);
    if (!response || !response.data || !response.data.asset) {
      yield put({
        type: actions.getAssetByIdFail.type,
        payload: apiErrorMessage,
      });
      return;
    }
    yield put({
      type: actions.getAssetByIdSuccess.type,
      payload: response.data,
    });
  } catch (e: any) {
    yield put({ type: actions.getAssetByIdFail.type, payload: e.message });
  }
}
function* addAsset(action) {
  try {
    const response = yield call(Api.addAsset, action.payload);
    if (!response || !response.data || !response.data.result) {
      yield put({ type: actions.addAssetFail.type, payload: apiErrorMessage });
      return;
    }
    yield put({ type: actions.addAssetSuccess.type });
    // yield put({ type: actions.getAssets.type });
  } catch (e: any) {
    let message = e.message;
    if (e.response && e.response.data && e.response.data.message) {
      message = e.response.data.message;
    }
    yield put({ type: actions.addAssetFail.type, payload: message });
  }
}

function* updateAssetById(action) {
  try {
    const response = yield call(
      Api.updateAssetById,
      action.payload.id,
      action.payload,
    );
    if (!response || !response.data || !response.data.result) {
      yield put({
        type: actions.updateAssetByIdFail.type,
        payload: apiErrorMessage,
      });
      return;
    }
    yield put({ type: actions.updateAssetByIdSuccess.type });
    // yield put({ type: actions.getAssets.type });
  } catch (e: any) {
    let message = e.message;
    if (e.response && e.response.data && e.response.data.message) {
      message = e.response.data.message;
    }
    yield put({ type: actions.updateAssetByIdFail.type, payload: message });
  }
}

function* deleteAssetById(action) {
  try {
    const response = yield call(Api.deleteAssetById, action.payload.id);
    if (!response || !response.data || !response.data.result) {
      yield put({
        type: actions.deleteAssetByIdFail.type,
        payload: apiErrorMessage,
      });
      return;
    }
    yield put({ type: actions.deleteAssetByIdSuccess.type });
    // yield put({ type: actions.getAssets.type });
  } catch (e: any) {
    let message = e.message;
    if (e.response && e.response.data && e.response.data.message) {
      message = e.response.data.message;
    }
    yield put({ type: actions.deleteAssetByIdFail.type, payload: message });
  }
}

export function* getAssetsSaga() {
  yield takeLatest(actions.getAssets.type, getAssets);
}
export function* getAssetByIdSaga() {
  yield takeLatest(actions.getAssetById.type, getAssetById);
}
export function* addAssetSaga() {
  yield takeLatest(actions.addAsset.type, addAsset);
}
export function* updateAssetByIdSaga() {
  yield takeLatest(actions.updateAssetById.type, updateAssetById);
}
export function* deleteAssetByIdSaga() {
  yield takeLatest(actions.deleteAssetById.type, deleteAssetById);
}

export function* assetsSaga() {
  yield all([
    getAssetsSaga(),
    getAssetByIdSaga(),
    addAssetSaga(),
    updateAssetByIdSaga(),
    deleteAssetByIdSaga(),
  ]);
}
