import { Component, Inject, OnInit } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  ordersList! : any;
  userId! : number;

  constructor(private orderSevice : OrderService,
    @Inject (SESSION_STORAGE) private storage : StorageService) { }

  ngOnInit(): void {
    this.userId = Number(this.storage.get('userId'));
    this.orderSevice.getAllOrders().subscribe((data:any) => {
      this.ordersList = data.filter((order:any) => order.userId === this.userId);
    });
  }

  getDate(time : any) {
     return new Date(time).toDateString();
  }
}
