import { Category as CategoryCommerce } from "@commercetools/platform-sdk/dist/declarations/src/generated/models/category";
import { Category } from "../../../types";

export const mapCategoriesFromCommerce = (categories: CategoryCommerce[]) => {
  return categories.map((category) => {
    const data: Category = {
      id: category.id,
      name: category.name[process.env.COMMERCE_TOOLS_LOCALE],
      parent: { id: category.parent?.id || 0 },
      product_count: 0
    }
    return data
  });

}