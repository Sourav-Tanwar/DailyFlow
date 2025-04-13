const express = require("express");
const router = express.Router();
const { getTasks, postTasks, putTasks } = require('../controllers/taskControllers');


router.get("/Tasks", getTasks);
router.post("/Tasks", postTasks);
router.put("/Tasks/:id", putTasks);

module.exports = router;