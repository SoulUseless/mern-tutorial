const API_KEY= "AIzaSyANi_Os56-_aTncXl8DO0ltl-cOv2KvvCs";
const axios = require("axios");

const HttpError = require("../models/http-error");

const getCoordsForAddress = async address => { 
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)},+CA&key=${API_KEY}`);

    const data = response.data;

    //async response also throws the error
    if (!data || data.status === "ZERO_RESULTS") {
        const error = new HttpError("Invalid Address",422);
        throw error;
    }

    const coords = data.results[0].geometry.location;

    return coords;
};

module.exports = getCoordsForAddress;