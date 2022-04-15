import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { Product } from '../model-classes/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  providers: [ProductCardComponent],
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  itemsQuantity! : number;
  cartItems : any = [];
  sum : number = 0;
  productQuantity! : number;
  itemPrice!: number;

  constructor(private shoppingCartService : ShoppingCartService, public productCardComponent :ProductCardComponent) { }

  ngOnInit(): void {
    this.shoppingCartService.updateQuantity();
    this.shoppingCartService.itemsQuantity.subscribe(data=>{
      this.itemsQuantity = data;
    });
    this.shoppingCartService.getAllCartItems().subscribe(data => {
      this.cartItems = data;
      this.updateTotalSum();
    });
  }

  onQuantityChange(id: number, index: number) { 
    this.shoppingCartService.getAllCartItems().subscribe((data:any) => {
      this.cartItems = data;
     this.updateTotalSum();
      // this.cartItems[index] = data.find((item: any) => item.product.id === id);
    });
  }

  updateTotalSum() {
    this.sum = 0;
    this.cartItems.forEach((item:any) => {
      this.sum += item.product.price * item.quantity;
      this.itemPrice = item.product.price;
    });
  }

  clearcart() {
    this.cartItems.forEach((item:any) => {
      this.shoppingCartService.clearCart(item.id).subscribe((data : any) => {
        this.cartItems = []; 
        this.sum = 0;
        this.shoppingCartService.setItemsQuantity(0);
      });
    });
    
  }
}
