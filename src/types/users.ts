import { z } from "zod"

import { oneUserUserSchemaDto, usersSchemaDto } from "@/dto/users.dto"
import { positionsSchemaDto } from "@/dto/users-positions.dto"
import { signUpSchema } from "@/schema/signup.schema"

export type UsersResponse = z.infer<typeof usersSchemaDto>
export type UsersPositionsResponse = z.infer<typeof positionsSchemaDto>
export type SignUpUserSchemaType = z.infer<typeof signUpSchema>

export type OneUserResponse = z.infer<typeof oneUserUserSchemaDto>

export type SuccessSignUpUser = {
  success: boolean
  user_id: number
  message: string
}
export type UsersResponseParams = {
  count: number
  page: number
}
