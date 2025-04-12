import { Request, Response } from "express";
import { CategoryStatus } from "../model/model";
import { CategoryPersistence } from "../repository/dto";

export const deleteCategoryApi = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Check if the category exists
  const category = await CategoryPersistence.findByPk(id);

  if (!category) {
    res.status(404).json({
      message: "Category not found",
    });
    return;
  }

  // Check if the category is already deleted
  if (category.status === CategoryStatus.Deleted) {
    res.status(400).json({
      message: "Category already deleted",
    });
    return;
  }

  // Soft delete the category
  await CategoryPersistence.update(
    { status: CategoryStatus.Deleted },
    { where: { id } }
  );

  res.status(200).json({
    message: "Category deleted successfully",
    category: {
      id,
      ...category.toJSON(),
      status: CategoryStatus.Deleted,
    },
  });
};
