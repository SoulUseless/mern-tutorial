const MongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://<user>:<pw>@cluster0-un6y8.gcp.mongodb.net/products_test?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
    const {name, price} = req.body;
    const newProduct = {
        name: name,
        price: price
    };
    const client = new MongoClient(url);

    try { //pushing data can always fail
        await client.connect(); //establish connection to server, can take a while, so use async functions
        const db = client.db();
        //access the products collection (can access any colelction) to insert one (can insert many)
        const result = db.collection("products").insertOne(newProduct);
    } catch (error) {
        console.log(error);
        return res.json({message: "could not store data"});
    }
    client.close(); //always close conenction when done
    res.json(newProduct);
}

const getProducts = async (req, res, next) => {
    const client = new MongoClient(url);
    let products;
    try {
        await client.connect();
        const db = client.db();

        products = await db.collection("products").find().toArray();

    } catch (error) {
        console.log(error);
        return res.json({message: "could not find data"});
    }

    client.close();
    res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;