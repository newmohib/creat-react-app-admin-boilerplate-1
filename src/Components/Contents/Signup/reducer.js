import { SIGNUP_INPUT, SIGNUP_SUBMIT } from './constant';

let initialState = { email: "", password: "" ,confPassword:""};

const reducer = (state = initialState, action) => {
    
    console.log("reducer Signup Information", action.payload);

    switch (action.type) {
        case SIGNUP_INPUT:
            return {...state, ...action.payload};
            break;
        case SIGNUP_SUBMIT:
            return {...state, ...action.payload};
            break;
    }
    return state;
};

export default reducer;
export {initialState};