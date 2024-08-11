import { z } from "zod"

import { usersSchemaDto } from "@/dto/users.dto"
import { positionsSchemaDto } from "@/dto/users-positions.dto"

export type UsersResponse = z.infer<typeof usersSchemaDto>
export type UsersPositionsResponse = z.infer<typeof positionsSchemaDto>

export type UsersResponseParams = {
  count: number
  page: number
}
