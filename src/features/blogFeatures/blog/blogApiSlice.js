import { apiSlice } from "../../api/apiSlice";

const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add a new blog (POST)
    addBlog: builder.mutation({
      query: (data) => ({
        url: `/blogs`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["blogs", "singleBlogs"],
    }),
    getBlogs: builder.query({
      query: (pathname) => ({
        url: `/blogs${pathname}`,
      }),
      providesTags: ["blogs"],
    }),
    // Update a blog.
    updateBlog: builder.mutation({
      query: ({ blogId, data }) => ({
        url: `/blogs/${blogId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["blogs", "singleBlogs"],
    }),
    getBlogSingle: builder.query({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
      }),
      providesTags: ["singleBlogs"],
    }),
    // reported blog ban.
    deletedBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs", "singleBlogs"],
    }),
  }),
});

// Export hooks for using the defined API endpoints
export const {
  useAddBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
  useDeletedBlogMutation,
  useGetBlogSingleQuery,
} = blogApiSlice;
