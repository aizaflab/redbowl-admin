import { localDataRemove } from "../../utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = {
  accessToken: undefined,
  user: undefined
}

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: () => {
      localDataRemove("authToken");
      return initialState;
    }
  }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer

export const logout = () => async (dispatch) => {
  // Dispatch the resetState action for all the slices
  dispatch(userLoggedOut());
  // RTK Query State & catch clear
  await dispatch(apiSlice.util.resetApiState({ baseQuery: apiSlice.baseQuery }));
};
