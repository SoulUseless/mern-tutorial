//file contains pure routing

const express = require('express');
const { check } = require("express-validator");

const router = express.Router();
const placeControllers = require('../controllers/places-controllers');
//can just export the router to app.js


//filter here refers to relative path after being parsed from app.js
router.get("/:pid", placeControllers.getPlaceById); 

router.patch(
    "/:pid",
    [
        check("title").not().isEmpty(), 
        check("description").isLength({ min: 5 })
    ],
    placeControllers.updatePlaceById
);

router.delete("/:pid", placeControllers.deletePlace);

router.get("/user/:uid", placeControllers.getPlacesByUserId);

//middleware runs from left to right side, can chain middleware in array form also
//check('title') returns another function that runs a check on 'title', depending on
//what we parse afterwards
router.post(
    "/",
    [
        check("title").not().isEmpty(),
        check("description").isLength({ min: 5 }),
        check("address").not().isEmpty()
    ],
    placeControllers.createPlace
);



module.exports = router;