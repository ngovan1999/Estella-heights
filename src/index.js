import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../src/redux/reducers";
import sagas from "../src/redux/sagas";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers(), {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
