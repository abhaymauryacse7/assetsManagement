import { execute } from "./../utils/mysql.connector";

import { AssetQueries } from "./assets.queries";
import { IAsset, IUpdateAsset } from "./assets.model";

/**
 * gets active assets
 */
export const getAssets = async (limit: number, offset: number) => {
  return execute<IAsset[]>(AssetQueries.GetAssets, [limit, offset]);
};

/**
 * gets active assets count
 */
 export const getAssetsCount = async () => {
  return execute<[{count: number}]>(AssetQueries.GetAssetsCount, []);
};

/**
 * gets a asset based on id provided
 */
export const getAssetById = async (id: IAsset['id']) => {
  return execute<IAsset>(AssetQueries.GetAssetById, [id]);
};

/**
 * gets a asset based on serial provided
 */
export const getAssetBySerial = async (serial: IAsset['serial']) => {
  return execute<IAsset>(AssetQueries.GetAssetBySerial, [serial]);
};

/**
 * adds a new active asset record
 */
export const insertAsset = async (asset: IAsset) => {
  const result = await execute<{ affectedRows: number }>(AssetQueries.AddAsset, [
    asset.type,
    asset.serial,
    asset.color,
    asset.meta_data_hash
  ]);
  return result.affectedRows > 0;
};

/**
 * updates asset information based on the id provided
 */
export const updateAsset = async (asset: IUpdateAsset) => {
  const result = await execute<{ affectedRows: number }>(AssetQueries.UpdateAssetById, [
    asset.type,
    asset.color,
    asset.serial,
    asset.meta_data_hash,
    asset.id
  ]);
  return result.affectedRows > 0;
};

/**
 * updates asset information based on the id provided
 */
 export const deleteAsset = async (id: IAsset['id']) => {
  const result = await execute<{ affectedRows: number }>(AssetQueries.DeleteAssetById, [
    id
  ]);
  return result.affectedRows > 0;
};