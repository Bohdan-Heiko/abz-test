import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { RootState } from ".."

const API_URL = "https://frontend-test-assignment-api.abz.agency/api/v1"

export const appApi = createApi({
  reducerPath: "appApi",
  keepUnusedDataFor: 0,
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const state: RootState = getState() as RootState
      const token = state.auth.token

      if (token) {
        headers.set("Token", token)
      }

      if (!headers.has("Ignore-Headers")) {
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "application/json")
          headers.set("content-type", "application/json")
        }
        if (!headers.has("Accept")) {
          headers.set("Accept", "application/json")
        }
      } else {
        headers.delete("Ignore-Headers")
      }

      return headers
    }
  }),
  endpoints: () => ({})
})
