import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";


const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
    res.json({
        message : "Hi"
    });
})

app.listen(PORT, () => {
    console.log(`Server started and listening  at http://localhost:8000`);
})