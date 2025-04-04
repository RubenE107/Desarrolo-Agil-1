import express from 'express';
import pagoRoutes from './routes/pagoRoutes.js';
import { PORT } from './config.js';
import morgan from 'morgan';
import cors from 'cors';



const app = express();
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:4200', 'https://9qxft3d6-4200.usw3.devtunnels.ms'];
    if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
},
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
  }));
app.use(morgan('dev'));
app.use(express.json());
app.use(pagoRoutes);

app.listen(PORT)
console.log('Server is running on port 4300');