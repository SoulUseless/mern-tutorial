//file contains pure routing

const express = require('express');
const { check } = require("express-validator");

const placeControllers = require('../controllers/places-controllers')
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");
//can just export the router to app.js

const router = express.Router();

//filter here refers to relative path after being parsed from app.js
router.get("/:pid", placeControllers.getPlaceById); 

router.get("/user/:uid", placeControllers.getPlacesByUserId);

//ordering is impt for filtering purposes
//check for token here
router.use(checkAuth);
//all below routes can only be reached with a valid token

router.patch(
    "/:pid",
    [
        check("title").not().isEmpty(), 
        check("description").isLength({ min: 5 })
    ],
    placeControllers.updatePlaceById
);

router.delete("/:pid", placeControllers.deletePlace);



//middleware runs from left to right side, can chain middleware in array form also
//check('title') returns another function that runs a check on 'title', depending on
//what we parse afterwards
router.post(
    "/",
    fileUpload.single("image"), //retrieve a single file
    [
        check("title").not().isEmpty(),
        check("description").isLength({ min: 5 }),
        check("address").not().isEmpty()
    ],
    placeControllers.createPlace
);



module.exports = router;