export type InventoryType = 'in_stock' | 'limited' | 'out_of_stock';

export type ProductType = {
  id: string;
  attributes: string[];
  category: string;
  createdAt: string | number;
  currency: string;
  image?: string;
  inventoryType: InventoryType;
  isAvailable: boolean;
  isShippable: boolean;
  name: string;
  price: number;
  quantity: number;
  updatedAt: string | number;
  variants: number;
  description: string;
  images: string[];
  includesTaxes: boolean;
  isTaxable: boolean;
  productCode: string;
  productSku: string;
  salePrice: string;
};
