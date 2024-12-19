import { z } from "zod";

const timeEntrySchema = z.object({
  id: z.number(),
  clerkId: z.string(),
  hoursWorked: z.number(),
  hourlyRate: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type timeEntrySchema = z.infer<typeof timeEntrySchema>;

export { timeEntrySchema }

