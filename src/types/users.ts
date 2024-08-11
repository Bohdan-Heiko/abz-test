import { positionsSchemaDto } from "@/dto/users-positions.dto";
import { usersSchemaDto } from "@/dto/users.dto";
import { z } from "zod";

export type UsersResponse = z.infer<typeof usersSchemaDto>;
export type UsersPositionsResponse = z.infer<typeof positionsSchemaDto>;

export type UsersResponseParams = {
  count: number;
  page: number;
};
