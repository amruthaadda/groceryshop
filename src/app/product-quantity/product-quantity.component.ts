import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../model-classes/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {
  shoppingCartItems: any = [];
  @Input() productQuantity! : number;
  @Input('product') product!: Product;
  @Output() removeFromCartEvent = new EventEmitter<number>();
  // @Output() removeItemEvent = new EventEmitter<any>();
  @Output() quantityChange = new EventEmitter<any>();

  constructor(private shoppingCartService : ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.shoppingCartService.getAllCartItems().subscribe((data:any) => {
      this.shoppingCartItems = data;
      let cartItem = this.shoppingCartItems.find((item: any) => item.product.id === this.product.id);
      if (cartItem) {
        this.shoppingCartService.updateCartById(cartItem.id, { quantity: cartItem.quantity + 1 }).subscribe((data : any) => {
          this.productQuantity = data.quantity;
          this.shoppingCartService.updateQuantity();
          this.quantityChange.emit();
        });
      } else {
        this.shoppingCartService.addToCart(this.product).subscribe((data : any) => {
          this.productQuantity = data.quantity;
          this.shoppingCartService.updateQuantity();
          this.quantityChange.emit();
          });
      }
    });
  }

  removeFromCart() {
    this.shoppingCartService.getAllCartItems().subscribe((data:any) => {
      this.shoppingCartItems = data;
    let item = this.shoppingCartItems.find((item: any) => item.product.id === this.product.id);
    if(item && item.quantity>1) {
      this.shoppingCartService.updateCartById(item.id, { quantity: item.quantity - 1 }).subscribe((data : any) => {
        this.productQuantity = data.quantity;
        this.quantityChange.emit();});
      }else if (item.quantity === 1) { 
        this.shoppingCartService.deleteCartItem(item.id).subscribe();
        this.productQuantity = 0;
        this.removeFromCartEvent.emit(0);
        this.quantityChange.emit();
      }
      this.shoppingCartService.updateQuantity();
      });
  }
}
