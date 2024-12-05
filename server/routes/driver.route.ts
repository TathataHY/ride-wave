import express from "express";
import {
  getAllRides,
  getDriversById,
  getLoggedInDriverData,
  newRide,
  sendingOtpToPhone,
  updateDriverStatus,
  updatingRideStatus,
  verifyingEmailOtp,
  verifyPhoneOtpForLogin,
  verifyPhoneOtpForRegistration,
} from "../controllers/driver.controller";
import { isAuthenticatedDriver } from "../middlewares/isAuthenticated";

const driverRouter = express.Router();

driverRouter.post("/send-otp", sendingOtpToPhone);

driverRouter.post("/login", verifyPhoneOtpForLogin);

driverRouter.post("/verify-otp", verifyPhoneOtpForRegistration);

driverRouter.post(
  "/registration-driver",
  verifyingEmailOtp as express.RequestHandler
);

driverRouter.get(
  "/me",
  isAuthenticatedDriver as express.RequestHandler,
  getLoggedInDriverData
);

driverRouter.get("/get-drivers-data", getDriversById as express.RequestHandler);

driverRouter.put(
  "/update-status",
  isAuthenticatedDriver as express.RequestHandler,
  updateDriverStatus
);

driverRouter.post(
  "/new-ride",
  isAuthenticatedDriver as express.RequestHandler,
  newRide
);

driverRouter.put(
  "/update-ride-status",
  isAuthenticatedDriver as express.RequestHandler,
  updatingRideStatus as express.RequestHandler
);

driverRouter.get(
  "/get-rides",
  isAuthenticatedDriver as express.RequestHandler,
  getAllRides
);

export default driverRouter;
