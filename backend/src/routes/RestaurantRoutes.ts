import { RequestHandler, Router } from "express";
import { param } from "express-validator";
import RestaurantControllers from "../controllers/RestaurantControllers";

const router = Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant ID must be a valid string"),
  RestaurantControllers.getRestaurantById as RequestHandler
);

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  RestaurantControllers.searchRestaurants as RequestHandler
);

export default { router };
