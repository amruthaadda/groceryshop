import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../model-classes/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  shoppingCartItems: any = [];
  productQuantity! : number;

  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;

  constructor(private shoppingCartService : ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.getAllCartItems().subscribe((data : any) => {
      this.productQuantity = data.find((item:any) => item.product.id == this.product.id)?.quantity;
    });
  }
  addToCart() {
    this.shoppingCartService.getAllCartItems().subscribe(data => {
      this.shoppingCartItems = data;
      let cartItem = this.shoppingCartItems.find((item: any) => item.product.id === this.product.id);
      if (cartItem) {
        this.shoppingCartService.updateCartById(cartItem.id, { quantity: cartItem.quantity + 1 }).subscribe((data : any) => {
          this.productQuantity = data.quantity;
          this.shoppingCartService.updateQuantity();
        });
      } else {
        this.shoppingCartService.addToCart(this.product).subscribe((data : any) => {
          this.productQuantity = data.quantity;
          this.shoppingCartService.updateQuantity();
          });
      }
    });
  }
}
