import {
  Component,
  OnInit
} from '@angular/core';

import {
  ProductCategory,
  ProductsService
} from 'src/app/services/product.service';

import { CartService }
from 'src/app/services/cart.service';

import jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent
implements OnInit {

  searchTerm: string = '';

  categories: ProductCategory[] = [];

  cartItems: any[] = [];

  totalPrice: number = 0;

  isCartOpen: boolean = false;

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  // ================= INIT =================
  ngOnInit(): void {

    this.productService
      .getAll()
      .subscribe(data => {

        data.forEach(category => {

          category.products.forEach(
            (product: any) => {

              product.options =
                product.options || [];

            }
          );

        });

        this.categories = data;

      });

    this.syncCart();

  }

  // ================= FILTER =================
  getFilteredCategories() {

    if (!this.searchTerm.trim()) {
      return this.categories;
    }

    const term =
      this.searchTerm.toLowerCase();

    return this.categories
      .map(category => ({

        ...category,

        products:
          category.products.filter(
            (product: any) =>

              product.name
                .toLowerCase()
                .includes(term)
          )

      }))
      .filter(
        category =>
          category.products.length > 0
      );

  }

  // ================= CART =================
  toggleCart() {

    this.isCartOpen =
      !this.isCartOpen;

  }

  private syncCart() {

    this.cartItems =
      this.cartService.getCart();

    this.totalPrice =
      this.cartItems.reduce(

        (sum, item) =>
          sum + (item.price * item.qty),

        0
      );

  }

  // ================= WHATSAPP =================
  sendCartToWhatsApp() {

    const phoneNumber =
      "918284948635";

    if (this.cartItems.length === 0) {

      alert("Cart is empty!");

      return;

    }

    let message =
      "🛒 *My Order List*:%0A%0A";

    let total = 0;

    this.cartItems.forEach(item => {

      const itemTotal =
        item.price * item.qty;

      message +=
        `• ${item.name} (${item.quantity})%0A`;

      message +=
        `Rs. ${item.price} x ${item.qty} = Rs. ${itemTotal}%0A%0A`;

      total += itemTotal;

    });

    message +=
      `💰 *Total: Rs. ${total}*`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank"
    );

  }

  // ================= PDF =================
  downloadPDF() {

    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.text(
      'My Order List',
      10,
      10
    );

    let y = 20;

    let total = 0;

    this.cartItems.forEach(item => {

      const line =
        `${item.name} (${item.quantity}) x ${item.qty} = Rs. ${item.price * item.qty}`;

      doc.text(line, 10, y);

      y += 10;

      total +=
        item.price * item.qty;

    });

    doc.text(
      `Total: Rs. ${total}`,
      10,
      y + 10
    );

    doc.save('Bill.pdf');

  }

}