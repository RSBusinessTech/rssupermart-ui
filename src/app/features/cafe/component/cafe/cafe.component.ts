import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/product.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.css']
})
export class CafeComponent implements OnInit, AfterViewInit {

  searchTerm: string = '';

  cafeServices: any[] = [];

  cartItems: any[] = [];
  totalPrice: number = 0;
  isCartOpen: boolean = false;

  @ViewChild('cartScroll', { static: false }) cartScroll!: ElementRef;

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.productService.getCafeServices().subscribe(products => {
      this.cafeServices = products;

      // ✅ safe default option (NO optional chaining)
      for (let i = 0; i < this.cafeServices.length; i++) {
        const p = this.cafeServices[i];

        if (!p.selectedOption && p.options && p.options.length > 0) {
          p.selectedOption = p.options[0];
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.syncCart();
  }

  // =========================
  // SEARCH FILTER
  // =========================
  get filteredProducts() {
    if (!this.searchTerm || !this.searchTerm.trim()) {
      return this.cafeServices;
    }

    const term = this.searchTerm.toLowerCase();

    return this.cafeServices.filter(p =>
      p.name.toLowerCase().indexOf(term) !== -1
    );
  }

  // =========================
  // CART
  // =========================
  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  addToCart(product: any) {
    const item = this.buildCartItem(product);
    this.cartService.addToCart(item);
    this.syncCartAndScroll();
  }

  increaseQty(product: any) {
    const item = this.buildCartItem(product);
    this.cartService.addToCart(item);
    this.syncCartAndScroll();
  }

  decreaseQty(product: any) {
    const item = this.buildCartItem(product);
    this.cartService.decreaseQty(item);
    this.syncCart();
  }

  getQty(product: any): number {

    const option = this.getSelectedOption(product);

    const cart = this.cartService.getCart();

    for (let i = 0; i < cart.length; i++) {
      const p = cart[i];

      if (p.name === product.name && p.quantity === option.label) {
        return p.qty;
      }
    }

    return 0;
  }

  // =========================
  // SAFE OPTION GETTER
  // =========================
  private getSelectedOption(product: any) {
    if (product.selectedOption) {
      return product.selectedOption;
    }

    if (product.options && product.options.length > 0) {
      return product.options[0];
    }

    return { label: '' };
  }

  // =========================
  // BUILD CART ITEM
  // =========================
  private buildCartItem(product: any) {

    const option = this.getSelectedOption(product);

    return {
      name: product.name,
      price: option.price,
      quantity: option.label,
      qty: 1
    };
  }

  // =========================
  // CART SYNC
  // =========================
  private syncCart() {
    this.cartItems = this.cartService.getCart();

    this.totalPrice = 0;

    for (let i = 0; i < this.cartItems.length; i++) {
      const item = this.cartItems[i];
      this.totalPrice += item.price * item.qty;
    }
  }

  private syncCartAndScroll() {
    this.syncCart();

    setTimeout(() => {
      if (this.cartScroll) {
        this.cartScroll.nativeElement.scrollTop =
          this.cartScroll.nativeElement.scrollHeight;
      }
    }, 50);
  }

  // =========================
  // WHATSAPP ORDER
  // =========================
  sendCartToWhatsApp() {

    const phoneNumber = "918284948635";
    const cart = this.cartService.getCart();

    if (!cart || cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    let message = "🛒 *My Order List*:%0A%0A";
    let total = 0;

    for (let i = 0; i < cart.length; i++) {

      const item = cart[i];
      const itemTotal = item.price * item.qty;

      message += "• " + item.name + " (" + item.quantity + ")%0A";
      message += "   Rs. " + item.price + " x " + item.qty + " = Rs. " + itemTotal + "%0A%0A";

      total += itemTotal;
    }

    message += "💰 *Total: Rs. " + total + "*%0A%0A";
    message += "Please confirm my order. Thank you! 😊";

    window.open("https://wa.me/" + phoneNumber + "?text=" + message, "_blank");
  }

  // =========================
  // PDF BILL
  // =========================
  downloadPDF() {

    const doc = new (jsPDF as any)();

    doc.setFontSize(16);
    doc.text('My Order List', 10, 10);

    let y = 20;
    let total = 0;

    for (let i = 0; i < this.cartItems.length; i++) {

      const item = this.cartItems[i];

      const line =
        item.name +
        " (" + item.quantity + ") x " +
        item.qty +
        " = Rs. " +
        (item.price * item.qty);

      doc.setFontSize(12);
      doc.text(line, 10, y);

      y += 10;
      total += item.price * item.qty;
    }

    doc.setFontSize(14);
    doc.text("Total: Rs. " + total, 10, y + 10);

    doc.save("Bill-RS-SuperMart.pdf");
  }
}