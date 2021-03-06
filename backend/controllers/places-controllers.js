//files contain middleware functions/ controllers

const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const fs = require("fs");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");

/* deprecated
let DUMMY_PLACES = [
    {  
        id: "p1",
        title: "Merlion",
        description: "foobarfizzbang",
        address: "Marina Bay",
        creator: "u1",
        location: {
            lat: 1.2868,
            lng: 103.8545
        }
    }, 
    {  
        id: "p2",
        title: "Merelion",
        description: "foobarfizzbang",
        address: "Marina Bay",
        creator: "u2",
        location: {
            lat: 1.2868,
            lng: 103.8545
        }
    }, 
];
*/

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid; // stored as keys: { pid: "XXX" }

    //const place = DUMMY_PLACES.find(p => placeId === p.id);

    console.log("GET request places");

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        console.log(err);
        next(new HttpError("Search failed", 500));
        return;
    }

    //json is automatically sent back
    if (place) {
        res.json({ place: place.toObject({ getters: true }) }); // => { place } === { place: place }
        //convert the object from mongoose object to js object
        //getters: true converts fields into strings
        return;
    } else {
        next(new HttpError("Place not found", 404));
        return;
        /*
        res.status(404).json({ message: "place not found" }); //default is 200: success
        //can method chain to send responses 
        */
    }   
}

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    //deprecated
    //const places = DUMMY_PLACES.filter(p => userId === p.creator);

    //findById doesnt return promise, can use .exec() to get a promise
    //let places;

    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userId).populate("places");

        //places = await Place.find({ creator: userId });
        //can use .find() to search using other params
        //mongoose directly returns an array
    } catch (err) {
        console.log(err);
        next(new HttpError("Search failed", 500));
        return;
    }

    //if( places || places.length > 0) {
    if (userWithPlaces && userWithPlaces.places.length > 0) {
        res.json({
            places: userWithPlaces.places.map((place) => place.toObject({ getters: true }))
            //places: places.map((place) => place.toObject({ getters: true })),
        });
        return;
    } else {
        next(new HttpError("User has no places", 404));
        return;
        //res.status(404).json({ message: "user has no places" });
    }
}

//called from POST request => have request body unlike GET request
const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { title, description, address } = req.body;

        //must wrap in try catch block if the async promise can throw an error
        try {
            const coordinates = await getCoordsForAddress(address);
            /* deprecated
            const createdPlace = {
                id: uuid(),
                title,
                description,
                location: coordinates,
                address,
                creator
            };

            DUMMY_PLACES.push(createdPlace);
            */

            const createdPlace = new Place({
                title,
                description,
                address,
                location: coordinates,
                image: req.file.path,
                creator: req.userData.userId
            });
            
            let user;
            try {
                user = await User.findById(req.userData.userId);
            } catch (err) {
                console.log(err);
                next(new HttpError("database error", 500));
                return; 
            }

            if (!user) {
                return next(new HttpError("indicated creator user not found", 404));
            }

            try {
                const session = await mongoose.startSession();
                session.startTransaction();
                //commit createdPlace to session
                await createdPlace.save({ session });

                //created place id gets pushed into user places
                user.places.push(createdPlace); 

                //commit updated user to session
                await user.save({session});

                //changes only made if all of the above is successful
                await session.commitTransaction();

                //deprecated
                //await createdPlace.save(); //commit new createdPlace
                //console.log("success");
            } catch (err) {
                console.log(err);
                next(new HttpError("Commit failed", 500));
                return;
            }
            res.status(201); //code represents something new created on server
            return res.json({ place: createdPlace });
        } catch (error) {
            //forward the error
            next(error);
            return;
        }
    } else {
        console.log(errors);
        //throwing errors wouldnt work properly in async functions 
        next(HttpError("Invalid inputs detected", 422));
        return;
    }

}

//patch request also have body
const updatePlaceById = async (req, res, next) => {
    const errors = validationResult(req);
    const userId = req.userData.userId;
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Invalid inputs detected", 422);
    } else {
        const placeId = req.params.pid; // stored as keys: { pid: "XXX" }
        // deprecated
        // const place = DUMMY_PLACES.find(p => placeId === p.id);

        let place;
        try {
            place = await Place.findById(placeId);
        } catch (err) {
            console.log(err);
            next(new HttpError("Search failed", 500));
            return;
        }

        // fields are stored as special mongoose objects. need to call toString.
        if (place.creator.toString() !== userId) {
            next(new HttpError("You are not allowed", 401));
            return;
        }

        const { title, description } = req.body;
        if (place) {

            /* deprecated
            const updatedPlace = { ...place };
            const placeIndex = DUMMY_PLACES.findIndex(p => placeId === p.id);
            */

            place.title = title;
            place.description = description;
            try {
                await place.save();
            } catch (err) {
                console.log(err);
                next(new HttpError("update failed", 500));
                return;
            }
            // DUMMY_PLACES[placeIndex] = updatedPlace;

            res.status(200).json({ place: place.toObject({ getters: true }) });
        } else {
            next(HttpError("Place not found", 404));
            return;
        }
    }
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    const userId = req.userData.userId;
    //DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

    //find place first
    let place;
    try {
        place = await Place.findById(placeId).populate("creator");
        //.populate() "converts" the <foreign key> with the document itself
    } catch (err) {
        console.log(err);
        next(new HttpError("database error", 500));
        return;
    }

    if (!place) {
        return next(new HttpError("Search failed, nothing to delete", 404));
    }

    // this field is stored in string so dunnid toString on this
    if (place.creator.id !== userId) {
        next (HttpError("You are not allowed", 401));
        return;
    }

    const imagePath = place.image;
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await place.remove({session});

        //we can just call the user's places using this
        place.creator.places.pull(place);
        await place.creator.save({session});

        await session.commitTransaction()
        //deprecated
        //await place.remove();
    } catch (err) {
        console.log(err);
        next(new HttpError("deletion failed", 500));
        return;
    }

    fs.unlink(imagePath, (err) => {
        console.log(err);
    });

    res.status(200).json({ message: "Successfully Deleted." });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;

