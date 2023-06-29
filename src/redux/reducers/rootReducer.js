import { combineReducers } from "redux";

import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  user: userReducer,  
  admin: adminReducer,
});

export default rootReducer;
