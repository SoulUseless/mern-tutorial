const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: { type: String, required: true},
    price: {type: Number, required: true}
});

//name of the collection
module.exports = mongoose.model("Product", productSchema);