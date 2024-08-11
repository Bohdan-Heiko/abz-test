import { z } from "zod"

export const positionsSchemaDto = z.object({
  success: z.boolean(),
  positions: z.array(
    z.object({
      id: z.number(),
      name: z.string()
    })
  )
})
