import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model-classes/product';
import { ProductFormService } from 'src/app/services/product-form.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  productList! : Product[];
  filteredProducts! : Product[];
  p: number = 1;
  config : any;

  constructor(private router: Router, private productFormService: ProductFormService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.productList?.length
    };
  }



  ngOnInit(): void {
    
    this.productFormService.gtAllProducts().subscribe( (data: Product[])=>{
      this.productList = this.filteredProducts = data;
      console.log('====================>',data, this.productList)

    });
    
  }

  filter(text : string) {
    console.log(text)
    this.filteredProducts = (text) ? this.productList.filter( product => product.title?.toLowerCase().includes(text.toLowerCase())) : this.productList ;
  }
  
  onAddProduct() {
    this.router.navigate(['/admin/products/new']);
  }
  pageChanged(event: any) {
    this.config.currentPage = event;
  }
  onChange(event : any) {
    console.log('======>',event.target.value)
    this.config.itemsPerPage = event.target.value;
  }

}
