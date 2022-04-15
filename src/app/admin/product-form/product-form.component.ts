import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model-classes/product';
import { ProductFormService } from 'src/app/services/product-form.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm! : FormGroup;
  categories!: string[];
  id! : number;
  showDelete : boolean = false;


  constructor(
    private fb : FormBuilder,
    private productFormService : ProductFormService,
    private router: Router,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      title : this.fb.control('', [Validators.required]),
      price : this.fb.control('', [Validators.required]),
      category : this.fb.control('', [Validators.required]),
      imageUrl : this.fb.control('', [Validators.required])
    });

    this.route.paramMap.subscribe((data: any) => {
      this.id = data.params.id;
      if (this.id) {
        this.productFormService.getProductById(this.id).subscribe((data: Product) => {
          console.log("=========>", data)
          this.productForm.patchValue({
            title: data.title,
            price: data.price,
            category: data.category,
            imageUrl: data.imageUrl
          });
        });
        this.showDelete = true;
      }
    });


    this.productFormService.gtAllCategories().subscribe( (data: string[]) => {
     this.categories = data.sort();
    });
    
  }

  onSave() {
    if(this.id) {
      this.productFormService.updateProduct(this.productForm.value, this.id).subscribe();

    }else{
      this.productFormService.saveProduct(this.productForm.value).subscribe();
    }
      // this.router.navigate(['/admin/products']);
      window.location.replace('/admin/products');
      // window.location.reload();

  }

  validationError(field : string) {
    if(this.productForm.get(field)?.touched && this.productForm.get(field)?.invalid && this.productForm.get(field)?.errors) {
      return true;
    }else {
      return false;
    }
  }

  onKeyPress(event : any) {
    console.log('=======>', event)
    const regex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
    if(!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  onDelete() {
    if(confirm('Are you sure you want to delete?')) {
      this.productFormService.deleteProduct(this.id).subscribe();
    }

    this.router.navigate(['/admin/products']);
  }
}
