import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from "../components/PlaceList.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

import './UserPlaces.css';

/* DEPRECATED
const DUMMY_PLACES = [
    {  
        id: "p1",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Rear_view_of_the_Merlion_statue_at_Merlion_Park%2C_Singapore%2C_with_Marina_Bay_Sands_in_the_distance_-_20140307.jpg",
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
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Rear_view_of_the_Merlion_statue_at_Merlion_Park%2C_Singapore%2C_with_Marina_Bay_Sands_in_the_distance_-_20140307.jpg",
        title: "Merelion",
        description: "foobarfizzbang",
        address: "Marina Bay",
        creator: "u2",
        location: {
            lat: 1.2868,
            lng: 103.8545
        }
    }, 
];
*/


function UserPlaces(props) {
    const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();
    const userId = useParams().userId;
    //console.log(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
    useEffect(() => {//useEffect doesnt like a async function
        const getPlaces = async () => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
                setLoadedPlaces(response.places);
            } catch (err) {
                console.log(err);
            }
        };
        getPlaces();
    }, [sendRequest, userId]);

    const placeDeletedHandler = (deletedPlaceId) => {
        //handles re-rendering post-deletion
        setLoadedPlaces((prevPlaces) => // note: setloadedplaces and similar can take in one param, current state
            prevPlaces.filter((place) => place.id !== deletedPlaceId)
        );
    };

    //const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                    {/*render a loading spinner*/}
                 </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler}/>}
        </>
    );
}

export default UserPlaces;