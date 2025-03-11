import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const URI = process.env.MONGODB_URL||'mongodb://localhost/mern2';
        await mongoose.connect(URI);
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
    
}
