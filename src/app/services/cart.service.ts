import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: any[] = [];

// addToCart(product: any) {
//   const existing = this.cart.find(p => p.name === product.name);

//   if (existing) {
//     existing.qty += 1;
//   } else {
//     this.cart.push({ ...product, qty: 1 });
//   }
// }

addToCart(product: any) {
    const existing = this.cart.find(p =>
      p.name === product.name &&
      p.quantity === product.quantity
    );

    if (existing) {
      existing.qty++;
    } else {
      this.cart.push({ ...product, qty: 1 });
    }
  }

  // getCart() {
  //   return this.cart;
  // }
    getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }

//   decreaseQty(product: any) {
//   const existing = this.cart.find(p => p.name === product.name);

//   if (!existing) return;

//   existing.qty -= 1;

//   if (existing.qty <= 0) {
//     this.cart = this.cart.filter(p => p.name !== product.name);
//   }
// }

    decreaseQty(product: any) {
    const item = this.cart.find(p =>
      p.name === product.name &&
      p.quantity === product.quantity
    );

    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {
      this.cart = this.cart.filter(p => p !== item);
    }
  }
}