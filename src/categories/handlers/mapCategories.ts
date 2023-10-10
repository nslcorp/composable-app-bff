import { Category, CategoryMagento } from '../../types';

export const mapCategories = (categories: CategoryMagento[]) =>
  categories
    .map((record) => {
      const data: Category = {
        id: record.id,
        name: record.name,
        product_count: record.product_count,
        // ancestors: mapCategories(record.children_data),
        parent: { id: record.parent_id },
      };
      return [data, ...mapCategories(record.children_data)].flat();
    })
    .flat()
    .filter((record) => record.product_count > 0);
