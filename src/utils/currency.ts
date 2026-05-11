export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateDiscount = (price: number, discountPercentage: number): number => {
  return price - (price * discountPercentage) / 100;
};
