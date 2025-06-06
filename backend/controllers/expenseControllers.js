const Expense = require('../models/ExpenseSchema');
const { body, validationResult } = require('express-validator');
const mongoose = require("mongoose");

const getExpense = async (req, res) => {
  console.log("GET Expense")
  try {
    const allExpenses = await Expense.find({ user: req.user.id });
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
  // [
  //   body('expense').isLength({ min: 1 }),
  //   body('amount').isLength({ min: 1 })
  // ]
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("POST request received")
  // console.log(req.body)

  try {
    const Expenses = new Expense({
      expense: req.body.expense,
      amount: req.body.amount,
      category: req.body.category,
      user: req.user.id
    })
    const saveExpense = await Expenses.save()
    res.json(saveExpense).status(200)
  }
  catch (error) {
    console.log(error)
    res.json({ success: false });
  }
}

const putExpense = async (req, res) => {
  // [
  //   body('expense').isLength({ min: 1 }),
  //   body('amount').isLength({ min: 1 })
  // ]
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("PUT request received")
  // console.log(req.body)
  // console.log(req.params.id)

  const { expense, amount, category } = req.body;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Expense ID format"
    })
  }

  try {
    const updateExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { expense, amount, category },
      { new: true } // return the updated document
    );

    if (!updateExpense) {
      return res.status(404).json({ message: "Expense not found" })
    }
    if (updateExpense.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed")
    }
    res.status(200).json({
      success: true,
      data: updateExpense

    })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Failed to update expense"
    });
  }
}

const deleteExpense = async (req, res) => {

  console.log("Delete Expense")
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Expense ID format"
    })
  }

  try {
    const deleteExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deleteExpense) {
      return res.status(404).json({ message: "Expense not found" })
    }

    res.status(200).json({
      succes: true,
      data: deleteExpense

    })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Failed to Delete expense"
    });
  }
}

module.exports = { getExpense, postExpense, putExpense, deleteExpense }