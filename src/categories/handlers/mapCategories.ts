import { Category, CategoryMagento } from '../../types';

export const mapCategories = (categories: CategoryMagento[]) =>
  categories.map((record) => {
    const data: Category = {
      id: record.id,
      name: record.name,
      ancestors: mapCategories(record.children_data),
      parent: { id: record.parent_id },
    };
    return data;
  });
