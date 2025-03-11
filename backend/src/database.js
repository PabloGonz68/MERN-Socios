import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const URI = process.env.MONGODB_URL||'mongodb+srv://pablogonzalezsilva6:1234@express-mongo.m8wdo.mongodb.net/';
        await mongoose.connect(URI);
        console.log(`Database connected: ${URI}`);
    } catch (error) {
        console.log(error);
    }
    
}
