import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
    pname: ['', Validators.required],
    pcategory: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0)]]
  });

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.productService.getProduct(id).subscribe(data => {
      // Patch values from API to form
      this.productForm.patchValue({
        pname: data.pname,
        pcategory: data.pcategory,
        price: data.price
      });
    });
  }

  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.productForm.valid && id) {
    const updatedProduct = this.productForm.value;
      this.productService.updateProduct(id, updatedProduct).subscribe(data => {
        alert(data.message);
      })
      this.router.navigate(["/product"]);
    }
  }
}
