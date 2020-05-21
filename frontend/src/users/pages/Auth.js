import React, { useState, useContext } from 'react';

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input.js";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../shared/util/validators.js";
import Button from "../../shared/components/FormElements/Button.js";
import { useForm } from "../../shared/hooks/form-hook.js";
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

    function authSubmitHandler(event) {
        event.preventDefault();
        console.log(formState.inputs); //TODO: send to backend
        auth.login();
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
    
    return (
        <Card className="authentication">
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
    );
}

export default Auth;