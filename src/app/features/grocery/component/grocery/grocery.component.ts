import { Component, OnInit, HostListener } from '@angular/core';
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

  currentPage: number = 1;
  itemsPerPage: number = 20;

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.setItemsPerPage();

    this.productService.getGroceryProducts().subscribe((products: any[]) => {

      this.groceryProducts = products.map(product => {

        product.options = product.options || [];

        product.options.sort((a: any, b: any) => {
          const getValue = (str: string) => {
            const num = parseFloat(str);
            if (str.includes('kg') || str.includes('L')) return num * 1000;
            return num;
          };
          return getValue(a.label) - getValue(b.label);
        });

        product.selectedOption = product.options[0];
        return product;
      });

    });

    this.syncCart();
  }

  @HostListener('window:resize')
  onResize() {
    const old = this.itemsPerPage;
    this.setItemsPerPage();
    if (old !== this.itemsPerPage) {
      this.currentPage = 1;
    }
  }

  setItemsPerPage() {
    const width = window.innerWidth;

    if (width <= 768) this.itemsPerPage = 10;
    else if (width <= 992) this.itemsPerPage = 16;
    else this.itemsPerPage = 20;
  }

  onSearchChange() {
    this.currentPage = 1;
  }

  // ================= FILTER =================
  get filteredProducts() {
    if (!this.searchTerm.trim()) return this.groceryProducts;

    const term = this.searchTerm.toLowerCase();
    return this.groceryProducts.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }

  // ================= PAGINATION PRODUCTS =================
  get pagedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage) || 1;
  }

  // ================= PAGINATION UI =================
  get paginationPages(): (number | string)[] {
    const total = this.totalPages;

    if (total <= 4) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    return [1, 2, 3, '...', total];
  }

  goToPage(page: number | string) {
    if (page === '...') return;

    this.currentPage = Number(page);

    const el = document.querySelector('.products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToFirst() {
    this.goToPage(1);
  }

  goToLast() {
    this.goToPage(this.totalPages);
  }

  // ================= CART =================
  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

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
    const item = this.cartItems.find(p =>
      p.name === product.name &&
      p.quantity === product.selectedOption.label
    );
    return item ? item.qty : 0;
  }

  private syncCart() {
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + (item.price * item.qty), 0
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
      message += `   Rs. ${item.price} x ${item.qty} = Rs. ${itemTotal}%0A%0A`;

      total += itemTotal;
    });

    message += `💰 *Total: Rs. ${total}*%0A%0A`;
    message += "Please confirm my order. Thank you! 😊";

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }

  // ================= PDF =================
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