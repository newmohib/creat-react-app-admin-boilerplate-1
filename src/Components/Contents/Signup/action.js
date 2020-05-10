import {  SIGNUP_INPUT, SIGNUP_SUBMIT } from './constant';


export const handleSignupChange = (inputObj) => ({
    type: SIGNUP_INPUT,
    payload:inputObj
});

export const handleSignupSubmit= (inputObj) => ({
    type: SIGNUP_SUBMIT,
    payload:inputObj
});
