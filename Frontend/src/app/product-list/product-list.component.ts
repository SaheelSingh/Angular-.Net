import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  fetchProduct() {
    this.productService.getProducts().subscribe(data => {
      this.productList = data;
      console.log(this.productList)
    })
  }

  ngOnInit(): void {
      this.fetchProduct();
  }

  handleUpadte(productId: any) {
    this.router.navigate([`product/update/${productId}`])
  }
  
}
