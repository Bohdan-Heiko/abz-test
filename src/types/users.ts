import { usersSchemaDto } from "@/dto/users.dto";
import { z } from "zod";

export type UsersResponse = z.infer<typeof usersSchemaDto>;

export type UsersResponseParams = {
  count: number;
  page: number;
};
