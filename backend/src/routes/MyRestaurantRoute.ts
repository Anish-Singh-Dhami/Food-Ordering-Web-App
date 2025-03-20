import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequst } from "../middleware/validation";

const router = express.Router();
// Storage engine to store files in memory as Buffer objects.
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

/**
 * GET Method to fetches users restaurant info send it to the client.
 */
router.get(
  "/",
  jwtCheck,
  jwtParse as express.RequestHandler,
  MyRestaurantController.getMyRestaurant as express.RequestHandler
);

/**
 * POST Method to create a new restaurant's entry in our DB.
 */
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequst,
  jwtCheck,
  jwtParse as express.RequestHandler,
  MyRestaurantController.createMyRestaurant as express.RequestHandler
);

export default { router };
