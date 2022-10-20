import {connect} from "mongoose";

export const connectDB = async () => {
    try{
        await connect ("mongodb://localhost:27017/kmino");
        console.log("Connected to MongoDB");
    }catch(error){
        console.error(error);
    }
};