import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import signinReducer from '../Components/Contents/Signin/reducer';
import signupReducer from '../Components/Contents/Signup/reducer';


const rootReducer = () => combineReducers({
    signin: signinReducer,
    signup: signupReducer,
});



export default function configureStore() {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
        rootReducer(),
        composeEnhancer(
            applyMiddleware(),
        ),
    )
    return store
}