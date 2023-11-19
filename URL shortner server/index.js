import 'colors';

import app from "./app.js";
import errorHanlderMiddleware from './middlewares/common/errorHanlderMiddleware.js';
import connectDB from './utils/database.connection.js';
/*
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


*/


// Server Setup
const PORT = process.env.PORT || 5000;

connectDB()

app.get('/test', (req, res) => {
  res.send('server is running');
});

const server = app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`.blue);
});

// handle unhandled promise rejections
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`.red)
  server.close(() => process.exit(1))
})

app.use(errorHanlderMiddleware)