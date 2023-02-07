export const initialState = {
  token: null,
  user: null,
  refreshToken: null,
};

export const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
  SET_USER: "SET_USER",
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return { ...state, token: action.value };
    case actionTypes.SET_USER:
      return { ...state, user: action.value };
    default:
      return state;
  }
};

export default reducer;
