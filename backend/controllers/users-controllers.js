const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const { uuid } = require("uuidv4");
const User = require("../models/user");

/*
let DUMMY_USERS = [
    {
        id: 'u1', 
        password: "helloworld",
        name: 'john',
        email: "test@test.com"
    }
];
*/

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, "-password");
        //either whitelist with <name>, or blacklist with "-<name>""
    } catch (err) {
        console.log(err);
        next(new HttpError("database access error", 500));
        return;
    }

    //const users = User.find()
    res.status(200).json({
        users: users.map((user) => user.toObject({ getters: true })),
    });
}

const userLogin = async (req, res, next) => {
    
    console.log("started");
    const { email, password } = req.body;
    
    let user;
    try {
        user = await User.findOne({email});
    } catch (err) {
        next(new HttpError("log in failed", 500));
        return;
    }

    //const user = DUMMY_USERS.find(u => email === u.email);
    if (user) {
        let isValidPassword = false;
        try {
            console.log("trig");
            isValidPassword = await bcryptjs.compare(password, user.password);
        } catch (err) {
            console.log(err);
            next(new HttpError("unknown log in error", 500));
            return;
        }

        if (isValidPassword) {

            // creating a token
            let token;
            try {
                token = jwt.sign(
                    { userId: user.id, email: user.email },
                    process.env.JWT_SECRET, // server private key --> NOT TO BE SHARED
                    //private key should be the same for all token creation purposes
                    { expiresIn: "1h" } // can set self-destruction of the token to prevent token stealing also
                );
            } catch (err) {
                console.log(err);
                next(new HttpError("sign in failed", 500));
                return;
            }

            res.status(200).json({
                message: "login success",
                userId: user.id,
                email: user.email, //other information up to us
                token: token, //impt to return token
            });

        } else {
            next(new HttpError("Password is incorrect", 403));
            return;
        }
    } else {
        next(new HttpError("Username is incorrect", 403));
        return;
    }
}

const userSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        next(new HttpError("Invalid input detected", 422));
        return;
    }
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
        console.log(err);
        next(new HttpError("failed to access database", 500));
        return;
    }

    if (existingUser) {
        next(new HttpError("User exists, log in instead", 422));
        return;
    }
    /*
    const createdUser = {
        id: uuid(), 
        password,
        name,
        email
    };

    DUMMY_USERS.push(createdUser);
    */

    // hashing the password
    let hashedPassword;
    try {
        hashedPassword = await bcryptjs.hash(password, 12); //returns a promise
    } catch (err) {
        console.log(err);
        next(new HttpError("Could not create user", 500));
        return;
    }

    const createdUser = new User({
        name,
        password: hashedPassword, //encrypted now
        email,
        image: req.file.path, //prefix to the path can be stored on frontend
        places: []
    });

    try {
        await createdUser.save();
        console.log("new user created");
    } catch (err) {
        console.log(err);
        next(new HttpError("failed to create new user", 500));
        return;
    }
    
    // creating a token
    let token;
    try {
        token = jwt.sign( 
            { userId: createdUser.id, email: createdUser.email },
            process.env.JWT_SECRET, // server private key --> NOT TO BE SHARED
            { expiresIn: "1h" } // can set self-destruction of the token to prevent token stealing also
        );
    } catch (err) {
        console.log(err);
        next(new HttpError("sign up failed", 500));
        return;
    }

    res.status(201).json({
        userId: createdUser.id,
        email: createdUser.email, //other information up to us
        token: token, //impt to return token
    });
}

exports.userLogin = userLogin;
exports.userSignup = userSignup;
exports.getAllUsers = getAllUsers;