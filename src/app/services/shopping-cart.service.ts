import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Product } from '../model-classes/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cartId!: number;
  private itemsQuantitySubject: Subject<number> = new ReplaySubject<number>(1);
  public readonly itemsQuantity: Observable<number> = this.itemsQuantitySubject.asObservable();
  shoppingCartItems: any = [];


  constructor(private http : HttpClient) { }

  saveCart(time: any ): Observable<any> {
    return this.http.post( 'http://localhost:3000/shopping-carts', {time});
  }

  getCartById() {
    this.cartId = this.getOrCreateCartId();
    return this.http.get ('http://localhost:3000/shopping-carts/'+ this.cartId);
  }

  getOrCreateCartId() {
    this.cartId = Number(localStorage.getItem('cartId'));
    if (!this.cartId) {
      let id!: number;
      this.saveCart(new Date().getTime()).subscribe((data => {
        localStorage.setItem('cartId', data.id.toString());
        id = data.id;
      }));
      return id;
    }
    return this.cartId;
  }

  getAllCartItems() {
    this.cartId = this.getOrCreateCartId();
    return this.http.get('http://localhost:3000/shopping-carts/'+ this.cartId + '/cart-items');
  }

  addToCart(product : Product) {
    this.cartId = this.getOrCreateCartId();
    return this.http.post('http://localhost:3000/shopping-carts/'+ this.cartId + '/cart-items', { product: product, quantity : 1});
  }

  // removeFromCart(product : Product) {
  //   this.cartId = this.getOrCreateCartId();

  // }

  updateCartById(cartItemId: any, cartItem: any ) {
    this.cartId = this.getOrCreateCartId();
    return this.http.patch('http://localhost:3000/shopping-carts/'+ this.cartId + '/cart-items/' + cartItemId ,cartItem );
  }

  getCartItemById(cartItemId: any) {
  this.cartId = this.getOrCreateCartId();
  return this.http.get('http://localhost:3000/shopping-carts/'+ this.cartId + '/cart-items/' + cartItemId);
  }

  deleteCartItem(itemId : number) {
    this.cartId = this.getOrCreateCartId();
    return this.http.delete('http://localhost:3000/shopping-carts/'+ this.cartId + '/cart-items/' + itemId);
  }

  setItemsQuantity(quantity: number) {
    this.itemsQuantitySubject.next(quantity);
  }

  updateQuantity() {
    this.getAllCartItems().subscribe((data:any) => {
      let itemsQuantity = 0;
      for(let productId in data) {
        itemsQuantity += data[productId].quantity;
      }
      this.setItemsQuantity(itemsQuantity);
    });
  }

  clearCart(itemId : number){
    this.cartId = this.getOrCreateCartId();
    return this.http.delete('http://localhost:3000/shopping-carts/'+ this.cartId + '/cart-items/'+ itemId);
  }

}
