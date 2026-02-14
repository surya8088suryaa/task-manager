import jio from "joi";

export const createTaskSchema = jio.object({
  title: jio.string().min(3).max(100).required(),
  description: jio.string().max(500).optional(),
  status: jio.string().valid("pending", "in-progress", "completed").optional(),
  priority: jio.string().valid("low", "medium", "high").optional(),
  dueDate: jio.date().optional().allow(null),
  userId: jio.string().optional(),
});

export const updateTaskSchema = jio
  .object({
    title: jio.string().min(3).max(100).optional(),
    description: jio.string().max(500).optional(),
    status: jio
      .string()
      .valid("pending", "in-progress", "completed")
      .optional(),
    priority: jio.string().valid("low", "medium", "high").optional(),
    dueDate: jio.date().optional().allow(null),
    userId: jio.string().optional(),
  })
  .min(1);