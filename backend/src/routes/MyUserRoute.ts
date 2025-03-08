import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

/**
 * POST method on the route '/' to create currently authenticated user.
 * For new user create their entry in our DB.
 * Protecting the routes with the authentication token, preventing unauthenticated users to access the api endpoint.
 */
router.post(
  "/",
  jwtCheck,
  MyUserController.createCurrentUser as express.RequestHandler
);

/**
 * PUT method on the route '/' to update the entry of the current authenticated user.
 * Protecting route with jwtCheck middleware.
 */
router.put(
  "/",
  jwtCheck,
  jwtParse as express.RequestHandler,
  validateMyUserRequest,
  MyUserController.updateCurrentUser
);
export default { router };
