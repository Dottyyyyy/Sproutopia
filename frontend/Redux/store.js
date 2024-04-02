import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Import Redux Thunk middleware
// import { userReducer } from './Reducers/userReducers';
// import { getUser, getToken } from '../utils/user';
import cartItems from './Reducers/CartReducers';

const reducers = combineReducers({
    user: userReducer,
    cartItems: cartItems,
})
// let initialState = {

//     user: {
//         userInfo: getUser(),
//         token: getToken()
//     },

// }

const store = createStore(
    reducers,
    // initialState,
    applyMiddleware(thunk)
)

export default store;