import { buildQueryParams } from "../../utils/queryParamsHelper";
import { apiSlice } from "../api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetches a list of users.
    getUsers: builder.query({
      query: (data) => {
        let queryParams = buildQueryParams(data);
        return { url: `/backend/users?${queryParams}` };
      },
      providesTags: ["User"], // Provide User tag
    }),

    // Update a user.
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"], // Invalidate User tag
    }),

    // Deletes a user.
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/backend/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"], // Invalidate User tag
    }),
  }),
});

// Export hooks for using the defined API endpoints
export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
