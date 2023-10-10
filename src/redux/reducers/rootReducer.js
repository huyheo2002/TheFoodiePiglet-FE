import { combineReducers } from "redux";

import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  user: userReducer,  
  admin: adminReducer,
  cart: cartReducer,
});

export default rootReducer;
