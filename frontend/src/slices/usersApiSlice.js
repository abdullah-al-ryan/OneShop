import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // We are not fethcing any data from the backend API. We are just sending data to the backend API. So instead of query we are going to use mutation
    login: builder.mutation({
      query: (data) => ({
        url: USERS_URL / auth,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
