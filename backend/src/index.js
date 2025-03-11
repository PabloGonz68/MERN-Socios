import app from './app.js';
import { connectDB } from './database.js';
import dotenv from 'dotenv';

dotenv.config();

connectDB();
app.listen(process.env.PORT || 3333);

console.log('Server running on port 3333', 3333);