import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute";
import cloudinary from "cloudinary";
import MyRestaurantRoute from "./routes/MyRestaurantRoute";
import RestaurantRoutes from "./routes/RestaurantRoutes";

const app = express();
const port: string = process.env.PORT!;
const connectionString: string = process.env.MONGODB_CONNECTION_STRING!;

const connectToDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to DB successfully.");
  } catch (error) {
    console.error("Failed to connect to the DB ", error);
  }
};

connectToDB();

const configCloudinary = () => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Configured cloudinary successfully...");
  } catch (error) {
    console.log("Failed while configuring cloudinary, Error : ", error);
  }
};

configCloudinary();

app.use(express.json());
app.use(cors());

/**
 * Forward the request starting with /api/my/user to MyUserRoutes.
 * Containing controllers to handle business logic based on the rest of the request.
 * Handle request related to users.
 */
app.use("/api/my/user", MyUserRoute.router);

/**
 * Forward requests starting with /api/my/restaurant to MyRestaurantRotes.
 * Handle request related to current user's registered restaurant.
 */
app.use("/api/my/restaurant", MyRestaurantRoute.router);

/**
 * Health request to check our backend in working / running while in production.
 */
app.get("/health", async (req: Request, res: Response) => {
  res.send({
    message: "Health is ok!",
  });
});

/**
 * Forward requests starting with /api/restaurant to RestaurantRoutes.
 * Handle request related to restaurant(eg: search).
 */
app.use("/api/restaurant", RestaurantRoutes.router);

app.listen(port, () => {
  console.log(`Server started and listening  at http://localhost:${port}`);
});
