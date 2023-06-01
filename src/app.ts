import "express-async-errors"
import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import cors from 'cors'
import path from "path";

const app = express()

app.use(express.json())  
app.use(cors())   
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));               
app.use(router)

export default app