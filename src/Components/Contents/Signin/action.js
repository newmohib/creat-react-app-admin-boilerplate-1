import { GET_USERS, SIGNIN_INPUT, SIGNIN_SUBMIT } from './constant';


export const handleSigninChange = (inputObj) => ({
    type: SIGNIN_INPUT,
    payload:inputObj
});

export const handleSigninSubmit= (inputObj) => ({
    type: SIGNIN_SUBMIT,
    payload:inputObj
});
