import { Request, Response } from "express";
import { CategoryCreateSchema } from "../model/dto";
import { v7 } from "uuid";
import { CategoryPersistence } from "../repository/dto";

export const createCategoryApi = async (req: Request, res: Response) => {
  const { success, data, error } = CategoryCreateSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      message: error.message,
    });
    return;
  }

  const newId = v7();
  await CategoryPersistence.create({ id: newId, ...data });

  res.status(200).json({
    message: "Category created successfully",
    data: {
      id: newId,
      ...data,
    },
  });
};
