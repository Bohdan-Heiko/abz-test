import { positionsSchemaDto } from "@/dto/users-positions.dto"
import { usersSchemaDto } from "@/dto/users.dto"
import {
  SuccessSignUpUser,
  UsersPositionsResponse,
  UsersResponse,
  UsersResponseParams
} from "@/types/users"

import { appApi } from "./app-api"

export const visitApi = appApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllUsers: builder.query<UsersResponse, UsersResponseParams>({
      query: (params) => ({
        url: "/users",
        params
      }),
      transformResponse: (baseQueryReturnValue: UsersResponse) => {
        usersSchemaDto.parse(baseQueryReturnValue)
        return baseQueryReturnValue
      },
      providesTags: ["Users"]
    }),

    getUsersPositions: builder.query<UsersPositionsResponse, void>({
      query: () => ({
        url: "/positions"
      }),
      transformResponse: (baseQueryReturnValue: UsersPositionsResponse) => {
        positionsSchemaDto.parse(baseQueryReturnValue)
        return baseQueryReturnValue
      }
    }),

    createUser: builder.mutation<SuccessSignUpUser, FormData>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
        headers: {
          "Ignore-Headers": "true"
        },
        formData: true
      }),
      invalidatesTags: ["Users"] // INVALIDATE ALL USERS AFTER CREATE
    })
  })
})

export const {
  useLazyGetAllUsersQuery,
  useGetUsersPositionsQuery,
  useCreateUserMutation
} = visitApi
