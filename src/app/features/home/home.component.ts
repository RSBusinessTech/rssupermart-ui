import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductCategory, ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

searchTerm: string = '';
  categories: ProductCategory[] = [];
  allCategories: ProductCategory[] = [];

  constructor(private productService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.categories = data;
      this.allCategories = data;
    });
  }

  getFilteredCategories() {
    return this.productService.search(this.categories, this.searchTerm);
  }

  addToCart(product: any) {
  this.cartService.addToCart(product);
}

 sendCartToWhatsApp() {

  const phoneNumber = "+918284948635"; // your number
  const cart = this.cartService.getCart();

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let message = "🛒 *My Order List*:%0A%0A";

let total = 0;

cart.forEach(item => {
  const itemTotal = item.price * item.qty;

  message += `• ${item.name}%0A`;
  message += `   Rs. ${item.price} x ${item.qty} = Rs. ${itemTotal}%0A%0A`;

  total += itemTotal;
});

message += `💰 *Total: Rs. ${total}*%0A%0A`;
message += "Please confirm my order. Thank you! 😊";

  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(url, "_blank");
 }

 increaseQty(product: any) {
  this.cartService.addToCart(product);
}

decreaseQty(product: any) {
  this.cartService.decreaseQty(product);
}

getQty(product: any): number {
  const item = this.cartService.getCart().find(p => p.name === product.name);
  return item ? item.qty : 0;
}
}
