
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const connectDB = async () => {
    const {MONGODB_URI}=process.env
   
    try {
      await mongoose.connect(MONGODB_URI, {});
      console.log('Database Connected✅'.green);
    } catch (err) {
      console.error(err.message.red);
      process.exit(1);
    }
  };
  
  export default connectDB;