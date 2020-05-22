
const express = require('express');

const HttpError = require("../models/http-error");
const { uuid } = require("uuidv4");

let DUMMY_USERS = [
    {
        id: 'u1', 
        password: "helloworld",
        name: 'john',
        email: "test@test.com"
    }
];

const getAllUsers = (req, res, next) => {
    res.status(200).json({users: DUMMY_USERS}) ;
}

const getUserById = (req, res, next) => {
    const userId = req.params.uid; // stored as keys: { uid: "XXX" }
    const user = DUMMY_USERS.find(u => userId === u.id);
    console.log("GET request user");
    //json is automatically sent back
    if (user) {
        res.json({ user }); // => { user } === { user: user }
    } else {
        res.json({message: "user not found"});
    }
}

const userLogin = (req, res, next) => {
    const { email, password } = req.body;
    const user = DUMMY_USERS.find(u => email === u.email);
    if (user) {
        if (user.password === password) {
            res.status(200).json({ message: "login success" });
        } else {
            throw new HttpError("Password is incorrect", 401);
        }
    } else {
        throw new HttpError("Username is incorrect", 401);
    }
}

const userSignup = (req, res, next) => {
    const { name, email, password } = req.body;

    if (DUMMY_USERS.find(u => email === u.email)) {
        throw new HttpError("Email already in the system", 422);
    }
    
    const createdUser = {
        id: uuid(), 
        password,
        name,
        email
    };

    DUMMY_USERS.push(createdUser);
    res.status(201).json({ user: createdUser });
}

exports.userLogin = userLogin;
exports.userSignup = userSignup;
exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;