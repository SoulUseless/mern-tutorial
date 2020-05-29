import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from "../../shared/components/FormElements/Input.js";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators.js";
import Button from "../../shared/components/FormElements/Button.js";
import Card from "../../shared/components/UIElements/Card.js"
import { useForm } from "../../shared/hooks/form-hook.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./PlaceForm.css";

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

function UpdatePlace(props) {
    //const [isLoading, setIsLoading] = useState(true);
    const [identifiedPlace, setIdentifiedPlace] = useState();
    const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
    const placeId = useParams().placeId;
    const history = useHistory();
    const auth = useContext(AuthContext);

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    //const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);
    useEffect(() => {//useEffect doesnt like a async function
        const getPlace = async () => {
            try {
                console.log(`http://localhost:5000/api/places/${placeId}`);
                const response = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setIdentifiedPlace(response.place);
                console.log(response.place.title);
                setFormData( //shifted up, can just immeditately load the information
                    {
                        title: {
                            value: response.place.title,
                            isValid: true,
                        },
                        description: {
                            value: response.place.description,
                            isValid: true,
                        }
                    },
                    true
                );
            } catch (err) {
                console.log(err);
            }
        };
        getPlace();
    }, [sendRequest, placeId, setFormData]);

    /* DEPRECATED
    useEffect(() => {
        if (identifiedPlace && !isLoading) {
            setFormData(
                {
                    title: {
                        value: identifiedPlace.title,
                        isValid: true,
                    },
                    description: {
                        value: identifiedPlace.description,
                        isValid: true,
                    }
                },
                true
            );
            //setIsLoading(false);
        }
    }, [setFormData, identifiedPlace]);
    */

    async function placeUpdateSubmitHandler(event) {
        //console.log(formState.inputs); //TODO: send to backend
        event.preventDefault();
        try {
            await sendRequest(`http://localhost:5000/api/places/${placeId}`, 
            "PATCH",
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
            }),
            {
                "Content-Type": "application/json", //configure type of request to json
            });
            console.log("success");
            history.push(`/${auth.userId}`);

        } catch (err) {
            console.log(err);
        }
    }
    if (isLoading) { //loading screen
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    } else if (!identifiedPlace && !error) { //no places found
        return (
            <div className="center">
                <Card>
                    <h2> No Place Found. </h2>
                </Card>
            </div>
        );
    } else { //all data found and loaded
        //Note: Should only return once the data is pulled
        //or like th epromise is fulfilled, else we'll be rendering dummy data
        return (
            <>
                <ErrorModal error={error} onClear={errorHandler} />
                {/* checks are in place to ensure form doesnt load too early*/}
                {!isLoading && identifiedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                    <Input
                        id="title"
                        element="input"
                        label="Title"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title"
                        onInput={inputHandler}
                        initialValue={identifiedPlace.title}
                        initialIsValid={true}
                    />

                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description, >5 characters"
                        onInput={inputHandler}
                        initialValue={identifiedPlace.description}
                        initialIsValid={true}
                    />

                    <Button type="submit" disabled={!formState.isValid}>
                        Update Place
                    </Button>
                </form>}
            </>
        );
    }
}

export default UpdatePlace;