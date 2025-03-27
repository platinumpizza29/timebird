import * as z from "zod";

export const HoursSchema = z.object({
  id: z.number(),
  userId: z.string(),
  department: z.string(),
  date: z.coerce.date(),
  hours: z.string(),
  isOvertime: z.boolean(),
  overtime: z.string(),
});
export type Hours = z.infer<typeof HoursSchema>;
