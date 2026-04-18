import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

  //Get all products.
  getAll(): Observable<ProductCategory[]> {
  return forkJoin([
    this.http.get<Product[]>('assets/data/grocery.json'),
    this.http.get<Product[]>('assets/data/snacks.json'),
    this.http.get<Product[]>('assets/data/drinks.json'),
    this.http.get<Product[]>('assets/data/stationery.json'),
    this.http.get<Product[]>('assets/data/cafe.json')
  ]).pipe(
    map((data: any[]) => [
      {
        category: 'Grocery',
        routerLink: '/grocery',
        products: data[0]
      },
      {
        category: 'Snacks',
        routerLink: '/snacks',
        products: data[1]
      },
      {
        category: 'Drinks',
        routerLink: '/drinks',
        products: data[2]
      },
      {
        category: 'Stationery',
        routerLink: '/stationery',
        products: data[3]
      },
      {
        category: 'Cafe Services',
        routerLink: '/cafe',
        products: data[4]
      }
    ])
  );
 }

  //Get grocery products.
  getGroceryProducts(): Observable<Product[]> {
   return this.http.get<Product[]>('assets/data/grocery.json');
  }

  //Get snacks products.
  getSnacksProducts(): Observable<Product[]> {
   return this.http.get<Product[]>('assets/data/snacks.json');
  }

  //Get drinks products.
  getDrinksProducts(): Observable<Product[]> {
   return this.http.get<Product[]>('assets/data/drinks.json');
  }

  //Get stationery products.
  getStationeryProducts(): Observable<Product[]> {
   return this.http.get<Product[]>('assets/data/stationery.json');
  }

  //Get cafe services.
  getCafeServices(): Observable<Product[]> {
   return this.http.get<Product[]>('assets/data/cafe.json');
  }

  //Search function.
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