import { Request, RequestHandler, Response } from 'express';
import {
  IGetAssetReq,
  IAddAssetReq,
  IUpdateAssetReq,
  IUpdateAsset,
  IDeleteAssetReq
} from './assets.model';
import * as AssetService from './assets.service';
import { sha256 } from 'js-sha256';

/**
 * Get active asset records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getAssets: RequestHandler = async (req: Request, res: Response) => {
  try {
    let offset = 0;
    let limit = 10;

    if (req.query.limit 
      && (typeof req.query.limit === 'string')
    ) {
      const requestLimit = parseInt(req.query.limit);
      if (!isNaN(requestLimit)) {
        limit = requestLimit;
      }
    }
    if (req.query.offset 
      && (typeof req.query.offset === 'string')
    ) {
      const requestOffset = parseInt(req.query.offset);
      if (!isNaN(requestOffset)) {
        offset = requestOffset;
      }
    }

    const assets = await AssetService.getAssets(limit, offset);
    const assetsCount = await AssetService.getAssetsCount();

    let count = 0;
    if (assetsCount && assetsCount[0] && assetsCount[0].count) {
      count = assetsCount[0].count;
    }

    res.status(200).json({
      assets: assets,
      count: count
    });
  } catch (error) {
    console.error('[assets.controller][getAssets][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching assets'
    });
  }
};

/**
 * Get asset record based on id provided
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore
export const getAssetById: RequestHandler = async (req: IGetAssetReq, res: Response) => {
  try {
    const asset = await AssetService.getAssetById(req.params.id);

    res.status(200).json({
      asset
    });
  } catch (error) {
    console.error('[assets.controller][getAssetById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching asset'
    });
  }
};

/**
 * Inserts a new asset record based
 *
 * @param req Express Request
 * @param res Express Response
 */
export const addAsset: RequestHandler = async (req: IAddAssetReq, res: Response) => {
  try {
    let body = req.body;
    body.meta_data_hash = sha256(JSON.stringify(body));

    //check if serial exists
    const asset = await AssetService.getAssetBySerial(body.serial);
    if (Object.keys(asset).length !== 0  ) {
      res.status(409).json({
        message: 'Serial number already exists'
      });
      return;
    }

    const result = await AssetService.insertAsset(body);

    res.status(200).json({
      result
    });
  } catch (error) {
    console.error('[assets.controller][addAsset][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when adding new asset'
    });
  }
};

/**
 * Updates existing asset record
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore
export const updateAssetById: RequestHandler = async (req: IUpdateAssetReq, res: Response) => {
  try {
    //check if serial exists
    const asset = await AssetService.getAssetBySerial(req.body.serial);
    if (Object.keys(asset).length !== 0  && asset[0].id != req.body.id) {
      res.status(409).json({
        message: 'Serial number already exists'
      });
      return;
    }

    let data: IUpdateAsset = {
      type: req.body.type,
      color: req.body.color,
      serial: req.body.serial,
      meta_data_hash: sha256(JSON.stringify({type: req.body.type,
        color: req.body.color,
        serial: req.body.serial})),
      id: req.params.id
    }

    const result = await AssetService.updateAsset(data);

    res.status(200).json({
      result
    });
  } catch (error) {
    console.error('[assets.controller][updateAssetById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when updating asset'
    });
  }
};

/**
 * deletes a asset
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore
export const deleteAssetById: RequestHandler = async (req: IDeleteAssetReq, res: Response) => {
  try {
    const result = await AssetService.deleteAsset(req.params.id);

    res.status(200).json({
      result
    });
  } catch (error) {
    console.error('[assets.controller][deleteAssetById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when deleting asset'
    });
  }
};