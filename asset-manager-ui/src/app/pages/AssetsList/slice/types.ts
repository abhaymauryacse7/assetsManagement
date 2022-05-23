/* --- STATE --- */
export interface INewAsset {
  type: string;
  serial: string;
  color: string;
}
export interface IUpdateAsset extends INewAsset {
  id: number;
}
export interface IAsset extends IUpdateAsset {
  id: number;
  is_active: boolean;
  meta_data_hash: string;
}
export interface IAssets {
  assets: IAsset[];
}
export interface AssetsState extends IAssets {
  asset: IAsset | {};
  count: number;
  showErrorNotification: boolean;
  showSuccessNotification: boolean;
  notificationMessage: string;
}

export interface PaginationParameters {
  limit: number;
  offset: number;
}
