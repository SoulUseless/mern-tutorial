import React, { useReducer, useCallback } from 'react';

import Input from "../../shared/components/FormElements/Input.js";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators.js";
import "./NewPlace.css";

function formReducer(state, action) {
    
}

function NewPlace(props) {
    useReducer(formReducer, {
        inputs: {
            title: {
                value: "",
                isValid: false
            }, 
            description: {
                value: "",
                isValid: false
            }
        },
        isValid: false
    })

    //takes in params required for onInput in Input.js
    //useCallback wraps the function to prevent triggering of 
    //infinite loops with new function signatures resulting in change 
    //in data which triggers creation of new function objects

    //dependencies are stored to re-render the function
    //else the function is "memoized" and stored away for future use => no new function object created
    const titleInputHandler = useCallback((id, value, isValid) => {

    }, []);

    const descriptionInputHandler = useCallback((id, value, isValid) => {

    }, []);

    return (
        <form className="place-form">
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={titleInputHandler}
            />

            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description, >5 characters"
                onInput={descriptionInputHandler}
            />
        </form>
    );
}

export default NewPlace;