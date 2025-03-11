import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const URI = process.env.MONGODB_URI;
        await mongoose.connect(URI);
        console.log(`Database connected: ${URI}`);
    } catch (error) {
        console.log(error);
    }
    
}
