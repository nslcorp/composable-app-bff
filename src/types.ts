export enum NodeDataProvider {
  COMMERCE_TOOLS = 'commerceTools',
  MAGENTO = 'magento',
}

export interface Category {
  id: number | string;
  name: string;
  product_count: number;
  ancestors?: any;
  parent: {
    id: number | string;
  };
}

export interface CategoryMagento {
  id: number;
  parent_id: number;
  name: string;
  is_active: boolean;
  position: number;
  level: number;
  product_count: number;
  children_data: CategoryMagento[];
}

export interface MagentoProduct {
  id: number;
  sku: string;
  name: string;
  attribute_set_id: string;
  price: number;
  status: number;
  visibility: number;
  type_id: string;
  created_at: string;
  updated_at: string;
  custom_attributes: {
    attribute_code: string;
    value: string;
  }[];
  extension_attributes: any;
  variants?: ProductVariantMagento[];
}

export interface Product {
  id: string;
  description: string;
  slug: any;
  name: string;
  variants?: ProductVariant[];

  // price: number,
  // sizes: string[];
  // colors: string[];
}

export interface ProductVariantMagento {}

export interface PriceValue {
  value: {
    currencyCode: string;
    centAmount: number;
  };
}

export interface ProductVariant {
  id: string | number;
  sku: string;
  prices: PriceValue[];
  images: {
    url: string;
  }[];
  attributes: {
    color: string;
    size: string;
  }[];
  slug: string;
}

export interface AddCartItem {
  sku: string;
  qty: string;
}

export interface Cart {
  id: string;
  customerId: string;
  version?: number;
  lineItems: CartLineItems[];
}

export interface CartLineItems {
  id: string;
  quantity: number;
  totalPrice: number;
  variant: {
    sku: string;
    name: string;
    prices: PriceValue[];
  };
}

export interface Order {
  id: string
}