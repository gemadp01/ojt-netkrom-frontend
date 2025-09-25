const DEFAULT_STATE = {
  id: "",
  name: "",
  email: "",
  role: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "USER_LOGIN") {
    const dupState = { ...state };

    dupState.id = action.payload.id;
    dupState.name = action.payload.name;
    dupState.email = action.payload.email;
    dupState.role = action.payload.role;

    return dupState;
  } else if (action.type === "USER_LOGOUT") {
    return DEFAULT_STATE;
  }

  return state;
};
