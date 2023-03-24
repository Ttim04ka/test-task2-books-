import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from 'redux-thunk'
import appReducer from './reducers/app-reducer.js'

let reducers=combineReducers({
   appReducer
});

/* type ReducersType=typeof reducers;
export type AppState=ReturnType<ReducersType> */

let store=createStore(reducers,applyMiddleware(thunk));
export default store;



