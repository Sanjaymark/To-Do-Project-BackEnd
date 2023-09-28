import mongoose from "mongoose";

export function dbConnection()
{
    const params = 
    {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }
    try{
        mongoose.connect(process.env.CONNECTION_URL, params);
        console.log("Database connected Successfully")
    }catch(error)
    {
        console.log("Error connecting DB", error)
    }
}