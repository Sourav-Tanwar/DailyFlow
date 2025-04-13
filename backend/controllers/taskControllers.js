const TaskModel = require("../models/TaskSchema")
const { body, validationResult } = require('express-validator');
const mongoose = require("mongoose");

const getTasks = async (req, res) => {
  console.log("GET Tasks")
  try {
    const alltasks = await TaskModel.find();
    if(!alltasks || alltasks.length ===0){
      res.json({
        message:"No task added yet"
      })
    }
    else{
      res.status(200).json({
        success: true,
        Tasks:alltasks
      })
    }
  }
  catch (error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Internal Server Error."
    })
  }
}


module.exports = { getTasks }