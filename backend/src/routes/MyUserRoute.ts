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
 * Parsing the auth token and add {`userId`, `auth0Id`} to our request object.
 * Validating the request with express-validator.
 */
router.put(
  "/",
  jwtCheck,
  jwtParse as express.RequestHandler,
  validateMyUserRequest,
  MyUserController.updateCurrentUser
);

/**
 * GET method on the route '/' to fetch the current users detail from our DB, and send it to the client.
 * Protecting route with jwtCheck middleware.
 * Parsing the auth token and adding {`userId`, `auth0Id`} to our request object.
 */
router.get(
  "/",
  jwtCheck,
  jwtParse as express.RequestHandler,
  MyUserController.getCurrentUser
);
export default { router };
