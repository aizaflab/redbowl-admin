import { apiSlice } from "../api/apiSlice";
import { localDataSetter, localDataRemove } from "../../utils/localStorage";
import { userLoggedIn } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login a user (POST)
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { user, token } = result?.data?.data || {};
          console.log(user);
          if (user?.role === "admin") {
            localDataSetter("authToken", token);
            dispatch(userLoggedIn({ user }));
          } else {
            localDataRemove("authToken");
            window.location.href = "/login";
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),

    // Fetch user data (GET)
    userData: builder.query({
      query: () => ({
        url: `/user/profile`,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data } = result?.data || {};
          dispatch(userLoggedIn({ user: data }));
        } catch (error) {
          console.error(error);
        }
      },
      providesTags: ["User"], // Add providesTags
    }),
  }),
});

export const { useLoginMutation, useUserDataQuery } = authApiSlice;
