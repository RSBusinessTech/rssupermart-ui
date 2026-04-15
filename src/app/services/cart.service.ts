import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: any[] = [];

addToCart(product: any) {
  const existing = this.cart.find(p => p.name === product.name);

  if (existing) {
    existing.qty += 1;
  } else {
    this.cart.push({ ...product, qty: 1 });
  }
}

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }

  decreaseQty(product: any) {
  const existing = this.cart.find(p => p.name === product.name);

  if (!existing) return;

  existing.qty -= 1;

  if (existing.qty <= 0) {
    this.cart = this.cart.filter(p => p.name !== product.name);
  }
}
}