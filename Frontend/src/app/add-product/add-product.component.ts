import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private productService: ProductService, private router: Router) { }

  product = {
    pname: '',
    pcategory: '',
    price: null
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log("Submitted Product:", this.product);
      this.productService.postProduct(this.product).subscribe(data => {
        console.log(data)
      })
      this.router.navigate(["/product"]);
    } else {
      console.log("Form is invalid");
    }
  }
}
