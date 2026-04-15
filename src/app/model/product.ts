export interface ProductItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
}

export interface ProductCategory {
  category: string;
  products: ProductItem[];
}