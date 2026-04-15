import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductCategory, ProductsService } from 'src/app/services/product.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  searchTerm: string = '';
  categories: ProductCategory[] = [];
  allCategories: ProductCategory[] = [];

  cartItems: any[] = [];
  totalPrice: number = 0;

  // ✅ Angular 8 FIX (IMPORTANT)
  @ViewChild('cartScroll', { static: false }) cartScroll!: ElementRef;

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.categories = data;
      this.allCategories = data;
    });
  }

  ngAfterViewInit(): void {
    // initial load cart sync
    this.syncCart();
  }

  // ================= CART =================

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.syncCartAndScroll();
  }

  increaseQty(product: any) {
    this.cartService.addToCart(product);
    this.syncCartAndScroll();
  }

  decreaseQty(product: any) {
    this.cartService.decreaseQty(product);
    this.syncCart();
  }

  getQty(product: any): number {
    const item = this.cartService.getCart().find(p => p.name === product.name);
    return item ? item.qty : 0;
  }

  // ================= SYNC =================

  private syncCart() {
    this.cartItems = this.cartService.getCart();

    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + (item.price * item.qty),
      0
    );
  }

  private syncCartAndScroll() {
    this.syncCart();

    // wait for DOM update then scroll
    setTimeout(() => {
      this.scrollToBottom();
    }, 50);
  }

  private scrollToBottom(): void {
    try {
      if (this.cartScroll) {
        this.cartScroll.nativeElement.scrollTop =
          this.cartScroll.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  // ================= FILTER =================

  getFilteredCategories() {
    return this.productService.search(this.categories, this.searchTerm);
  }

  // ================= WHATSAPP =================

  sendCartToWhatsApp() {
    const phoneNumber = "918284948635"; // remove + for wa.me
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

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }

  isCartOpen: boolean = true;

  toggleCart() {
  this.isCartOpen = !this.isCartOpen;
 }

 downloadPDF() {
  const doc = new (jsPDF as any)();
  doc.setFontSize(16);
  doc.text('My Order List', 10, 10);

  let y = 20;
  let total = 0;

  this.cartItems.forEach(item => {

    const line = `${item.name} x ${item.qty} = Rs. ${item.price * item.qty}`;
    doc.setFontSize(12);
    doc.text(line, 10, y);

    y += 10;
    total += item.price * item.qty;
  });

  doc.setFontSize(14);
  doc.text(`Total: Rs. ${total}`, 10, y + 10);

  doc.save('Bill (RS SuperMart).pdf');
 }
}