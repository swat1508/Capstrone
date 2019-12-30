import { createStore,combineReducers, applyMiddleware, compose } from "redux";
import ReviewReducer from "../reducers/reviews-reducer";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
rootReducer = combineReducers({cartItems: ReviewReducer}); 
const store = createStore(
  rootReducer,storeEnhancers(applyMiddleware(thunk))
);

export default store;
