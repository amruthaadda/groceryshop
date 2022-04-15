import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input ('cartItems') cartItems! : any;
  itemsQuantity! : number;

  constructor(private shoppingCartService : ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.itemsQuantity.subscribe(data => this.itemsQuantity = data);
  }
  
  getSum() {
    let sum : number =0;
    this.cartItems?.forEach((item : any) =>
      sum += item.product.price* item.quantity);
    return sum;

  }
}
