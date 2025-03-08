import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { decode, JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";

/**
 * Do the validation of access token
 */
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

/**
 * Extending the interface for Request objecct to include custom properties in it's object.
 */
declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

/**
 * Middle-Ware to add userId (created by our db while creating a new user) and
 * auth0Id of the current authenticated user (having authentication token) to our request object.
 * @param req Request Body
 * @param res Response Body
 * @param next Next function to execute the middleware succeeding the current middleware.
 */
const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    // decode the JWT token.
    const decodedToken = decode(token) as JwtPayload;
    const auth0Id = decodedToken.sub;
    const user = await User.findOne({ auth0Id });

    if (!user || !user._id) {
      return res.sendStatus(401);
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

    next();
  } catch (error) {
    console.log("Error : ", error);
    res.sendStatus(401);
  }
};

export { jwtCheck, jwtParse };
