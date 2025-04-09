const express = require('express')
const router = express.Router()
const { getExpense,postExpense } = require("../controllers/expenseControllers")
const { body, validationResult } = require('express-validator');

const Expense = require('../models/ExpenseSchema');

router.get('/Expense', getExpense);
router.post("/Expense",postExpense);



module.exports = router