import jwt from "jsonwebtoken";
import mongoose from "mongoose";


// Define the Admin Schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});


// Create the Admin model using the schema
const Admin = mongoose.model("Admin", adminSchema);


const generatedToken=(id)=>{
    return jwt.sign({id},process.env.ADMIN_SECRET_KEY)
}


// Export the Admin model
export { Admin, generatedToken };
