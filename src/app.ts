import express from 'express';
import cors from 'cors';
import router from './app/routes/routes';
const app = express();

//parser
app.use(
  cors({
    // origin: 'https://whats-app-clone-frontend-pi.vercel.app',
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'successfully working Express Backend setup Application',
  });
});

export default app;
