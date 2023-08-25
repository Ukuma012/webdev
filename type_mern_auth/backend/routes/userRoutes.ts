import express from "express";
import { body } from "express-validator";

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

router.post(
  "/validation",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 4 }),
  ],
  testValidation
);

router.post("/", [
  body("name").isLength({ min: 4 }),
], registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateuserProfile);

export default router;
