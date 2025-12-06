import mongoose from 'mongoose';
import { MONGODB_URI } from '../setup/config/env.js';

const connectDb = async()=>{
    try{
        
        mongoose.connection.on('connected', ()=>{
            console.log("Database connected");
        })
        await mongoose.connect(MONGODB_URI);
       
    }catch(err){
        console.log("Error connecting to DB: ", err);
        process.exit(1);
    }
}

export default connectDb