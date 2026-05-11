import { useQuery } from '@tanstack/react-query';
import { productApi } from '../services/productApi';

export const useProducts = (skip = 0, limit = 20) => {
  return useQuery({
    queryKey: ['products', skip, limit],
    queryFn: () => productApi.getProducts({ skip, limit }),
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductById(id),
    enabled: !!id,
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => productApi.searchProducts(query),
    enabled: !!query,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productApi.getCategories(),
  });
};
