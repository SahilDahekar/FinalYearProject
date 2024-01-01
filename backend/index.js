import dotenv from "dotenv";
import express from "express"
import {connectToDatabase}from './db/connect.js'

dotenv.config({
    path: "./.env"
});

const app = express();
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("server started")
})