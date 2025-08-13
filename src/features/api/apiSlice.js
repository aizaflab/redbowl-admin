import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { accessToken, localDataSetter, refreshToken } from '../../utils/localStorage';
import { userLoggedIn, userLoggedOut } from '../auth/authSlice';


const BaseUrl = import.meta.env.VITE_APP_BASE_URL

const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {

  // Ensure extraOptions is defined and has headers
  if (!extraOptions) {
    extraOptions = {};
  }

  if (!extraOptions.headers) {
    extraOptions.headers = new Headers();
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401 && refreshToken()) {
    // Token expired, attempt to renew
    const renewResult = await baseQuery({
      url: '/frontend/auth/renew',
      method: 'POST',
      body: { refreshToken: refreshToken() }
    }, api, extraOptions);

    if (renewResult.data) {
      const { user, accessToken, refreshToken } = renewResult.data.data;

      // Dispatch the userLoggedIn action and update localStorage
      api.dispatch(userLoggedIn({ accessToken, user }));
      localDataSetter("authToken", { accessToken, refreshToken })

      // Set the new Authorization header with the renewed token
      extraOptions.headers.set('Authorization', `Bearer ${accessToken}`);

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Dispatch the userLoggedOut action
      api.dispatch(userLoggedOut())
    }
  }
  return result;
};


export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  refetchOnReconnect: true
});