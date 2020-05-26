const mongoose = require("mongoose");

const Product = require("./models/products");

const url = "mongodb+srv://<user>:<pw>@cluster0-un6y8.gcp.mongodb.net/products_test?retryWrites=true&w=majority";
mongoose
    .connect(url) //connect returns a promise, so can run .then() and .catch()
    .then(() => {
        console.log("db connected");
    })
    .catch(() => {
        console.log("conenction failed");
    });

const createProduct = async (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });
    //constructor assigns a unique object_id object to every instance created
    const result = await createdProduct.save() //commits the createdProduct to the database automatically, async task

    console.log(createdProduct.id);
    //mongoose call xx.id, returns the object id as a string
    //but if call xx-_id, returns the object id as an object -> cannot do anything to it
    res.json(result);
}

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec(); //static method .find(), returns array
    //convert to cursor by indicating in arguments
    //mongoose specific find() is not a real promise, unless exec() is added    
    res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;