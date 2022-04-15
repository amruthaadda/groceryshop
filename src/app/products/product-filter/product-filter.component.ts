import { Component, Input, OnInit } from '@angular/core';
import { ProductFormService } from 'src/app/services/product-form.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categoriesList! : string[];
  @Input('category') category: any;


  constructor(private productFormService : ProductFormService) { }

  ngOnInit(): void {
    this.productFormService.gtAllCategories().subscribe(data => {
      this.categoriesList = data;
    });
  }

}
