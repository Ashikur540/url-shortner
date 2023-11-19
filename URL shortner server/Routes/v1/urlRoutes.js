import express from 'express';
import { createUrl, editUrl, getAllUrls, getSingleUrl } from '../../controllers/urlController.js';
import apiRouteMiddleware from '../../middlewares/common/apiRoutesMiddleware.js';

const urlRoutes = express.Router()


urlRoutes.get('/', getAllUrls)
urlRoutes.post('/',apiRouteMiddleware, createUrl)
urlRoutes.get('/:shortedId', getSingleUrl)
urlRoutes.patch('/:shortedId',apiRouteMiddleware, editUrl)


export default urlRoutes;