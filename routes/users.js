import { Router } from "express";
import {
  getLoggedInUser,
  login,
  register,
  verifyAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/UserController";
import validationMiddleware from "../middlewares/ValidationMiddleware";
import {
  registerValidation,
  loginValidation,
} from "../validators/UserValidator";

const router = Router();

router.get("/", getLoggedInUser);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/verify/:verificationCode", verifyAccount);
router.put("/", updateAccount);
router.delete("/", deleteAccount);

export default router;
