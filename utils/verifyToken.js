import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, "Your are not Authenticated"));

  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) return next(createError(403, "Token is not valid"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    console.log(req.user.isAdmin, "user");
    if (req.user.isAdmin) {
      return next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
