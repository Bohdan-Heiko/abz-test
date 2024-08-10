import { usersSchemaDto } from "@/dto/users.dto";
import { UsersResponse, UsersResponseParams } from "@/types/users";
import { appApi } from "./app-api";

export const visitApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UsersResponse, UsersResponseParams>({
      query: (params) => ({
        url: "/users",
        params,
      }),
      transformResponse: (baseQueryReturnValue: UsersResponse) => {
        usersSchemaDto.parse(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
    }),
  }),
});

export const { useGetAllUsersQuery, useLazyGetAllUsersQuery } = visitApi;
