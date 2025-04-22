const express = require('express')
const router = express.Router()
const { createUser, loginUser, getUser } = require('../controllers/authControllers')
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser')

router.post('/createUser',
  [body("name", "Enter a valid name").isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a strong password').isLength({ min: 5 })
  ], createUser);

router.post('/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],
  loginUser)

router.post('/getUser', fetchUser, getUser)

module.exports = router;