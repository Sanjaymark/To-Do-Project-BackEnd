import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";


export const isAdmin = async (req, res, next) => {
    let token;
  
    if (req.headers) {
      try {
        token = await req.headers["x-auth-token"];
        const decode = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
        console.log(decode);
        req.admin = await Admin.findById(decode.id).select("-password");
        next();
      } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Invalid Admin Authentication" });
      }
    }
  
    if (!token) {
      return res.status(400).send({ message: "Access Denied" });
    }
  };