const express = require("express");
const router = express.Router();
const { getTasks, postTasks, putTasks, deleteTasks } = require('../controllers/taskControllers');


router.get("/Tasks", getTasks);
router.post("/Tasks", postTasks);
router.put("/Tasks/:id", putTasks);
router.delete("/Tasks/:id", deleteTasks);

module.exports = router;