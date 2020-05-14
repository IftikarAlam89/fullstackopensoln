import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools } from "redux-devtools-extension";
import anecreducer from './reducers/anecdoteReducer'
import notifreducer from "./reducers/notificationReducer";
import filterreducer from "./reducers/filterreducer";
const reducer =combineReducers({
    anec: anecreducer,
    notif: notifreducer,
    filtered: filterreducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default  store