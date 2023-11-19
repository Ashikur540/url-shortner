import express from 'express';
import { getUrlsCreatedByUser, loginUser, logoutUser, registerUser } from '../../controllers/userController.js';
import apiRouteMiddleware from '../../middlewares/common/apiRoutesMiddleware.js';

const userRoutes = express.Router()


userRoutes.post("/register", registerUser) 
userRoutes.post("/login", loginUser) 
userRoutes.post("/logout",apiRouteMiddleware, logoutUser) 
userRoutes.get("/my-urls",apiRouteMiddleware, getUrlsCreatedByUser) 

export default userRoutes;