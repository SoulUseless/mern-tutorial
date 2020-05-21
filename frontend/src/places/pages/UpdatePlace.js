import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from "../../shared/components/FormElements/Input.js";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators.js";
import Button from "../../shared/components/FormElements/Button.js";
import Card from "../../shared/components/UIElements/Card.js"
import { useForm } from "../../shared/hooks/form-hook.js";

import "./PlaceForm.css";

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

function UpdatePlace(props) {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;

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

    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);
    
    useEffect(() => {
        if (identifiedPlace) {
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
            setIsLoading(false);
        }
    }, [setFormData, identifiedPlace]);

    function placeUpdateSubmitHandler(event) {
        console.log(formState.inputs); //TODO: send to backend
    }

    if (!identifiedPlace) { //no places found
        return (
            <div className="center">
                <Card>
                    <h2> No Place Found. </h2>
                </Card>
            </div>
        );
    } else if (isLoading) { //loading screen
        return <h2 class="center"> Loading </h2>;
    } else { //all data found and loaded
        //Note: Should only return once the data is pulled
        //or like th epromise is fulfilled, else we'll be rendering dummy data
        return (
            <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    label="Title"
                    type="text"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={inputHandler}
                    initialValue={formState.inputs.title.value}
                    initialIsValid={formState.inputs.title.isValid}
                />

                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description, >5 characters"
                    onInput={inputHandler}
                    initialValue={formState.inputs.description.value}
                    initialIsValid={formState.inputs.description.isValid}
                />

                <Button type="submit" disabled={!formState.isValid}>
                    Update Place
                </Button>
            </form>
        );
    }
}

export default UpdatePlace;