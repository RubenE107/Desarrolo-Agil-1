import express from 'express';
import pagoRoutes from './routes/pagoRoutes.js';
import { PORT } from './config.js';
import morgan from 'morgan';



const app = express();
app.use(morgan('dev'));

app.use(pagoRoutes);

app.listen(PORT)
console.log('Server is running on port 4300');