import * as express from 'express';
import * as AssetController from './assets.controller';

let AssetRouter:express.Router = express.Router();
AssetRouter.get('/', AssetController.getAssets);
AssetRouter.get('/:id', AssetController.getAssetById);
AssetRouter.post('/', AssetController.addAsset);
AssetRouter.patch('/:id', AssetController.updateAssetById);
AssetRouter.delete('/:id', AssetController.deleteAssetById);
export {AssetRouter};
