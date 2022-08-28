import dotenv from 'dotenv';
dotenv.config();
// dirname
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import 'express-async-errors';
// express
import express from 'express';
const app = express();
// packages
import morgan from 'morgan';
import hbs from 'hbs';
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
import cookieParser from 'cookie-parser';

import fileUpload from 'express-fileupload';
import cloudinaryModule from 'cloudinary';
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database
import connectDB from './db/connectDB.js';

// routers
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

// middleware
app.use(express.static('public'));
app.use(fileUpload({ useTempFiles: true }));

import notFoundMiddleware from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';

app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', './views');
hbs.registerPartials('./views/partials');

app.get('/register', (req, res) => {
  res.render('index', {
    title: 'register',
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'login',
  });
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/verified-email', (req, res) => {
  res.render('verifyEmail', {
    title: 'verify-email',
  });
});

app.get('/forgot-password', (req, res) => {
  res.render('forgotPassword', {
    title: 'forgot password',
  });
});
app.get('/reset-password', (req, res) => {
  res.render('resetPassword', {
    title: 'reset password',
  });
});
app.get('/edit-user', (req, res) => {
  res.render('editUserInfo', {
    title: 'edit user',
  });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
