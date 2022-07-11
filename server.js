import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
// express
import express from 'express';
const app = express();
// packages
import morgan from 'morgan';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// database
import connectDB from './db/connectDB.js';

// routers
import authRouter from './routes/authRoutes.js';

app.get('/', (req, res) => {
  res.status(200).send(`<h1>auth work</h1>`);
});

// middleware

import notFoundMiddleware from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';

app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Database connected!');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
