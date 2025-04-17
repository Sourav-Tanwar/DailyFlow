const express = require('express')
const router = express.Router()
const { createUser,loginUser } = require('../controllers/authControllers')
const { body, validationResult } = require('express-validator');



router.post('/createUser',
  [body("name", "Enter a valid name").isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a strong password').isLength({ min: 5 })
  ], createUser);

router.post('/login',
  [
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists()
  ],
  loginUser)


module.exports = router;