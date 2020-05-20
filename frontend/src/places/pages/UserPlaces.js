import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from "../components/PlaceList.js";
import './UserPlaces.css';

const DUMMY_PLACES = [
    {  
        id: "p1",
        imageUrl: "https://img.travelawaits.com/quill/f/d/f/c/2/4/fdfc242ffd612382c212e04702e4d5f0fae144dd.jpg",
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
        imageUrl: "https://img.travelawaits.com/quill/f/d/f/c/2/4/fdfc242ffd612382c212e04702e4d5f0fae144dd.jpg",
        title: "Merlion",
        description: "foobarfizzbang",
        address: "Marina Bay",
        creator: "u2",
        location: {
            lat: 1.2868,
            lng: 103.8545
        }
    }, 
];

function UserPlaces(props) {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />
}

export default UserPlaces;