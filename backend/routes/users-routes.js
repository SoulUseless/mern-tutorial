const express = require('express');

const userController = require("../controllers/users-controllers")
const router = express.Router();
//can just export the router to app.js


//filter here refers to relative path after being parsed from app.js
router.get("/", userController.getAllUsers);

router.get("/:uid", userController.getUserById);

router.post("/signup", userController.userSignup);

router.post("/login", userController.userLogin);


module.exports = router;