import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";


const app = express();
const port: string = process.env.PORT!;
const connectionString : string = process.env.MONGODB_CONNECTION_STRING!;

const connectToDB = async() => { 
    try {
        await mongoose.connect(connectionString);
        console.log("Connected to DB successfully.")
    } catch (error) {
        console.error("Failed to connect to the DB ", error);
    }
};

connectToDB();

app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
    res.json({
        message : "Hi"
    });
})

app.listen(port, () => {
    console.log(`Server started and listening  at http://localhost:${port}`);
})