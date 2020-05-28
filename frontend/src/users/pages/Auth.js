import React, { useState, useContext } from 'react';

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input.js";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../shared/util/validators.js";
import Button from "../../shared/components/FormElements/Button.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook.js";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

function Auth(props) {
    const auth = useContext(AuthContext);

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            }
        },
        false
    );

    const [isSignIn, setIsSignIn] = useState(true);
    const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
    /* ABSTRACTED OUT
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    */

    async function authSubmitHandler(event) {
        event.preventDefault();
        //send to backend url listener

        //setIsLoading(true); - ABSTRACTED
        if (isSignIn) {
            //dont need to try catch also since that is also abstracted out
            //instead of fetch
            try { //this one to catch whether the log in is successful
                await sendRequest(
                    "http://localhost:5000/api/users/login",
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        "Content-Type": "application/json", //configure type of request to json
                    }
                );
                auth.login();
            } catch (err) {
                console.log(err);
                //just to stop the function when an error happens
            }
                /* ABSTRACTED
                const responseData = await response.json();
                
                if (response.ok) {//rejects 400s and 500s code
                    //console.log(responseData);
                    setIsLoading(false); //set before login(), context might change and cause redirection
                    auth.login();
                } else {
                    throw new Error(responseData.message);
                }
                
            } catch (err) {
                //console.log(err);

                //below functionality is all handled inside the hook
                //setIsLoading(false);
                //setError(err.message || "Something went Wrong");
            }
            */
        } else { //sign up
            try {
                await sendRequest(
                    "http://localhost:5000/api/users/signup",
                    "POST",
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        "Content-Type": "application/json", //configure type of request to json
                    }
                );
                auth.login();
            } catch (err) {
                console.log(err);
            }
            
                /* ABSTRACTED
                const responseData = await response.json();
                
                
                if (response.ok) {//rejects 400s and 500s code
                    console.log(responseData);
                    setIsLoading(false); //set before login(), context might change and cause redirection
                    auth.login();
                } else {
                    throw new Error(responseData.message);
                }
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(err.message || "Something went Wrong");
            }
            */
        }
        /* deprecated
        console.log(formState.inputs); //TODO: send to backend
        */
    }

    function switchModeHandler(event) {
        if (!isSignIn) { //switching to log in screen
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else { //switching to sign up screen
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: "",
                        isValid: false
                    }
                },
                false
            );
        }
        setIsSignIn(prevMode => !prevMode);
    }
    
    /* ABSTRACTED
    //resets the error state
    const errorHandler = () => {
        setError(null);
    }
    */

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay /> /*render a loading spinner*/}
                <h2> Log In </h2>
                <hr />
                <form className="form" onSubmit={authSubmitHandler}>
                    {!isSignIn && (
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter valid name"
                            onInput={inputHandler}
                        />
                    )}

                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="E-mail"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email"
                        onInput={inputHandler}
                    />

                    <Input
                        id="password"
                        element="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your password"
                        onInput={inputHandler}
                    />

                    <Button type="submit" disabled={!formState.isValid}>
                        {isSignIn ? "Log In" : "Sign-Up"}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    Switch to {isSignIn ? "Sign-Up" : "Log In"}
                </Button>
            </Card>
        </>
    );
}

export default Auth;