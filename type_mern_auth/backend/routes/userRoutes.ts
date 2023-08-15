import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateuserProfile,
} from "../controllers/userController";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/profile", getUserProfile);
router.post("/profile", updateuserProfile);

export default router;
