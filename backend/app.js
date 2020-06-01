const fs = require("fs");
const path = require("path");

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

//the imported constants are just middleware now
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require("./models/http-error");

const app = express();

//extract json data from all incoming requests
app.use(bodyParser.json());

//just returns the file at the specific folder and path
app.use("/uploads/images", express.static(path.join("uploads", "images")));

//workaround CORS error
//cannot anyhow send requests cross-url
app.use((req, res, next) => {
    //allow any domain to send requests to backend
    res.setHeader("Access-Control-Allow-Origin", "*");
    //set allowed headers
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //set allowed request types
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE"
    );
    next();
});

//requests must come from urls that start with following url 
app.use("/api/places",placesRoutes);

app.use("/api/users", usersRoutes);

//only runs when all havent send requests
app.use((req, res, next) => {
     throw new HttpError("No Route found", 404);
});

//middleware function with 4 params gets treated as a ERROR HANDLING middleware func
app.use((error, req, res, next) => {
    if (req.file) { //multer adds file param in the req => if present means its a file
        //this triggers when theres an error and req contains a file
        //delete (unlink) the file using fs module
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        }); 
    }
    if (res.headerSent) {
        //wont send a response
        //error gets forwarded to next middleware
        return next(error);
    } else {
        res.status(error.code || 500); //500 means server problem
        res.json({ message: error.message || "Unknown error occured" });
    }

});

//now using environment variables
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0-un6y8.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
//console.log(url);
mongoose
    .connect(url)
    .then(() => {
        console.log("db connected");
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });
