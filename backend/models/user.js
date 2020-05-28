const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, unique: true }, 
    //only stores each thing uniquely, doesnt check whether it's unique
    email: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }]
});

userSchema.plugin(uniqueValidator); //validates unique properties
module.exports = mongoose.model("User", userSchema); //colection will be named "users"