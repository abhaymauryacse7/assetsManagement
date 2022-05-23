import * as express from "express";

// import sub-routers
import {AssetRouter} from './../assets/assets.routes';

let router:express.Router = express.Router();

// mount express paths, any addition middleware can be added as well.
// ex. router.use('/pathway', middleware_function, sub-router);

router.use('/assets', AssetRouter);

// Export the router
export default router;