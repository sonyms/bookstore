import mongoose from "mongoose";

export const connectToDatabase = async () => {
    if(mongoose.connections[0].readyState) {
        return;
    }
    mongoose.connect("mongodb+srv://sonyms:Pass123@mgtest.con6jqv.mongodb.net/mgTest?retryWrites=true&w=majority").then(() => {
        console.log("Connected to MongoDB");
        
    }).catch((err) => { 
        console.log(err) 
    });
} 
