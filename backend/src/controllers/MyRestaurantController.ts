import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    res.json(restaurant);
  } catch (error) {
    console.log("Error in fetching user's restaurant, error : ", error);
    res.status(500).json({ message: "Error in fetching users restaurant." });
  }
};

const uploadImageToCloudinary = async (
  file: Express.Multer.File
): Promise<string> => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  // To embed image file inline into our html document, instead of making http request.
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    // can create one restaurant per account.
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res.status(409).json({
        message: "Users restaurant already exists",
      });
    }

    const imageUrl = await uploadImageToCloudinary(
      req.file as Express.Multer.File
    );
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log("Something Went Wrong, Error: ", error);
    res.status(500).json({
      message: "Something went wrong...",
    });
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found!" });
    }
    const newRestaurant = req.body;
    restaurant.restaurantName = newRestaurant.restaurantName;
    restaurant.city = newRestaurant.city;
    restaurant.country = newRestaurant.country;
    restaurant.estimatedDeliveryTime = newRestaurant.estimatedDeliveryTime;
    restaurant.deliveryPrice = newRestaurant.deliveryPrice;
    restaurant.cuisines = newRestaurant.cuisines;
    restaurant.menuItems = newRestaurant.menuItems;
    restaurant.lastUpdated = new Date();

    // uploaded a new image, send to cloudinary and generate a new url to it.
    if (req.file) {
      const imageUrl = await uploadImageToCloudinary(req.file);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();
    res.status(200).send(restaurant);
  } catch (error) {
    console.log("Error in updating restaurant info. Error : ", error);
    res.status(500).json({
      message: "Failed to update user's restaurant info.",
    });
  }
};

export default { createMyRestaurant, getMyRestaurant, updateMyRestaurant };
