import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  name: string;
  price: number;
  image: string;
}

export interface ProductCategory {
  category: string;
  routerLink: string;
  products: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dataUrl = 'assets/data/products.json';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.dataUrl);
  }

  search(categories: ProductCategory[], term: string): ProductCategory[] {
    if (!term.trim()) return categories;

    const search = term.toLowerCase();

    return categories
      .map(cat => ({
        ...cat,
        products: cat.products.filter(p =>
          p.name.toLowerCase().includes(search)
        )
      }))
      .filter(cat => cat.products.length > 0);
  }
}