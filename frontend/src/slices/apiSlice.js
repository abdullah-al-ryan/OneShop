// It is going to be parent to all the reducers or other API
// fetchbasequery is the function that will allow us to make requests to the backend API
// createApi is the function that will allow us to create an API

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  // The name of the API
  baseQuery,

  // tag types are used to define the types of data that will be fetching from the API
  tagTypes: ['Product', 'Order', 'User'],

  // The endpoints of the API. We don't have to manually fetch our data like we don't have to do our try catch with the fetch API inside of it and handle our errors. We can just define our endpoints and then we can use them inside of our components. We can do all through builder

  endpoints: (builder) => ({}),
});
