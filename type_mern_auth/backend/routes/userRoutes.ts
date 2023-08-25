import express from "express";
import {
  validationValidation,
  registerValidation,
} from "../middleware/validationMiddleware";

const router = express.Router();
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateuserProfile,
  testValidation,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

router.post("/validation", validationValidation(), testValidation);

router.post("/", registerValidation(), registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateuserProfile);

export default router;
