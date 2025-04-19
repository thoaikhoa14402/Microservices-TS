import { Request, Response } from "express";
import { CategoryUpdateSchema } from "../model/dto";
import { CategoryPersistence } from "../repository/dto";
import { CategoryStatus } from "../model/model";

export const updateCategoryApi = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { success, data, error } = CategoryUpdateSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      data: false,
      message: error.issues.map((issue) => issue.message).join(", "),
    });
    return;
  }

  // Check if the category name already exists
  const category = await CategoryPersistence.findByPk(id);

  if (!category) {
    res.status(404).json({
      message: "Category not found",
    });
    return;
  }

  if (category.status === CategoryStatus.Deleted) {
    res.status(400).json({
      message: "Category not found",
    });
    return;
  }

  await CategoryPersistence.update(data, {
    where: {
      id,
    },
  });

  res.status(200).json({
    message: "Category updated successfully",
    category: {
      id,
      ...data,
    },
  });
};
