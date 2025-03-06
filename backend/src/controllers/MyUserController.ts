import { Request, Response } from "express";
import { User } from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    // Checking user already exist in our DB.
    if (existingUser) {
      return res.status(200);
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

export default { createCurrentUser };
