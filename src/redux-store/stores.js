import { init } from "@rematch/core";
import * as models from "./models";

const store = init({
  models,
});

const getState = store.getState;
const dispatch = store.dispatch;
export { getState, dispatch };
export default store;
