import { z } from "zod";
import { CategoryStatus } from "./model";

export const CategoryCreateSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  image: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().uuid().nullable().optional(),
});

export type CategoryCreateDTO = z.infer<typeof CategoryCreateSchema>;

export const CategoryUpdateSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  image: z.string().optional(),
  description: z
    .string()
    .max(255, "Description must be at most 255 characters long"),
  parentId: z.string().uuid().nullable().optional(),
  status: z.nativeEnum(CategoryStatus).optional(),
});

export type CategoryUpdateDTO = z.infer<typeof CategoryUpdateSchema>;
