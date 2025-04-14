const Tasks = require("../models/TaskSchema")
const { validationResult } = require('express-validator');
const mongoose = require("mongoose");

const getTasks = async (req, res) => {
  console.log("GET Tasks")
  try {
    const alltasks = await Tasks.find();
    if (!alltasks || alltasks.length === 0) {
      res.json({
        message: "No task added yet"
      })
    }
    else {
      res.status(200).json({
        success: true,
        Tasks: alltasks
      })
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error."
    })
  }
}

const postTasks = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("POST Tasks")
  console.log(req.body)

  const { title, description, status } = req.body;

  try {
    const Task = new Tasks({
      title,
      description,
      status
    })
    const saveTasks = await Task.save()

    res.status(200).json(saveTasks)
  }
  catch (error) {
    console.log(error)
    res.json({ success: false });
  }
}


const putTasks = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("PUT Tasks")
  console.log(req.body)

  const { title, description, status } = req.body;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Expense ID format"
    })
  }

  try {
    const updateTask = await Tasks.findByIdAndUpdate(req.params.id, {
      title: title,
      description: description,
      status: status
    })
    if (!updateTask) { 
      return res.status(404).json({ message: "Task not found" })
    }

    res.status(200).json({
      success: true,
      data: updateTask
    })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Failed to update Task"
    });
  }
}


const deleteTasks = async (req, res) => {
  console.log("Delete Tasks")
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Expense ID format"
    })
  }

  try {

    const deleteTask = await Tasks.findByIdAndDelete(req.params.id)
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.status(200).json({
      success: true,
      data: deleteTask
    })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Failed to update Task"
    });
  }
}





module.exports = { getTasks, postTasks, putTasks, deleteTasks }