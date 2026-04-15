import { Component, OnInit } from '@angular/core';
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

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.categories = data;
      this.allCategories = data;
    });
  }

  getFilteredCategories() {
    return this.productService.search(this.categories, this.searchTerm);
  }

}
