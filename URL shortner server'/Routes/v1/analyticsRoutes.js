import express from 'express';
import { getURLAnalytics, getUserAnalytics } from '../../controllers/analyticsController.js';
import apiRouteMiddleware from '../../middlewares/common/apiRoutesMiddleware.js';

const analyticsRoutes = express.Router()


analyticsRoutes.get("/:shortedId",apiRouteMiddleware, getURLAnalytics)
analyticsRoutes.get("/", getUserAnalytics)


export default analyticsRoutes;