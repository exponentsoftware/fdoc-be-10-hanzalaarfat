const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/userController");
const todocontroller = require("../controller/todocontroller");
const adminController = require("../controller/adminController");

const adminAutcontroller = require("../Middleware/authenticate");
const excelController = require("../controller/excelController");

router.post("/signup", usercontroller.signup);
router.post("/login", adminController.login);

/////////////////////// export data details into excel file ////////////

router.get("/userlist", excelController.allUserexcel);
router.get("/todolist", excelController.getalltodoExcel);
router.get("/commentlist", excelController.commentExcel);

// router.get(
//   "/active",

//   adminController.get_Active_Users
// );

// router.get(
//   "/today",
//   adminAutcontroller.requireSigninAdmin,
//   adminController.get_registered_Users_for_the_Day
// );

router.get(
  "/todo",
  adminAutcontroller.requireSigninAdmin,
  todocontroller.getalltodo
); //isi route pe all todo aur filter query bhi hoga

router.post(
  "/todo/add",
  adminAutcontroller.requireSigninAdmin,
  todocontroller.addtodo
);
router.get(
  "/todo/:id",
  adminAutcontroller.requireSigninAdmin,
  todocontroller.getAllTodoById
);
router.put(
  "/todo/:id",
  adminAutcontroller.requireSigninAdmin,
  todocontroller.updatetodo
);
router.delete(
  "/todo/:id",
  adminAutcontroller.requireSigninAdmin,
  todocontroller.deletetodo
);

module.exports = router;
