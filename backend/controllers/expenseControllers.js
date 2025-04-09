const Expense = require('../models/ExpenseSchema');
const { body, validationResult } = require('express-validator');



const getExpense = async (req, res) => {
  try {
    const allExpenses = await Expense.find();

    if (!allExpenses || allExpenses.length == 0) {
      res.json({
        message: "No Expenses added yet."
      })
    } else {
      res.status(200).json({
        success: true,
        Expense: allExpenses
      })
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Internal Server Error."
    })
  }
}


const postExpense = async (req, res) => {
  [
    body('expense').isLength({ min: 1 }),
    body('amount').isLength({ min: 1 })
  ]
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("POST request received")
  console.log(req.body)

  try {
    const Expenses = new Expense({
      expense: req.body.expense,
      amount: req.body.amount
    })
    const saveExpense = await Expenses.save()

    res.json(saveExpense).status(200)
  }
  catch (error) {
    console.log(error)
    res.json({ success: false });
  }

}

module.exports = { getExpense, postExpense }