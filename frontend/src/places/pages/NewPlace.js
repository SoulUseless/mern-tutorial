import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input.js";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators.js";
import Button from "../../shared/components/FormElements/Button.js";
import { useForm } from "../../shared/hooks/form-hook.js";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import "./PlaceForm.css";



function NewPlace(props) {

    const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
    const auth = useContext(AuthContext);
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
            image: {
                value: null,
                isValid: false,
            }
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

    const history = useHistory();
    
    async function placeSubmitHandler(event) {
        event.preventDefault();
        //console.log(formState.inputs); //TODO: send to backend
        try {
            const formData = new FormData();
            formData.append("title", formState.inputs.title.value); //formData accepts all datatypes
            formData.append("description", formState.inputs.description.value);
            formData.append("address", formState.inputs.address.value);
            formData.append("creator", auth.userId);
            formData.append("image", formState.inputs.image.value); //images are accepted also
                
            const response = await sendRequest(
                "http://localhost:5000/api/places",
                "POST",
                formData
            );
            console.log(response);
            
            history.push("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                    {/*render a loading spinner*/}
                </div>
            )}
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

                <ImageUpload
                    center
                    id="image"
                    onInput={inputHandler}
                    errorText="Please provide an image"
                />

                <Button type="submit" disabled={!formState.isValid}>
                    Add New Place
                </Button>
            </form>
        </>
    );
}

export default NewPlace;