import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model-classes/product';
import { ProductFormService } from '../services/product-form.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsList : Product[] = [];
  category! : string;
  filteredProducts! : Product[];

  constructor(private productFormService : ProductFormService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.productFormService.gtAllProducts().subscribe(data => {
      this.productsList = data;

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category')!;
        this.filteredProducts = (this.category) ? this.productsList.filter(product => product.category === this.category) : this.productsList;
      });
    });
  }
}
