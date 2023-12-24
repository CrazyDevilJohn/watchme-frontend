import { combineReducers } from "redux";
import userRaducer from "./raducers/userRaducer";

const myRaducers = combineReducers({
  user: userRaducer,
});

export default myRaducers;
