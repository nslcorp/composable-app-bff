export interface Category {
  id: number;
  name: string;
  ancestors: any;
  parent: {
    id: number;
  };
}

export interface CategoryMagento {
  id: number;
  "parent_id": number,
  "name": string
  "is_active": boolean,
  "position": number
  "level": number
  "product_count": number
  "children_data": CategoryMagento[]

}