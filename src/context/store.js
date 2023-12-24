import { createStore } from "redux";
import myRaducers from ".";

const store = createStore(
  myRaducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
