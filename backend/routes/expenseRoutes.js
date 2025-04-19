const express = require('express')
const router = express.Router()
const { getExpense, postExpense, putExpense, deleteExpense } = require("../controllers/expenseControllers")
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser')

// const Expense = require('../models/ExpenseSchema');

router.get('/Expense',fetchUser ,getExpense);
router.post("/Expense",fetchUser, [
  body('expense').isLength({ min: 1 }),
  body('amount').isLength({ min: 1 }),
  body('catogery').isLength({ min: 1 })
],
  postExpense);
router.put("/Expense/:id",fetchUser, [
  body('expense').isLength({ min: 1 }),
  body('amount').isLength({ min: 1 }),
  body('catogery').isLength({ min: 1 })
],
  putExpense);
router.delete("/Expense/:id",fetchUser, deleteExpense);


module.exports = router