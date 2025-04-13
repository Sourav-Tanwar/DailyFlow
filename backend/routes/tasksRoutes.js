const express = require("express");
const router = express.Router();
const {getTasks }= require('../controllers/taskControllers');


router.get("/Tasks",getTasks);

module.exports =router;