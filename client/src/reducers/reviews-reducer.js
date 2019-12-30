import config from "../config/config";

const initialState = {data:[]};

function reviewsReducer (state = initialState, action) {
    switch (action.type) {
        case 'LOAD_CART':
            console.log(state);
            break;
        case 'ADD_TO_CART':
            console.log(config);
            break;
        default:
            break; 
    }
    return state;
}

export default reviewsReducer;