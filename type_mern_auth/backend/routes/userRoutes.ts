import express from 'express';
const router = express.Router();
import { authUser } from '../controllers/userController';

router.post("/auth", authUser);

export default router;