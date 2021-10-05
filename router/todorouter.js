const express = require("express");
const router = express.Router();
const todocontroller = require("../controller/todocontroller");

router.get("/", todocontroller.getalltodo);
router.post("/add", todocontroller.addtodo);
router.get("/:userId", todocontroller.getAllTodoById);
router.put("/:todoId", todocontroller.updatetodo);
router.delete("/:id", todocontroller.deletetodo);
// // // router.get('/count/:id', todocontroller.taskCount);

module.exports = router;
