import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateuserProfile,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateuserProfile);

export default router;
