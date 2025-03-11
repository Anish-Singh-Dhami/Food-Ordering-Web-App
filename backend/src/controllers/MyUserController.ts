import { Request, RequestHandler, Response } from "express";
import { User } from "../models/user";

/**
 * Create a new entry in our DB for current authorised user if it's information is not present in our DB.
 * @param req Request object
 * @param res Response object
 */
const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    // Checking user already exist in our DB.
    if (existingUser) {
      return res.sendStatus(200);
    }
    // Creating a new User object.
    const newUser = new User(req.body);
    newUser.save();

    // Return the new User object created to the client.
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({ message: "Error in creating user." });
  }
};

/**
 * Update the current user's information stored in our DB.
 * @param req Request object
 * @param res Response object
 */
const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "User Not Found." });
      return;
    }

    // being specific about the perimeters we're allowing to update.
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    // sends the updated value of current user.
    res.send(user);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Error in updating user." });
  }
};

/**
 * Fetches the current user entry from our db and send it to the client side.
 * @param req Request bject
 * @param res Response object
 */
const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    res.json(user);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
export default { createCurrentUser, updateCurrentUser, getCurrentUser };
