import { Router } from "express";
import { getAllDebitCreditHolder, createDebitCreditHolder, updateDebitCreditHolder, deleteDebitCreditHolder } from "../controllers/DebitCreditHolderController";
import authenticateUser from '../middlewares/AuthMiddleware'


const router = Router()


router.get("/", authenticateUser, getAllDebitCreditHolder)
router.post("/", authenticateUser,  createDebitCreditHolder)
router.put("/:id", authenticateUser, updateDebitCreditHolder)
router.delete("/:id", authenticateUser, deleteDebitCreditHolder)

export default router;