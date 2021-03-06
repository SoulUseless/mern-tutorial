const express = require('express');
const { check } = require("express-validator");

const userController = require("../controllers/users-controllers")
const fileUpload = require("../middleware/file-upload");

const router = express.Router();
//can just export the router to app.js

//filter here refers to relative path after being parsed from app.js
router.get("/", userController.getAllUsers);

router.post(
    "/signup",
    fileUpload.single("image"), //retrieve a single file
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 }),
    ],
    userController.userSignup
);

router.post("/login", userController.userLogin);


module.exports = router;