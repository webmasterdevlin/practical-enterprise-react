import React from 'react';
import { InventoryType, ProductType } from 'models/product-type';
import Label from 'app/components/label';

export type TableResultsHelpers = {
  availability?: 'available' | 'unavailable';
  category?: string;
  inStock?: boolean;
  isShippable?: boolean;
};

export const applyFilters = (
  products: ProductType[],
  query: string,
  filters: TableResultsHelpers,
): ProductType[] => {
  return products.filter(product => {
    let matches = true;

    if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }

    if (filters.category && product.category !== filters.category) {
      matches = false;
    }

    if (filters.availability) {
      if (filters.availability === 'available' && !product.isAvailable) {
        matches = false;
      }

      if (filters.availability === 'unavailable' && product.isAvailable) {
        matches = false;
      }
    }

    if (
      filters.inStock &&
      !['in_stock', 'limited'].includes(product.inventoryType)
    ) {
      matches = false;
    }

    if (filters.isShippable && !product.isShippable) {
      matches = false;
    }

    return matches;
  });
};

export const applyPagination = (
  products: ProductType[],
  page: number,
  limit: number,
): ProductType[] => {
  return products.slice(page * limit, page * limit + limit);
};

export const getInventoryLabel = (
  inventoryType: InventoryType,
): JSX.Element => {
  const map = {
    in_stock: {
      text: 'In Stock',
      color: 'success',
    },
    limited: {
      text: 'Limited',
      color: 'warning',
    },
    out_of_stock: {
      text: 'Out of Stock',
      color: 'error',
    },
  };

  const { text, color }: any = map[inventoryType];

  return <Label color={color}>{text}</Label>;
};
