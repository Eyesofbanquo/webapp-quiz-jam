import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret_hash = process.env.JWT_SECRET;
const secret_refresh_hash = process.env.JWT_REFRESH_SECRET;

export const decodeJWTMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[1];
  jwt.verify(token, secret_hash, (error, user) => {
    if (error) {
      return response
        .status(200)
        .send({ success: false, error: "Invalid access token" });
    }

    const decodedUser = user as any;

    request.body.user = user;

    next();
  });
};
