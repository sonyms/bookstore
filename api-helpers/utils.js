import mongoose from "mongoose";

export const connectToDatabase = async () => {
    if(mongoose.connections[0].readyState) {
        return;
    }
    mongoose.connect("mongodb://localhost:27017/myapp").then(() => {
        console.log("Connected to MongoDB");
        
    }).catch((err) => { 
        console.log(err) 
    });
} 
