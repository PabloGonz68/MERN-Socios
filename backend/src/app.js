import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import authRoutes from './routes/auth.routes.js';

// Usar import.meta.url para obtener la ruta al directorio actual
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(morgan('dev'));
app.use(express.json());

// Rutas de imágenes estáticas
app.use('/img', express.static(join(__dirname, 'img')));


app.use('/mern2', authRoutes);

export default app;
