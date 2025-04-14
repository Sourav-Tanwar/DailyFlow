const express = require("express");
const router = express.Router();
const { getTasks, postTasks, putTasks, deleteTasks } = require('../controllers/taskControllers');
const { body } = require('express-validator');


router.get("/Tasks", getTasks);
router.post("/Tasks", [
  body('title').isLength({ min: 1 }),
  body('description').isLength({ min: 1 }),
  body('status').isLength({ min: 1 })
], postTasks);

router.put("/Tasks/:id", [
  body('title').isLength({ min: 1 }),
  body('description').isLength({ min: 1 }),
  body('status').isLength({ min: 1 })
], putTasks);
router.delete("/Tasks/:id", deleteTasks);

module.exports = router;