import dotenv from 'dotenv';
dotenv.config();  // Se ejecuta antes de usar variables de entorno

import app from './app.js';
import { connectDB } from './database.js';

connectDB();

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
