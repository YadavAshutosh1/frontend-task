import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().min(5, "Min 5 characters"),
  priority: z.enum(["low", "medium", "high"]), // ✅ FIXED
  dueDate: z.string().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) >= today;
  }, "Date must be in future"),
  expiryDuration: z.string().min(1, "Expiry duration required")
});