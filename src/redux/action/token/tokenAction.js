import { SET_TOKEN } from "redux/constant/token/tokenConstant";

const setAppToken = (data) => ({
  type: SET_TOKEN,
  payload: data,
});

export { setAppToken };
