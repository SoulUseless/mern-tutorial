const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true}, //image not actual file, but url, cos storing images in database is slow
    address: {type: String, required: true},
    creator: {type: mongoose.Types.ObjectId, required: true, ref: "User"}, //to be replaced by uuid for reference
    location: { //mongoose can handle nested fields
        lat: {type: Number, required: true},
        lng: {type: Number, required: true}
    }
});

module.exports = mongoose.model("Place", placeSchema); //colection will be named "places"