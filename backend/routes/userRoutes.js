const express = require('express')
const router = express.Router()
const { createUser } = require('../controllers/authControllers')
const { body, validationResult } = require('express-validator');



router.post('/createUser',
  [body("name", "Enter a valid name").isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a strong password').isLength({ min: 5 })
  ], createUser);

module.exports = router;