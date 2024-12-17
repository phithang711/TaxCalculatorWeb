import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api' }),
  reducerPath: 'taxApi',
  endpoints: (build) => ({
    example: build.query({
      query: (name) => `example/${name}`,
    }),
  }),
})

export const { useExampleQuery } = api
