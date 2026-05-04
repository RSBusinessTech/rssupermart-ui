import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/product.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {

  searchTerm: string = '';
  groceryProducts: any[] = [];
  cartItems: any[] = [];
  totalPrice: number = 0;
  isCartOpen: boolean = false;

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.productService.getGroceryProducts()
      .subscribe((products: any[]) => {

        this.groceryProducts = products.map(product => {

          // ✅ sort options (handles g, kg, L)
          product.options.sort((a: any, b: any) => {
            const getValue = (str: string) => {
              const num = parseFloat(str);
              if (str.includes('kg') || str.includes('L')) return num * 1000;
              return num;
            };
            return getValue(a.label) - getValue(b.label);
          });

          // ✅ default selected option
          product.selectedOption = product.options[0];

          return product;
        });

      });

    this.syncCart();
  }

  // 🔍 Search filter
  get filteredProducts() {
    if (!this.searchTerm.trim()) return this.groceryProducts;

    const term = this.searchTerm.toLowerCase();
    return this.groceryProducts.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }

  // 🛒 Toggle cart
  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  // ➕ Add item
  increaseQty(product: any) {
    this.cartService.addToCart({
      name: product.name,
      price: product.selectedOption.price,
      quantity: product.selectedOption.label
    });

    this.syncCart();
  }

  // ➖ Remove item
  decreaseQty(product: any) {
    this.cartService.decreaseQty({
      name: product.name,
      quantity: product.selectedOption.label
    });

    this.syncCart();
  }

  // 🔢 Get quantity for UI
  getQty(product: any): number {
    const item = this.cartItems.find(p =>
      p.name === product.name &&
      p.quantity === product.selectedOption.label
    );

    return item ? item.qty : 0;
  }

  // 🔄 Sync cart + total
  private syncCart() {
    this.cartItems = this.cartService.getCart();

    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + (item.price * item.qty),
      0
    );
  }

  // 📲 WhatsApp Order
  sendCartToWhatsApp() {
    const phoneNumber = "918284948635";

    if (this.cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    let message = "🛒 *My Order List*:%0A%0A";
    let total = 0;

    this.cartItems.forEach(item => {
      const itemTotal = item.price * item.qty;

      message += `• ${item.name} (${item.quantity})%0A`;
      message += `   Rs. ${item.price} x ${item.qty} = Rs. ${itemTotal}%0A%0A`;

      total += itemTotal;
    });

    message += `💰 *Total: Rs. ${total}*%0A%0A`;
    message += "Please confirm my order. Thank you! 😊";

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }

  // 📄 Download PDF
  downloadPDF() {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('My Order List', 10, 10);

    let y = 20;
    let total = 0;

    this.cartItems.forEach(item => {
      const line = `${item.name} (${item.quantity}) x ${item.qty} = Rs. ${item.price * item.qty}`;
      doc.text(line, 10, y);

      y += 10;
      total += item.price * item.qty;
    });

    doc.text(`Total: Rs. ${total}`, 10, y + 10);

    doc.save('Bill.pdf');
  }
}