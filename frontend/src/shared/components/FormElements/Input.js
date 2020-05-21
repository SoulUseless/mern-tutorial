import React, { useReducer, useEffect } from 'react';

import "./Input.css";
import { validate } from "../../util/validators.js";

function inputReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state, //copied the entire original state, then make modifications based on the variable
                value: action.val,
                isValid: validate(action.val, action.validators)
            };

        case 'TOUCH':
            return {
                ...state, //copied the entire original state, then make modifications based on the variable
                isTouched: true
            }

        default:
            return state;
    }
}

function Input(props) {
    {/* can always have code to have 2 useStates, but useReducer is easier for complex logic 
        useReducer( <BiFunction taking in state and action and returns new action>, <initial values> */}
    const [inputState, dispatch] = useReducer(inputReducer, {value: "", isValid: false, isTouched: false});

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(
        () => props.onInput(id, value, isValid),
        [id, onInput, value, isValid]
    ); //will rerun the function when the following dependencies change

    const changeHandler = event => {
        //dispatch an action, action contains all information required to run inputReducer
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    }
    /* onBlur refers to the action of clicking off the object after clicking on,
    opposite of onClick in a sense */
    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
            
        ) : (
            <textarea 
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler} 
                value={inputState.value}
                onBlur={touchHandler}
            />
        );

    return (
        <div
            className={`form-control ${
                (!inputState.isValid && inputState.isTouched) && "form-control--invalid"
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {(!inputState.isValid && inputState.isTouched) && <p>{props.errorText}</p>}
        </div>
    );
}

export default Input;