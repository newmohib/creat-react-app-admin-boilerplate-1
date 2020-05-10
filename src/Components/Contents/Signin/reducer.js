import { GET_USERS, SIGNIN_INPUT, SIGNIN_SUBMIT } from './constant';

let initialState = { email: "", password: "" };

const reducer = (state = initialState, action) => {
    const newState = { ...state };
    console.log("reducer Signin Information", action.payload);

    switch (action.type) {
        case SIGNIN_INPUT:
            return  action.payload;
            break;
        case SIGNIN_SUBMIT:
            return  action.payload;
            break;
    }
    return newState;
};

export default reducer;

export {initialState};