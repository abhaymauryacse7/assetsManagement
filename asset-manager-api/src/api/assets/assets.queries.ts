export const AssetQueries = {

  GetAssets: `
  SELECT
    id,
    type,
    serial,
    color,
    meta_data_hash,
    is_active
  FROM assets_system.assets as a
  WHERE
    a.is_active = true
  ORDER BY id DESC
  LIMIT ? OFFSET ? 
  `,

  GetAssetsCount: `
  SELECT
    COUNT(1) AS count
  FROM assets_system.assets as a
  WHERE
    a.is_active = true
  `,

  GetAssetBySerial: `
  SELECT
    id,
    type,
    serial,
    color,
    meta_data_hash,
    is_active
  FROM assets_system.assets as a
  WHERE
    a.serial = ? AND a.is_active = true
  `,

  GetAssetById: `
  SELECT
    id,
    type,
    serial,
    color,
    meta_data_hash,
    is_active
  FROM assets_system.assets as a
  WHERE
    a.id = ? AND a.is_active = true
  `,

  AddAsset: `
  INSERT INTO assets_system.assets (type, serial, color, meta_data_hash)
    VALUES (?, ?, ?, ?);
  `,

  UpdateAssetById: `
  UPDATE assets_system.assets
  SET type = ?,
      color = ?,
      serial = ?,
      meta_data_hash = ?
  WHERE
    id = ?
  `,

  DeleteAssetById: `
  UPDATE assets_system.assets
  SET is_active = false
  WHERE
    id = ?
  `
};