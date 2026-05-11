import apiClient from '@services/apiClient';
import { ProductsResponse, Product, Category } from '@appTypes/api.types';

export const productApi = {
  getProducts: async ({ skip = 0, limit = 20 }: { skip?: number; limit?: number }) => {
    const response = await apiClient.get<ProductsResponse>('/products', {
      params: { skip, limit },
    });
    return response.data;
  },

  getProductById: async (id: number) => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (query: string) => {
    const response = await apiClient.get<ProductsResponse>(`/products/search`, {
      params: { q: query },
    });
    return response.data;
  },

  getCategories: async () => {
    const response = await apiClient.get<Category[]>('/products/categories');
    return response.data;
  },

  getProductsByCategory: async (categorySlug: string) => {
    const response = await apiClient.get<ProductsResponse>(`/products/category/${categorySlug}`);
    return response.data;
  }
};
