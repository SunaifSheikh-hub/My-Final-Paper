import { createStore, applyMiddleware } from "redux";
// import { createStore } from 'react-redux'
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const composeEnhancers = composeWithDevTools({});

const initialstore ={
    cartReducer : {
        cartItems : JSON.parse(localStorage.getItem('cartItems')) ?? []
    }
}

export const store = createStore(rootReducer,initialstore, composeEnhancers());
