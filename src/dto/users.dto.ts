import { z } from "zod"

export const usersSchemaDto = z.object({
  success: z.boolean(),
  total_pages: z.number(),
  total_users: z.number(),
  count: z.number(),
  page: z.number(),
  links: z.object({
    next_url: z.string().nullable().optional(),
    prev_url: z.string().nullable().optional()
  }),
  users: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      position: z.string(),
      position_id: z.number(),
      photo: z.string()
    })
  )
})

export const oneUserUserSchemaDto = z.object({
  success: z.boolean(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    position_id: z.number(),
    position: z.string(),
    photo: z.string().url()
  })
})
