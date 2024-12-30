import { applyMiddleware, createStore } from "redux";
import { productsReducer } from "./productsReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

const rootReducer = productsReducer

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
