import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LoginService } from '../services/login.service';
import { OrderService } from '../services/order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  shippingForm! : FormGroup;
  cartItems! : any;
  item : any= [];
  userId! : number;
  // sum : number = 0;


  constructor(
    private fb : FormBuilder, 
    private orderService : OrderService, 
    private shoppingCartService : ShoppingCartService,
    private loginService : LoginService,
    private router : Router,
    @Inject (SESSION_STORAGE) private storage : StorageService) { }

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      name : this.fb.control('', [Validators.required]),
      addressLine1 : this.fb.control('',[Validators.required]),
      addressLine2 : this.fb.control('',[Validators.required]),
      city : this.fb.control('',[Validators.required])
    });
    this.shoppingCartService.getAllCartItems().subscribe((data: any) => {
      this.cartItems = data;
    });
    this.userId = Number(this.storage.get('userId'));
  }

  clearCartItems() {
    this.shoppingCartService.getAllCartItems().subscribe(data => {
      this.cartItems = data;
      // this.updateTotalSum();
    });
    this.cartItems.forEach((item:any) => {
      this.shoppingCartService.clearCart(item.id).subscribe((data : any) => {
        this.cartItems = []; 
        // this.sum = 0;
        this.shoppingCartService.setItemsQuantity(0);
      });
    });
  }

  onSave() {
    this.cartItems.forEach((item: any) => {
      let itemObj = {
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.product.price
        },
        quantity: item.quantity,
        totalPrice: item.product.price * item.quantity
      };
      this.item.push(itemObj);
    });
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shippingForm.value,
      items: this.item
    };
    this.orderService.saveOrder(order).subscribe((data: any) => {
      this.clearCartItems();
      this.router.navigate(['/order-success', data.id]);
    });
  }

  validationError(field: string) {
    if(this.shippingForm.get(field)?.invalid && this.shippingForm.get(field)?.touched && this.shippingForm.get(field)?.errors) {
      return true;
    }
    return false;
  }
}
