const express = require('express')
const router = express.Router()
const { getExpense,postExpense, putExpense,deleteExpense } = require("../controllers/expenseControllers")
const { body, validationResult } = require('express-validator');

const Expense = require('../models/ExpenseSchema');

router.get('/Expense', getExpense);
router.post("/Expense",[
        body('expense').isLength({ min: 1 }),
        body('amount').isLength({ min: 1 }),
        body('catogery').isLength({ min: 1 })
      ],
      postExpense);
router.put("/Expense/:id",[
        body('expense').isLength({ min: 1 }),
        body('amount').isLength({ min: 1 }),
        body('catogery').isLength({ min: 1 })
      ],
      putExpense);
router.delete("/Expense/:id",deleteExpense);




module.exports = router