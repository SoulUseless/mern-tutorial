//files contain middleware functions/ controllers

const HttpError = require("../models/http-error");
const { uuid } = require("uuidv4");

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

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid; // stored as keys: { pid: "XXX" }
    const place = DUMMY_PLACES.find(p => placeId === p.id);
    console.log("GET request places");
    //json is automatically sent back
    if (place) {
        res.json({ place }); // => { place } === { place: place }
        return;
    } else {
        throw new HttpError("Place not found", 404);
        /*
        res.status(404).json({ message: "place not found" }); //default is 200: success
        //can method chain to send responses 
        */
    }   
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => userId === p.creator);
    if (places && places.length > 0) {
        res.json({ places });
        return;
    } else {
        next(new HttpError("User has no places", 404));
        //res.status(404).json({ message: "user has no places" });
    }
}

//called from POST request => have request body unlike GET request
const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };
    DUMMY_PLACES.push(createdPlace);

    res.status(201); //code represents something new created on server
    return res.json({ place: createdPlace });

}

//patch request also have body
const updatePlaceById = (req, res, next) => {
    const placeId = req.params.pid; // stored as keys: { pid: "XXX" }
    const place = DUMMY_PLACES.find(p => placeId === p.id);
    const { title, description } = req.body;
    if (place) {
        const updatedPlace = { ...place };
        const placeIndex = DUMMY_PLACES.findIndex(p => placeId === p.id);

        updatedPlace.title = title;
        updatedPlace.description = description;

        DUMMY_PLACES[placeIndex] = updatedPlace;

        res.status(200).json({ place: updatedPlace });
    } else {
        throw new HttpError("Place not found", 404);
    }
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({ message: "Successfully Deleted." });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;

