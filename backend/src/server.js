import express from"express";
import connectDB from "../config/db.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

connectDB();


app.listen(process.env.PORT || 5000,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});