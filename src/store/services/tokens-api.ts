import { TokenResponse } from "@/types/token"
import { appApi } from "./app-api"

export const tokensApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.query<TokenResponse, void>({
      query: () => ({
        url: "/token"
      })
    })
  })
})

export const { useLazyGetTokenQuery } = tokensApi
