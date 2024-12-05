import express from "express";
import {
  getAllRides,
  getLoggedInUserData,
  registerUser,
  sendingOtpToEmail,
  verifyingEmail,
  verifyOtp,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userRouter = express.Router();

userRouter.post("/registration", registerUser);

userRouter.post("/verify-otp", verifyOtp);

userRouter.post("/email-otp-request", sendingOtpToEmail);

userRouter.put("/email-otp-verify", verifyingEmail as express.RequestHandler);

userRouter.get(
  "/me",
  isAuthenticated as express.RequestHandler,
  getLoggedInUserData
);

userRouter.get(
  "/get-rides",
  isAuthenticated as express.RequestHandler,
  getAllRides
);

export default userRouter;
