import { Router } from "express";
import { getExpenses, addExpense, updateExpense, deleteExpense } from "../controllers/expenseController.js";
import { checkUserAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", checkUserAuth, getExpenses);
router.post("/", checkUserAuth, addExpense);
router.put("/:id", checkUserAuth, updateExpense);
router.delete("/:id", checkUserAuth, deleteExpense);


export default router;