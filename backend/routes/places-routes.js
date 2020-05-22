//file contains pure routing

const express = require('express');

const router = express.Router();
const placeControllers = require('../controllers/places-controllers');
//can just export the router to app.js


//filter here refers to relative path after being parsed from app.js
router.get("/:pid", placeControllers.getPlaceById); 

router.patch("/:pid", placeControllers.updatePlaceById);

router.delete("/:pid", placeControllers.deletePlace);

router.get("/user/:uid", placeControllers.getPlacesByUserId);

router.post("/", placeControllers.createPlace);



module.exports = router;