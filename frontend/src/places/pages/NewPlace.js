import React from 'react';

import Input from "../../shared/components/FormElements/Input.js";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators.js";
import Button from "../../shared/components/FormElements/Button.js";
import { useForm } from "../../shared/hooks/form-hook.js";

import "./PlaceForm.css";



function NewPlace(props) {
    //we can choose not to pull out the third argument of the array that useForm returns
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            address: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    //takes in params required for onInput in Input.js
    //useCallback wraps the function to prevent triggering of 
    //infinite loops with new function signatures resulting in change 
    //in data which triggers creation of new function objects

    /*
    OLD FUNCTION ABSTRACTED OUT TO GENERALISE
    //dependencies are stored to re-render the function
    //else the function is "memoized" and stored away for future use => no new function object created
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    */

    function placeSubmitHandler(event) {
        event.preventDefault();
        console.log(formState.inputs); //TODO: send to backend
    }

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
            />

            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description, >5 characters"
                onInput={inputHandler}
            />

            <Input
                id="address"
                element="input"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address" 
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Add New Place
            </Button>
        </form>
    );
}

export default NewPlace;