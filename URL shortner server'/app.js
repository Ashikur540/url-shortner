import 'colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Express from 'express';
import requestIp from 'request-ip';
dotenv.config()

import analyticsRoutes from './Routes/v1/analyticsRoutes.js';
import urlRoutes from './Routes/v1/urlRoutes.js';
import userRoutes from './Routes/v1/userRoutes.js';
const app = Express();

// // middlewares
app.use(requestIp.mw())
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser(process.env.AUTH_COOKIE_SECRET))
// routes
app.use('/api/v1/urls', urlRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

export default app