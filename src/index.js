import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {createLogger} from "redux-logger";
import thunkMiddleware from 'redux-thunk';
import "./index.css";
import App from "./containers/App";
import "tachyons";
import reportWebVitals from "./reportWebVitals";
import {searchRobots, requestRobots} from "./reducers";

const logger = createLogger();
const rootReducer = combineReducers({searchRobots, requestRobots})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store = {store}>
        <App />
    </Provider>);

reportWebVitals();
