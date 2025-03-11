import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './database.js';

connectDB();

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app; 
