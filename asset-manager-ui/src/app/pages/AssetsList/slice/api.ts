import http from 'utils/http';
import { INewAsset, IAsset, IAssets, PaginationParameters } from './types';

const routePrefix = '/assets';

export const getAssets = (parameters: PaginationParameters) => {
  return http.get<IAssets>(
    `${routePrefix}?limit=${parameters.limit}&offset=${parameters.offset}`,
  );
};
export const getAssetById = (id: number) => {
  return http.get<IAsset>(`${routePrefix}/${id}`);
};
export const addAsset = (newAsset: INewAsset) => {
  return http.post<boolean>(`${routePrefix}`, newAsset);
};
export const updateAssetById = (id: number, updatedAsset: INewAsset) => {
  return http.patch<boolean>(`${routePrefix}/${id}`, updatedAsset);
};
export const deleteAssetById = (id: number) => {
  return http.delete<boolean>(`${routePrefix}/${id}`);
};
