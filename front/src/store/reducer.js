import jwt_decode from "jwt-decode";
export const initialState = {
  token: null,
  user: null,
  refreshToken: null,
  id: null,
  role: null,
};


export const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
  SET_USER: "SET_USER",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOAD_MY_INFO_REQUEST: "LOAD_MY_INFO_REQUEST"
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return { ...state, token: action.value };
    case actionTypes.SET_USER:
      return { ...state, user: action.value };
    case actionTypes.LOGIN_SUCCESS:
      const userInfo = jwt_decode(action.value)
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return { ...state, id: userInfo.id, role: userInfo.role };
    case actionTypes.LOAD_MY_INFO_REQUEST:
      return { ...state, id: action.value.id, role: action.value.role };
    default:
      return state;
  }
};

export default reducer;
