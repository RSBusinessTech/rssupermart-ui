import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/product.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTerm: string = '';

  homeCategories: any[] = [];
  filteredCategories: any[] = [];

  cartItems: any[] = [];
  totalPrice: number = 0;
  isCartOpen: boolean = false;

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    this.productService.getHomePageProducts()
      .subscribe((categories: any[]) => {

        // SAFE COPY (IMPORTANT FIX)
        this.homeCategories = JSON.parse(JSON.stringify(categories));

        this.homeCategories.forEach(category => {

          category.products.forEach((product: any) => {

            product.options = product.options || [];

            product.options.sort((a: any, b: any) => {

              const getValue = (str: string) => {
                const num = parseFloat(str);
                if (str.includes('kg') || str.includes('L')) {
                  return num * 1000;
                }
                return num;
              };

              return getValue(a.label) - getValue(b.label);
            });

            product.selectedOption = product.options[0];
          });
        });

        // INITIAL LOAD
        this.filteredCategories = [...this.homeCategories];

      });

    this.syncCart();
  }

  // ================= SEARCH FIX =================
  onSearchChange(): void {

    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredCategories = [...this.homeCategories];
      return;
    }

    this.filteredCategories = this.homeCategories
      .map(category => {

        const matchedProducts = category.products.filter((p: any) =>
          p.name.toLowerCase().includes(term)
        );

        return {
          ...category,
          products: matchedProducts
        };
      })
      .filter(category => category.products.length > 0);
  }

  // ================= CART =================
  increaseQty(product: any) {

    this.cartService.addToCart({
      name: product.name,
      price: product.selectedOption.price,
      quantity: product.selectedOption.label
    });

    this.syncCart();
  }

  decreaseQty(product: any) {

    this.cartService.decreaseQty({
      name: product.name,
      quantity: product.selectedOption.label
    });

    this.syncCart();
  }

  getQty(product: any): number {

    const item = this.cartItems.find((p: any) =>
      p.name === product.name &&
      p.quantity === product.selectedOption.label
    );

    return item ? item.qty : 0;
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  private syncCart() {

    this.cartItems = this.cartService.getCart();

    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + (item.price * item.qty),
      0
    );
  }

  // ================= WHATSAPP =================
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
      message += `Rs. ${item.price} x ${item.qty} = Rs. ${itemTotal}%0A%0A`;

      total += itemTotal;
    });

    message += `💰 *Total: Rs. ${total}*`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank"
    );
  }

  // ================= PDF =================
  downloadPDF() {

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('My Order List', 10, 10);

    let y = 20;
    let total = 0;

    this.cartItems.forEach(item => {

      const line =
        `${item.name} (${item.quantity}) x ${item.qty} = Rs. ${item.price * item.qty}`;

      doc.text(line, 10, y);

      y += 10;
      total += item.price * item.qty;
    });

    doc.text(`Total: Rs. ${total}`, 10, y + 10);

    doc.save('Bill.pdf');
  }
}