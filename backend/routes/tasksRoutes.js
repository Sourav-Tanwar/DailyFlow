const express = require("express");
const router = express.Router();
const {getTasks,postTasks }= require('../controllers/taskControllers');


router.get("/Tasks",getTasks);
router.post("/Tasks",postTasks);

module.exports =router;