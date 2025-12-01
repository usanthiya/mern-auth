import mongoose from 'mongoose';


const connectDb = async()=>{
    try{
        const CONNECTION_URI = process.env.MONGODB_URI;
        mongoose.connection.on('connected', ()=>{
            console.log("Database connected");
        })
        await mongoose.connect(CONNECTION_URI);
       
    }catch(err){
        console.log("Error connecting to DB: ", err);
        process.exit(1);
    }
}

export default connectDb