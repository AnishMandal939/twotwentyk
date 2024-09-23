import { combineReducers } from "redux";
import changeUserRoleReducer from "./changeUserRole/changeUserRoleReducer";
import configReducer from "./token/tokenReducer";

const RootReducer = combineReducers({
  appConfig: configReducer,
  userRole: changeUserRoleReducer,
});
export default RootReducer;
