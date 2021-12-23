import { Router } from 'express'

import authenticateUser from '../middlewares/AuthMiddleware'
import { createTransaction, getAllTransactionsByUser, deleteTransaction  } from '../controllers/TransactionController';

const router = Router()

router.get('/', authenticateUser, getAllTransactionsByUser)
router.post("/", authenticateUser, createTransaction)
router.delete("/:id", authenticateUser, deleteTransaction)


export default router;