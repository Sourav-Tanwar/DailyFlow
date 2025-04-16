const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require("../models/UserSchema")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'DailyFlow';

const createUser = async (req, res) => {
  console.log("CreateUser Request")
  let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success,
      errors: errors.array()
    });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        success,
        error: "Sorry a user with email already exists"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    });

    const data = {
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
 
    success = true;
    res.json({ success, user, authtoken})
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error");

  }

}

module.exports = { createUser }


